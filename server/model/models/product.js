const debug = require('debug')('cart:model: product');
const mongo = require('mongoose');

module.exports = db => {
    const schema = new mongo.Schema({
        productName: {type: String, required: true, unique: true},
        productPrice: {type: Number, required: true},
        productDescription: {type: String, required: false},
    });

    db.model('Product', schema, 'products');
    debug('product model created');
}
