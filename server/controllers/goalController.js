const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
  try {
    const { title, description, deadline, category } = req.body;
    const goal = await Goal.create({
      user: req.user.id,
      title,
      description,
      deadline,
      category
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGoalProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const goal = await Goal.findById(req.params.id);

    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    goal.progress = progress;
    if (progress === 100) {
      goal.isCompleted = true;
      goal.completedAt = Date.now();
    }
    await goal.save();
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (goal.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await goal.deleteOne();
    res.json({ message: 'Goal removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
