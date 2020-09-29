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

/** Middleware function for GET /api/users/planInstance/
 * Retrieves the current user's menu based on the plan they are subscribed to
*/
export function getPlanInstance(req, res) {
  PlanInstance
    .findOne({ user: req.user.id })
    .populate({
      path: 'plan',
      populate: 'menu'
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
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json(user);
  });
}

/**
 * Middleware function for POST /api/users/plan/
 * Creates a plan instance for a user
 * JSON body:
 *  - plan: object of the selected plan's data
 *  - recipesPerWeek: attribute to update plan with
 *  - totalPrice: total price of plan
 */
export function choosePlan(req, res, next) {
  if (!req.body.plan || !req.body.recipesPerWeek || !req.body.totalPrice) {
    return res.status(400).json({ error: 'Not enough data provided to choose a plan' });
  }
  const price = req.body.plan.pricePerServing * req.body.plan.servings * req.body.recipesPerWeek;
  const newData = {
    user: req.user.id,
    plan: req.body.plan._id,
    recipesPerWeek: req.body.recipesPerWeek,
    totalPrice: price,
  };
  PlanInstance.findOneAndUpdate({ user: req.user.id }, newData, { new: true, upsert: true })
    .populate('plan').exec((err, instance) => {
      if (err) return res.status(400).json({ error: 'Unable to choose plan' });

      User.findByIdAndUpdate(req.user.id, { planInstance: instance._id }, (err, user) => {
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
 *  - selectedRecipes: array of the ids of the selected recipes
 */
export function selectRecipe(req, res) {
  const selectedRecipes = req.body.selectRecipes;
  if (!selectedRecipes) return res.status(400).json({ error: 'Recipes were not provided'});
  PlanInstance.findOneAndUpdate({ user: req.user.id }, { selectedRecipes }, (err, planInstance) => {
    if (err) return res.status(400).json({ error: 'Unable to select recipes' });
    return res.status(200).json(planInstance);
  });
}
