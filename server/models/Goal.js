const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  category: { type: String, enum: ['Study', 'Personal', 'Health', 'Skill'], default: 'Study' },
  progress: { type: Number, default: 0 }, // 0 to 100
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
