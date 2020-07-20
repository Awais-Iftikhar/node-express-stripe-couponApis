const stripe = require('stripe')('sk_test_51H5of9KvUlSUjYzsS2bwvB2Q9Lh4BIQklNbnxRM9Hhar797P7xxsU8hlLefpa1nGovHSlqMBI5sezHVu62mwYMv300Dikb6y96');


exports.getcoupons = (req,res,next) => {
    stripe.coupons.list(
        {
            limit: 100
        },
        function(err, coupons) {
          if(!err){
              return res.status(200).json({
                data: coupons
              });
          }
          res.status(404).json({
              message: 'error found'
          })
        }
      );
};

exports.addcoupons = (req,res,next) => {
    const data = req.body;
    stripe.coupons.create(
        {
          duration: data.duration,
          percent_off: data.percent_off,
          name: data.name 
        },
        function(err, coupon) {
            if(!err){
                console.log(coupon)
                return res.status(201).json({
                  data: coupon
                });
            }
            res.status(404).json({
                message: err
            })
          }
      );
};