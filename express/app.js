const express = require('express');
const app = express();
const boddyparser = require('body-parser');
const couponroutes = require('../routes/coupons');
const userroutes = require('../routes/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://awais:ad4J1OqN7mGAQ7cd@cluster0-cwpaz.mongodb.net/manageusers?retryWrites=true&w=majority`,{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(() => {
  console.log('connected');
})
.catch(() => {
  console.log('conn failure');
})

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, Authorization , X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET , PUT , POST,PATCH, DELETE");
  next();
});

app.use(boddyparser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/coupons',couponroutes); 
app.use('/api/users',userroutes);

module.exports = app;