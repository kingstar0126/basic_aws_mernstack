import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user';

/**
 * Creates a JSON web token with the given data and a cookie:
 * token: [created token]
 *
 * params:
 *  - userId: ID of the user to connect
 *  - res: response obj of middleware function
 */
function generateToken(userId, res) {
  const token = jwt.sign(
    { id: userId },
    process.env.TOKEN_SECRET,
    { expiresIn: '24h' },
  );
  res.cookie('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), sameSite: true });
  res.json({ userId, token });
}

/**
 * Middleware function for routes that need to authenticate a user
 * verifies the token sent in the Authorization header
 */
export function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userData) => {
      if (err) return res.status(403).json({ error: 'Incorrect token' });
      req.user = userData;
      next();
    });
  } else res.status(401).json({ error: 'No user is logged in' });
}

/**
 * Middleware function for POST /api/auth/register
 * User sign-up, registers user to database
 * JSON body:
 *  - email
 *  - password
 *  - name: user name
 */
export async function registerUser(req, res) {
  if (!req.body.name) res.status(401).json({ error: 'Your name is required' });
  if (!req.body.email || !req.body.password) res.status(401).json({ error: 'Email and password are required' });

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (user) return res.status(400).json({ error: 'Email already exists' });
    const newUser = new User({ name: req.body.name, email: req.body.email });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ error: 'Could not encrypt password' });
        newUser.password = hash;
        newUser.save((err) => {
          if (err) return res.status(400).json({ error: err.message });
          generateToken(newUser._id, res);
        });
      });
    });
  });
}

/**
 * Middleware function for GET /api/auth/login
 * Logs in a user by creating connection with token and cookie
 *
 * JSON body:
 *  - email
 *  - password
 */
export async function login(req, res) {
  if (!req.body.email || !req.body.password) return res.status(401).json({ error: 'Email and password are required' });

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).json({ error: 'Email not found' });

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err || !result) return res.status(400).json({ error: 'Wrong password' });
      generateToken(user._id, res);
    });
  });
}

/**
 * Middleware function for GET /api/auth/logout
 * Logs out a user by deleting thcookie with the token
 */
export async function logout(req, res) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'No user is connected' });

  res.cookie('token', '', { expires: new Date(Date.now()), httpOnly: true });
  res.redirect('/');
}
