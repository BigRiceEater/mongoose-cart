# Mongoose connecting to Mongo

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cart', {
  useNewUrlParser: true,
  auth: { authSource: 'admin' },
  user: 'user',
  pass: 'pass'
});
// tell mongoose to use this for async 
mongoose.Promise = global.Promise;

// Check the connection 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('mongodb connected');
});
```

# Modelling Your Data

The workflow usually follows this pattern: 
1. Schema
2. Compile Model
3. Export the model to relevant APIs
4. Make new instance of Model with data with Post methods
5. Save model
6. Handle any errors

## Schema

A schema defines the `blueprint` of the model object we are designing. Let's say we are designing the model for Product.

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  date: { type: Date, default: Date.now },
  stock: Number
});
```

## Compiling to Model 

Just the schema alone is not enough because we need to compile it with `mongoose.model`

```javascript
const Product = mongoose.model('Product', productSchema);
```

Finally if we want other parts of the code to have access to the newly compiled model, we need to export it. 

```javascript
module.exports = Product;
```

## What is the collection called?

> The schema automagically creates a `collection` in mongo by guessing the name from the mongoose.model() or *alternatively* you can declare an explicit name in when declaring the Schema. 

## Creating new Documents [records]

So whenever want to create a new `Document` for the Product collection, we just need to make a new instance of the model itself with the relevant parameters, then call its `save(callback(err))` method. This method is built-in when creating the mongoose model. 

```javascript
function genNum(max){
  return Math.ceil(Math.random() * max);
}

const record = new Product({
    name: `Product ${genNum(5000)}`,
    price: genNum(100),
    description: 'A product',
    stock: genNum(10)
  });
  record.save(err => {
    if (err) res.status(500).send(err);
    else return res.send('ok');
  });
```

## Putting Models in the same collection 

A `Document` of different models can be placed in the same collection by specifying the name. Remember a NoSql database is schemaless, which allows us to do this.

```javascript
mongoose.model('product', ProductSchema, 'products');
mongoose.model('category', CategorySchema, 'products');
mongoose.model('discount', DiscountSchema, 'products');