import User from '../models/user';
import PlanInstance from '../models/planInstance';

/**
 * Middleware function for GET /api/users/profile
 * Retrieves data about the user that is logged in.
 */
export function getProfile(req, res) {
  User.findById(req.user.id, (err, user) => {
    if (err) return res.status(401).json({ error: 'Cannot access this profile' });
    res.status(200).json(user);
  });
}

/**
 * Middleware function for GET /api/users/plan
 * Retrieves the plan that the user is subscribed to
 */
export function getUserPlan(req, res) {
  User
    .findById(req.user.id)
    .populate({
      path: 'planInstance',
      populate: 'plan',
    })
    .exec((err, user) => {
      if (err) return res.status(404).json({ error: 'Could not find a plan for this user' });
      res.status(200).json(user.planInstance);
    });
}

/** Middleare function for GET /api/users/menu
 * Retrieves the current user's menu based on the plan they are subscribed to
*/
export function getUserMenu(req, res) {
  PlanInstance
    .findOne({ user: req.user.id })
    .populate({
      path: 'plan',
      populate: 'menu',
    })
    .exec((err, planInstance) => {
      if (err) return res.status(404).json({ error: 'Could not find a plan for this user' });
      res.status(200).json(planInstance);
    });
}

/**
 * Middleware function for POST /api/users/delivery
 * Stores a user's delivery information
 * JSON body:
 *  - address
 *  - phone
 *  - city
 *  - state
 *  - phone
 */
export function setDeliveryInfo(req, res) {
  const data = {
    address: req.body.address,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  };
  User.findByIdAndUpdate(req.user.id, data, { new: true }, (err, user) => {
    if (err) return res.status(400).json({ error: 'User not found' });
    res.status(200).json(user);
  });
}

/**
 * Middleware function for POST /api/users/plan/
 * Creates a plan instance for a user
 * JSON body:
 *  - planId: id of the selected plan
 *  - recipesPerWeek: attribute to update plan with
 */
export function choosePlan(req, res, next) {
  if (!req.body.planId || !req.body.recipesPerWeek) {
    return res.status(400).json({ error: 'No data provided to choose a plan' });
  }

  const data = {
    user: req.user.id,
    plan: req.body.planId,
    recipesPerWeek: req.body.recipesPerWeek,
  };

  PlanInstance.findOneAndUpdate(data, { new: true }, async (err, instance) => {
    if (err) return res.status(400).json({ error: 'Unable to create plan instance' });
    if (!instance) {
      instance = await PlanInstance.create(data);
    }
    User.findByIdAndUpdate(req.user.id,
      { planInstance: instance._id }, (err, user) => {
        if (err) return res.status(404).json({ error: 'Could not find user' });
        res.status(200).json(instance);
      });
  });
}

/**
 * Middleware function for GET /api/users/recipes
 * Retrieves the user's selected recipes
 */
export function getSelectedRecipes(req, res) {
  PlanInstance.findOne({ user: req.user.id }).populate('selectedRecipes').exec((err, planInstance) => {
    if (err) return res.status(400).json({ error: 'Couldn\'t find a plan instance for this user' });
    res.status(200).json(planInstance.selectedRecipes);
  });
}

/**
 * Middleware function for PUT /api/users/recipes
 * Updates a plan instance's array of selected recipes.
 * JSON body:
 *  - recipeId: id of the selected recipe
 */
export function selectRecipe(req, res) {
  PlanInstance.findOne({ user: req.user.id }, (err, planInstance) => {
    if (err) return res.status(400).json({ error: 'Unable to select this recipe' });
    const recipes = planInstance.selectedRecipes;

    if (recipes.length >= planInstance.recipesPerWeek) {
      recipes.shift();
    }
    recipes.push(req.body.recipeId);
    planInstance.save((err) => {
      if (err) return res.status(400).json({ error: 'Unable to update plan instance' });
      res.status(200).json(planInstance.selectedRecipes);
    });
  });
}
