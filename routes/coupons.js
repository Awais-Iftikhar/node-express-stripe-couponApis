const express = require('express');
const router = express.Router();
const controller = require('../controllers/coupons');

router.get('/api/coupons', controller.getcoupons);

module.exports = router;