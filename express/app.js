const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51H5of9KvUlSUjYzsS2bwvB2Q9Lh4BIQklNbnxRM9Hhar797P7xxsU8hlLefpa1nGovHSlqMBI5sezHVu62mwYMv300Dikb6y96');
const routes = require('../routes/coupons');

app.use(routes); 

module.exports = app;