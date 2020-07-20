const express = require('express');
const app = express();
const boddyparser = require('body-parser');
const routes = require('../routes/coupons');
const bodyParser = require('body-parser');

app.use(boddyparser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes); 

module.exports = app;