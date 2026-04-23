const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find({}, 'email name');
    console.log('List of users in DB:');
    users.forEach(u => console.log(`- ${u.email} (${u.name})`));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listUsers();
