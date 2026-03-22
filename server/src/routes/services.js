const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAll);
router.get('/category/:categoryId', serviceController.getByCategory);

module.exports = router;