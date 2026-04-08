const express = require('express');
const router = express.Router();
const { createGoal, getGoals, updateGoalProgress, deleteGoal } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createGoal);
router.get('/', getGoals);
router.put('/:id', updateGoalProgress);
router.delete('/:id', deleteGoal);

module.exports = router;
