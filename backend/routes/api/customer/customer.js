const router = require('express').Router();
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var NodeGeocoder = require('node-geocoder');



var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };

  var geocoder = NodeGeocoder(options);
 



  geocoder.geocode('29 champs elysée paris', function(err, res) {
      console.log("response");
      
    console.log(res);
  });



router.post("/sign-up",(req,res)=>{
    
    var customer = _.pick(req.body, ['fName','lName','email','phone', 'password']);
    if(customer){
        new Customer(customer).save().then((customer)=>{
            res.send({
                'statusCode': 0,
                'message':'Customer registered sucessfully'});
        }).catch((e)=>{
            if(e.errors instanceof Object){
                var keysOfObject = Object.keys(e.errors);
                res.status(200).send({
                    'statusCode': 1,
                    'message': e['errors'][keysOfObject[0]].message
                }); 
            }else{
                console.log(e);
                
                res.status(200).send({
                    'statusCode': 1,
                    'message': e
                });
            }
        })
    }else{
        res.status(200).send({
            'statusCode': 1,
            'message': 'Something went wrong'
        });
    }
})

router.post('/login' ,(req,res)=>{
    var body = _.pick(req.body, ['phone', 'password']);
    Customer.findByCredentials(body.phone, body.password).then((customer) => {
        return customer.generateAuthToken().then((token) => {
            res.header('customer-auth', token).send({
                'statusCode': 0,
                'message': 'customer logged in successfully',
                'data':customer
            });
        });
    }).catch((e) => {
        console.log(e);
        res.status(200).send({
            "statusCode": 2,
            "message": "Invalid user"
        });
    });
});







module.exports = router;
