import Recipe from '../models/recipe';

/**
 * Middleware function for GET /api/menu
 * Retrieves all recipes in database
 */
export function getAllRecipes(req, res) {
  Recipe.find({}, (err, recipes) => {
    if (err) return res.status(404).json({ error: 'Menu not found' });
    res.status(200).json(recipes);
  });
}

/**
 * Middleware function for GET /api/menu/:id
 * Retrieves the recipe that has its id equal to the one given in
 * the request.
 */
export function getRecipe(req, res) {
  const recipeId = req.params.id;

  Recipe.findById(recipeId, (err, recipe) => {
    if (err) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  });
}
