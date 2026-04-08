const express = require('express');
const router = express.Router();
const { updateStudyHours, getInsights } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/study-hours', updateStudyHours);
router.get('/insights', getInsights);

module.exports = router;
