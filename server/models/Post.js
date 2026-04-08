const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

// Note: No 'user' field in the root schema to ensure strict anonymity for onlookers,
// but we might want to store who created it for moderation or 'my posts' view.
// For this MVP, we'll keep it simple.

module.exports = mongoose.model('Post', postSchema);
