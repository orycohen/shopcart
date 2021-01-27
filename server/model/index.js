const mongo = require('mongoose');
const debug = require('debug')('model:index');

const db = mongo.createConnection();

(async () => {
    try {
        await db.openUri('mongodb://localhost/shopcart', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    } catch (error) {
        debug(`Error connecting to DB ${error}`);
    }
})();

require('./models/product.js')(db);
require('./models/cart.js')(db);
require('./models/user.js')(db);

module.exports = model => db.model(model);
