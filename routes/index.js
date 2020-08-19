import { Router } from 'express';
import {
  registerUser, login, logout, verifyToken,
} from '../controllers/AuthController';
import { getAllRecipes, getRecipe } from '../controllers/MenuController';
import { getProfile, getUserPlan } from '../controllers/UserController';
import getPlans from '../controllers/PricingController';

const router = Router();

// home route
router.get('/', (req, res) => res.json({ message: 'This is Daily Recipe!!!' }));

// auth routes
router.post('/api/auth/register', (req, res) => registerUser(req, res));
router.get('/api/auth/login', (req, res) => login(req, res));
router.get('/api/auth/logout', (req, res) => logout(req, res));

// menu routes
router.get('/api/menu', (req, res) => getAllRecipes(req, res));
router.get('/api/menu/:id', (req, res) => getRecipe(req, res));

// pricing route
router.get('/api/pricing', (req, res) => getPlans(req, res));

// user routes
router.get('/api/users/profile', verifyToken, (req, res) => getProfile(req, res));
router.get('/api/users/plan', verifyToken, (req, res) => getUserPlan(req, res));

export default router;
