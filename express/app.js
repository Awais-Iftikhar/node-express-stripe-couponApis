const express = require('express');
const app = express();
const boddyparser = require('body-parser');
const routes = require('../routes/coupons');
const bodyParser = require('body-parser');

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, Authorization , X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET , PUT , POST,PATCH, DELETE");
  next();
});

app.use(boddyparser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes); 

module.exports = app;