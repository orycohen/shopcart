const router = require('express').Router();
const debug = require('debug')('cart:router: user');
const carts = require('../model')('Cart');
const users = require('../model')('User');

router.get('/', async (req, res) => {
    let user;
    if (req.session.user) {
        try {
            const userData = await users.findById(req.session.user);
            user = { cart: userData.userCart };
        } catch (error) {
            return res.status(500).send({error: "Could not find user"});
        }
    }
    else {
        try {
            const newcart = await carts.create({products: new Map()});
            let newUser = { userCart: newcart._id };
            user = await users.create(newUser);
            req.session.user = user._id;
            user = { cart: newcart._id };
        } catch (error) {
            return res.status(500).send({error: "Could not create new user"});
        }
    }
    res.send(user);
});

module.exports = router;
