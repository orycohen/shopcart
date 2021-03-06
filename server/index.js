require('dotenv').config();

const express = require('express');
const debug = require('debug')('cart:index');
const products = require('./model')('Product');
const carts = require('./model')('Cart');
const users = require('./model')('User');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const sessionMid = session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    name: "cart.sid",
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ url: `mongodb://${process.env.MONGO_ADDRESS}/shopcart` }),
    cookie: {
        maxAge: 84600000,
        rolling: true
    }
});

app.use(express.static("public"));
app.use(express.json());
app.use(sessionMid);
app.use('/api', require('./routes'));

app.get('/*', async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
