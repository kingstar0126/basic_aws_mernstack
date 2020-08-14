import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * Callback for POST /users
 * User sign-up, registers user to database
 * JSON body:
 *   - email
 *   - password
 *   - name: user name
 */
export async function registerUser(req, res) {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (user) res.status(400).json({ email: 'Email already exists' });
    else {
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const token = jwt.sign(
        { id: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: '48h' },
      );
      res.cookie('token', token, { expires: new Date(Date.now() * 24 * 60 * 60 * 1000) });
      res.json({ userId: user._id, token });
    }
  });
}

export async function login(req, res) {
}
