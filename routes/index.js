import { Router } from 'express';
import {
  registerUser, login, loggedUser, logout,
} from '../controllers/AuthController';

const router = Router();

// home route
router.get('/', (req, res) => res.json({ message: 'This is Daily Recipe!!!' }));

// user and auth routes
router.post('/api/users/register', (req, res) => registerUser(req, res));
router.get('/api/users/login', (req, res) => login(req, res));
router.get('/api/users/logout', (req, res) => logout(req, res));
router.get('/api/users/me', (req, res) => loggedUser(req, res));

export default router;
