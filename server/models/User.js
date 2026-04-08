const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: '' },
  stats: {
    totalStudyHours: { type: Number, default: 0 },
    completedGoals: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  dailyStats: [{
    date: { type: Date, default: Date.now },
    hours: { type: Number, default: 0 }
  }],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
