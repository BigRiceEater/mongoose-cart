const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  date: { type: Date, default: Date.now },
  stock: Number
});

productSchema.statics.all = function(cb) {
  const fields = 'name price description stock';
  Product.find({}, fields, cb);
};

productSchema.statics.createRandom = function(cb) {
  const genNum = max => Math.ceil(Math.random() * max);
  const product = new Product({
    name: `Product ${genNum(5000)}`,
    price: genNum(100),
    description: 'A product',
    stock: genNum(10)
  });
  product.save(err => {
    cb(err, product);
  });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
