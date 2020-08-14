import { Router } from 'express';
import { registerUser, login } from '../controllers/AuthController';

const router = Router();

// home route
router.get('/', (req, res) => res.json({ message: 'This is Daily Recipe!!!' }));

// rec routes
router.post('/users', (req, res) => registerUser(req, res));
router.get('users/login', (req, res) => login(req, res));

export default router;
