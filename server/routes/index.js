const router = require('express').Router();

// The main route under the /API

router.use('/user', require('./user.js'));
router.use('/cart', require('./cart.js'));
router.use('/products', require('./product.js'));

module.exports = router;
