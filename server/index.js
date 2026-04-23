const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const serverless = require('serverless-http');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalRoutes');
const statsRoutes = require('./routes/statsRoutes');
const communityRoutes = require('./routes/communityRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection (Cached for Serverless)
let cachedDb = null;
const connectToDatabase = async () => {
  if (cachedDb) return cachedDb;
  
  const db = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = db;
  console.log('✅ MongoDB Connected');
  return db;
};

// Apply DB connection before routes
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
// Note: On Netlify, these will typically be prefixed by /.netlify/functions/index
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/community', communityRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: cachedDb ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'GrowthTrack API (Serverless)' });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Local Development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server running on port ${PORT}`);
  });
}

// Netlify Export
module.exports = app;
module.exports.handler = serverless(app);
