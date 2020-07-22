const stripe = require("stripe")(
  "sk_test_51H5of9KvUlSUjYzsS2bwvB2Q9Lh4BIQklNbnxRM9Hhar797P7xxsU8hlLefpa1nGovHSlqMBI5sezHVu62mwYMv300Dikb6y96"
);

exports.getcoupons = (req, res, next) => {
  stripe.coupons.list(
    {
      limit: 100,
    },
    function (err, coupons) {
      if (!err) {
        return res.status(200).json({
          data: coupons,
        });
      }
      res.status(404).json({
        message: "error found",
      });
    }
  );
};

exports.addcoupons = (req, res, next) => {
  const data = req.body;
  console.log(data);
  
  const currency = req.body.currency;
  const duration = req.body.duration;
  data.duration = duration.toLowerCase();

  if (currency == null) {
    data.currency = 'usd';
  } else {
    data.currency = currency.toLowerCase();
  }

  console.log(data);
  let obj;
  if (data.discountamount != null) {
    obj = {
      name: data.name,
      duration: data.duration,
      amount_off: data.discountamount,
      currency: data.currency,
    };
  } else {
    obj = {
      name: data.name,
      duration: data.duration,
      percent_off: data.percentoff,
      currency: data.currency,
    };
  }

  console.log(obj);
  stripe.coupons.create(
    obj,
    function (err, coupon) {
      if (!err) {
        console.log(coupon);
        return res.status(201).json({
          message: 'created successfully'
        });
      }
      res.status(404).json({
        message: err,
      });
    }
  );
};

exports.getsinglecoupon = (req, res, next) => {
  const couponid = req.params.couponid;
  console.log(couponid);
  stripe.coupons.retrieve(
    couponid,
    function(err, coupon) {
      if(!err){
        console.log(coupon);
        return res.status(200).json({
          data: coupon
        })
      }
    }
  );

}

exports.deletecoupon = (req, res, next) => {
  const data = req.params.id;
  stripe.coupons.del(data, function (err, confirmation) {
    if (!err) {
      return res.status(200).json({
        message: "successfully deleted",
      });
    }
    res.status(404).json({
      message: "error",
    });
  });
};
