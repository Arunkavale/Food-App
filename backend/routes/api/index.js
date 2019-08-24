var router = require('express').Router();
router.use('/v1/customer', require('./customer/customer'));

module.exports = router;
