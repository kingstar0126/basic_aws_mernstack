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
  req.params.id[0] === ':' && req.params.id.slice(1);
  const recipeId = req.params.id;

  Recipe.findById(recipeId, (err, recipe) => {
    if (err || !recipe) return res.status(404).json({ error: 'Recipe not found' });
    console.log(recipe)
    res.status(200).json(recipe);
  });
}
