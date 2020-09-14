import { Router } from 'express';
import { getAllRecipes, getRecipe } from '../controllers/MenuController';
import { getPlans, getPlanMenu, storeMenu } from '../controllers/PricingController';
import {
  registerUser, login,
  logout, verifyToken,
} from '../controllers/AuthController';
import {
  getProfile, getUserPlan,
  choosePlan, getUserMenu, setDeliveryInfo,
  getSelectedRecipes, selectRecipe,
} from '../controllers/UserController';

const router = Router();

// home route
// router.get('/', (req, res) => res.json({ message: 'This is Daily Recipe!!!' }));

// auth routes
router.post('/api/auth/register', registerUser);
router.get('/api/auth/login', login);
router.get('/api/auth/logout', logout);

// menu routes
router.get('/api/menu', getAllRecipes);
router.get('/api/menu/:id', getRecipe);

// plans route
router.get('/api/plans', getPlans);
router.get('/api/plan/menu/:planId', getPlanMenu);
router.put('/api/plan/menu', storeMenu);

// user routes
router.use('/api/users', verifyToken);
router.get('/api/users/profile', getProfile);
router.get('/api/users/plan', getUserPlan);
router.get('/api/users/menu', getUserMenu);
router.get('/api/users/recipes', getSelectedRecipes);
router.put('/api/users/recipes', selectRecipe);
router.post('/api/users/delivery', setDeliveryInfo);
router.post('/api/users/plan', choosePlan);

export default router;
