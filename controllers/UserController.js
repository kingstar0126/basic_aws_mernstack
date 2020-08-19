import User from '../models/user';
import Plan from '../models/plan';

/**
 * Middleware function for GET /api/users/profile
 * Retrieves data about the user that is logged in.
 */
export function getProfile(req, res) {
  const { user } = req;
  User.findById(user.id, (err, usr) => {
    if (err) res.status(401).json({ error: 'Cannot access this profile' });
    else {
      res.status(200).json(usr);
    }
  });
}

/**
 * Middleware function for GET /api/users/plan
 * Retrieves the plan that the user is subscribed to
 */
export function getUserPlan(req, res) {
  const { user } = req;
  User.findById(user.id, (err, usr) => {
    if (err) res.status(401).json({ error: 'Cannot access this profile' });
    else {
      Plan.findById(user.planId, (err, plan) => {
        if (err) res.status(401).json({ error: 'User does not have a plan' });
        else res.status(200).json({ plan });
      });
    }
  });
  // in progress...
}
