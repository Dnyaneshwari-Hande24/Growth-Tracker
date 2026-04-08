const User = require('../models/User');

exports.updateStudyHours = async (req, res) => {
  try {
    const { hours } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.stats.totalStudyHours += hours;
    
    // Update daily stats
    const today = new Date().setHours(0, 0, 0, 0);
    const existingDay = user.dailyStats.find(d => new Date(d.date).setHours(0, 0, 0, 0) === today);

    if (existingDay) {
      existingDay.hours += hours;
    } else {
      user.dailyStats.push({ date: new Date(), hours: hours });
    }

    await user.save();
    res.json({ message: 'Success', stats: user.stats, dailyStats: user.dailyStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInsights = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const dailyStats = user.dailyStats;

    // Mock AI Logic
    let insight = "Keep going! You are doing great.";
    let percentageImprovement = 0;

    if (dailyStats.length >= 2) {
      const todayHours = dailyStats[dailyStats.length - 1].hours;
      const yesterdayHours = dailyStats[dailyStats.length - 2].hours;

      if (yesterdayHours > 0) {
        percentageImprovement = ((todayHours - yesterdayHours) / yesterdayHours) * 100;
      } else if (todayHours > 0) {
        percentageImprovement = 100;
      }

      if (percentageImprovement > 0) {
        insight = `You improved your study time by ${percentageImprovement.toFixed(1)}% compared to yesterday!`;
      } else if (percentageImprovement < 0) {
        insight = `You're a bit behind yesterday's pace. Take a short break and then a deep dive!`;
      } else if (todayHours > 0) {
        insight = `Consistency is key! You're matching your pace from yesterday.`;
      }
    }

    res.json({
      insight,
      improvement: percentageImprovement.toFixed(1),
      totalHours: user.stats.totalStudyHours,
      dailyStats: dailyStats.slice(-7) // Last 7 days
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
