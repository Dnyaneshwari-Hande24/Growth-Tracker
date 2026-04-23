const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = 'dnyaneshwari.2406487206@vcet.edu.in';
    const user = await User.findOne({ email });
    const count = await User.countDocuments();
    
    console.log(`Total users in DB: ${count}`);
    if (user) {
      console.log(`✅ User found: ${user.name} (${user.email})`);
    } else {
      console.log(`❌ User NOT found: ${email}`);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUser();
