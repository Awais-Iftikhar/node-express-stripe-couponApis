const express = require('express');
const router = express.Router();
const controller = require('../controllers/coupons');

router.get('/api/coupons', controller.getcoupons);
router.post('/api/coupons', controller.addcoupons);
router.delete('/api/coupons/:id', controller.deletecoupon);

module.exports = router;