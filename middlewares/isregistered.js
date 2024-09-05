// Middleware to check if a user is registered (based on session)
const isRegistered = (req, res, next) => {
    if (req.session.user) {
      // User is registered, proceed to the OTP form
      next(); 
    } else {
      // Redirect the user to the registration form
      res.redirect('/sampann');
    }
  };
  module.exports = isRegistered