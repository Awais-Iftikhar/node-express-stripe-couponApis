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
      res.status(500).json({
        message: "Failed to load Coupons",
      });
    }
  );
};

exports.addcoupons = (req, res, next) => {
  const data = req.body;  
  const currency = req.body.currency;
  const duration = req.body.duration;
  data.duration = duration.toLowerCase();
  console.log(data);
  if (currency != null) {
    data.currency = currency.toLowerCase();
  } 

  console.log(data);
  let obj;
  if (data.discountamount != null && data.currency != null) {
    obj = {
      name: data.name,
      duration: data.duration,
      amount_off: parseInt(data.discountamount),
      currency: data.currency,
    };
  } else {
    obj = {
      name: data.name,
      duration: data.duration,
      percent_off: data.percentoff,
    };
  }
  console.log(obj);
  let errormsg;
  stripe.coupons.create(
    obj,
    function (err, coupon) {
      errormsg = 'something went wrong please try again';
      if (!err) {
        console.log(coupon);
        return res.status(201).json({
          message: 'created successfully'
        });
      }
      if(data.discountamount === null && data.percentoff === null){
        errormsg = 'Must provide percent_off or amount_off'
      }
      else if(data.discountamount === null || data.currency === null){
        errormsg = 'You must pass currency when passing an amount'
      }
      res.status(403).json({
        message: errormsg,
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
      } else{
        return res.status(500).json({
          message: 'Unable to fetch Coupon details'
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
    res.status(500).json({
      message: "Something went wrong. Failed to delete Coupon",
    });
  });
};
