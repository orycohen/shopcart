const router = require('express').Router();
const debug = require('debug')('cart:router: product');
const product = require('../model')('Product');
const Cart = require('../model')('Cart');

router.get('/:cartId', async (req, res) => {
    let carts, cartProducts;
    try {
        cart = await Cart.findOne({_id: req.params.cartId}).exec();
    } catch (error) {
        return res.status(404).send({error: "The requested cart was not found"});
    }

    try {
        cartProducts = await product.find().where('_id').in(Object.keys(cart.products)).exec();
    } catch (error) {
        return res.status(500).send({error: "Could not find cart's products"});
    }
    res.send(cartProducts);
});

// Get list of all the products
router.get('/', (req, res) => {
    product.find().then((docs, err) => {
        return res.send(docs)
    }).catch(error => {
        return res.status(500).send({error: "Could not get products list"});
    });
});

module.exports = router;
