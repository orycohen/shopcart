const debug = require('debug')('cart:model: user');
const mongo = require('mongoose');

module.exports = db => {
    const schema = new mongo.Schema({
        userCart: {type: String, required: true},
    });

    db.model('User', schema, 'users');
    debug('user model created');
}
