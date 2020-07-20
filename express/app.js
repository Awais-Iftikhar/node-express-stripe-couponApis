const express = require('express');
const app = express();
const routes = require('../routes/coupons');

app.use(routes); 

module.exports = app;