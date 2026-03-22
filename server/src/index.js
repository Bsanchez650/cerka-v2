const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//health check
app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()});
});

app.listen(PORT, () => {
    console.log(`Cerka API running on http://localhost:${PORT}`);
});

module.exports = app;

