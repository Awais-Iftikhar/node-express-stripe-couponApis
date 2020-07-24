const express = require('express');
const router = express.Router();
const controller = require('../controllers/coupons');
const auth = require('../middleware/checkauth');

router.get('' ,auth, controller.getcoupons);
router.post('',auth, controller.addcoupons);
router.get('/:couponid',auth, controller.getsinglecoupon);
router.delete('/:id', controller.deletecoupon);

module.exports = router;