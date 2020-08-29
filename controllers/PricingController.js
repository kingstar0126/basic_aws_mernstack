import Plan from '../models/plan';
import Recipes from '../models/recipe';

/**
 * Middleware function for GET /api/plans
 * Retrieves all available pricing plans
 */
export function getPlans(req, res) {
  Plan.find({}, (err, plans) => {
    if (err) return res.status(404).json({ error: 'Plans not found' });
    res.status(200).json(plans);
  });
}

/**
 * Middleware function for GET /api/plan/menu/:planId
 * Retrieves a plan's menu
 * params:
 *  - planId: id of the plan to get the menu from
 */
export function getPlanMenu(req, res) {
  Plan.findById(req.params.planId).populate('menu').exec((err, plan) => {
    if (err) return res.status(404).json({ error: 'Plans not found' });
    return res.status(200).json(plan.menu);
  });
}

/**
 * Middleware function for PUt /api/plan/menu
 * Updates the menu of all plans
 */
export function storeMenu(req, res) {
  Plan.find({}, (err, plans) => {
    if (err) return res.status(404).json({ error: 'Plans not found' });
    plans.forEach(async (plan) => {
      const recipes = await Recipes.find({ servings: plan.servings, diet: plan.diet });
      if (!recipes) return res.status(404).json({ error: 'Couldn\'t find any recipes for this plan' });
      plan.menu = recipes;
      await plan.save();
    });
    res.status(200).json('Plans now have a menu');
  });
}
