const router = require('express').Router();
const carts = require('../model')('Cart');
const products = require('../model')('Product');
const debug = require('debug')('cart:router: cart');

router.get('/:cartid', (req, res) => {
    const cartid = req.params.cartid;
    carts.findById(cartid, (err, cart) => {
        if (err) return res.status(500).send("Error when looking for cart");
        return res.send(cart.products);
    })
});

// Updating cart items
router.put('/', (req, res) => {
    carts.findOneAndUpdate(
        {_id: req.body.cartid},
        {products: req.body.newcart},
        {upsert: false, useFindAndModify: false}, 
        (err, doc) => {
            if (err) return res.status(500).send({error: "Could not update cart"});
            return res.status(200).end();
        }
    );
});

router.delete('/', (req, res) => {
    carts.findOneAndUpdate(
        {_id: req.body.cartid}, 
        {products: {}},
        {upsert: false, useFindAndModify: false}, 
        (err, doc) => {
            if (err) return res.status(500).send({error: "Could not empty cart"});
            return res.status(200).end();
        }
    );
});

module.exports = router;
