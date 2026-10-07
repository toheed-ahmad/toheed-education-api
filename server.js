const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const educationRoutes = require('./routes/education.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Meta Endpoint
app.get('/api/v1/meta', (req, res) => {
  const metaPath = path.join(__dirname, 'meta.json');
  if (fs.existsSync(metaPath)) {
    const metaData = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    return res.status(200).json({ success: true, meta: metaData });
  }
  res.status(404).json({ success: false, message: 'Meta data file not found.' });
});

// Education API Routes
app.use('/api/v1', educationRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Toheed Education API',
    status: 'Online',
    documentation: '/api/v1/meta'
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});