require('./backend/config/config');
const {mongoose} = require('./backend/db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const {Customer} = require('./backend/models/customer-model');
const morgan = require('morgan');
app.use(morgan('combined'));

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,user-auth");
  res.header("access-control-expose-headers", "customer-auth");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next(); 
});

app.use(require('./backend/routes'));

http.createServer(app).listen(3443 , ()=>{
  console.log('Started up HTTP at port ', 3443);
});
