var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

let CustomerSchema = new Schema({
    name:{
        type:String,
        required:[true,'Customer  name is required']
    },
    phone:{
        type:String,
        required:[true,'Customer phone number is required'],
        unique:' Customer already registered with the same phone number'
    },
    email:{
        type:String
    },
    password:{
        type:String,
        required:[true,'Password is required'],
    },
    tokens: [{
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }]
},{timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' }})

CustomerSchema.plugin(uniqueValidator);

CustomerSchema.methods.toJSON = function () {
  var customer = this;
  var customerObject = customer.toObject();
  return _.pick(customerObject, ['_id','fName','lName','email','phone']);
};

CustomerSchema.methods.generateAuthToken = function () {
  var customer = this;
  var access = 'auth';
  var token = jwt.sign({_id: customer._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  customer.tokens.push({access, token});
  return customer.save().then(() => {
    return token;
  });
};


CustomerSchema.statics.findByToken = function (token) {
  var Customer = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }
  return Customer.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};



CustomerSchema.statics.findByCredentials = function (phone, password) {
  var Customer = this;
  return Customer.findOne({phone}).then((customer) => {
    if (!customer) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, customer.password, (err, res) => {
        if (res) {
          resolve(customer);
        } else {
          reject();
        }
      });
    });
  });
};



CustomerSchema.pre('save', function (next) {
  var customer = this;
  if (customer.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(customer.password, salt, (err, hash) => {
        customer.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});





var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = {Customer};
