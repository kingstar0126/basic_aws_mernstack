import { Router } from 'express';
import {
  registerUser, login, loggedUser, logout,
} from '../controllers/AuthController';

const router = Router();

// home route
router.get('/', (req, res) => res.json({ message: 'This is Daily Recipe!!!' }));

// rec routes
router.post('/users', (req, res) => registerUser(req, res));
router.get('/users/login', (req, res) => login(req, res));
router.get('/users/logout', (req, res) => logout(req, res));
router.get('/users/me', (req, res) => loggedUser(req, res));

export default router;
