const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'cerka-dev-secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()});
});

// Database
const db = require('./config/db');

db.query('SELECT NOW()')
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Database connection failed:', err.message));

// Routes
app.use('/api/search', require('./routes/search'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/services', require('./routes/services'));

app.listen(PORT, () => {
    console.log(`Cerka API running on http://localhost:${PORT}`);
});

module.exports = app;