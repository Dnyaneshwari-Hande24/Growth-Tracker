const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    // Always find the first user in the database to act as the "logged in" user
    let user = await User.findOne();
    if (!user) {
      // Create a default user if the database is brand new
      user = await User.create({
        name: 'GrowthTrack Admin',
        email: 'admin@growthtrack.com',
        password: 'bypass_password'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Bypass Error:', error);
    next();
  }
};

module.exports = { protect };
