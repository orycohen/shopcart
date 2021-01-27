const Product = require('./model')('Product');

(async () => {
    try {
        await Product.create([{
            productName: "Book",
            productPrice: 10.5,
            productDescription: "Recipe book"
        }, {
            productName: "PDF Collection",
            productPrice: 15,
            productDescription: "A collection of PDFs that contain children stories"
        }, {
            productName: "Calander",
            productPrice: 10.5,
            productDescription: "A jewish calander"
        }, {
            productName: "Wireless Keyboard",
            productPrice: 20,
            productDescription: "A wireless keybord with US letters and lights"
        }, {
            productName: "Candies",
            productPrice: 6,
            productDescription: "The best candies you can get!! Comes in various flavours!"
        }]);
        console.log("Successfully inserted documents");
        process.exit(0);
    } catch (error) {
        console.log("Could not insert documents");
        console.log(`Error: ${error}`);
        process.exit(-1);
    }
})();
