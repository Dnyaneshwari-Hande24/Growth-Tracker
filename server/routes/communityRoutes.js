const express = require('express');
const router = express.Router();
const { createPost, getPosts, likePost, addReply } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');

// Anonymous posts can be viewed by anyone, but posting/liking/replying requires auth
router.get('/', getPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/reply', protect, addReply);

module.exports = router;
