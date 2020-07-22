const express = require('express');
const router = express.Router();
const controller = require('../controllers/coupons');
const auth = require('../middleware/checkauth');

router.get('/api/coupons' ,auth, controller.getcoupons);
router.post('/api/coupons',auth, controller.addcoupons);
router.get('/api/coupons/:couponid',auth, controller.getsinglecoupon);
router.delete('/api/coupons/:id', controller.deletecoupon);

module.exports = router;