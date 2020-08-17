import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
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
    { expiresIn: '5h' },
  );
  res.cookie('token', token, { expires: new Date(Date.now() + 18000 * 60), httpOnly: true });
  res.json({ userId, token });
}

/**
 * Middleware function for POST /users
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
    if (user) res.status(400).json({ email: 'Email already exists' });
    else {
      const salt = await bcrypt.genSalt(20);
      const password = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password,
      }).catch((err) => res.status(400).json({ error: `Invalid credentials :C ${err}` }));
      generateToken(user._id, res);
    }
  });
}

/**
 * Middleware function for GET /users/login
 * Logs in a user by creating connection with token and cookie
 *
 * JSON body:
 *  - email
 *  - password
 */
export async function login(req, res) {
  if (!req.body.email || !req.body.password) return res.status(401).json({ error: 'Email and password are required' });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: 'Invalid email :(' });

  const pwd = await bcrypt.compare(req.body.password, user.password);
  if (!pwd) return res.status(400).json({ error: 'Invalid password :(' });

  generateToken(user._id, res);
}

/**
 * Middleware function for GET /users/me
 * Returns data about the currently logged user
 */
export async function loggedUser(req, res) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'No token provided :(' });

  try {
    const verifiedUsr = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(verifiedUsr.id) });
    if (user) return res.status(200).json({ email: user.email, name: user.name });
  } catch (err) { res.status(400).json({ error: 'Invalid token :(' }); }
}

export async function logout(req, res) {
  // in progress...
}