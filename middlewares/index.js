const passport = require('passport');

const mwCheckLogin = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, payload, info) => {
    if (err) {
      console.error('Error authenticating user:', err);
      return next(err);
    }
    if (!payload) {
      console.error('User not authenticated');
      // You may choose to handle unauthenticated users here
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // User authenticated successfully
    req.auth = payload; // Attach user to request object for further processing if needed
    next();
  })(req, res, next);
};

module.exports = {
  mwCheckLogin,
};
