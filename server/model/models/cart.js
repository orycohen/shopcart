const debug = require('debug')('cart:model: cart');
const mongo = require('mongoose');

module.exports = db => {
    const schema = new mongo.Schema({
        // It is a Map object that has Products ids as keys
        // and quantities as values.
        products: {type: {}, required: true},
    });

    db.model('Cart', schema, 'carts');
    debug('cart model created');
}
