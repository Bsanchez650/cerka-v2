const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.get('/', providerController.getAll);
router.get('/:id', providerController.getById);
router.get('/:id/services', providerController.getServices);

module.exports = router;