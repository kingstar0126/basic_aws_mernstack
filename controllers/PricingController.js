import Plan from '../models/plan';

/**
 * Middleware function for GET /api/pricing
 * Retrieves all available pricing plans
 */
function getPlans(req, res) {
  Plan.find({}, (err, plans) => {
    if (err) res.status(404).json({ error: 'Plans not found' });
    else res.status(200).json(plans);
  });
}

export default getPlans;
