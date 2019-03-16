const express = require('express');
const route = express.Router();
const Product = require('./product');

route.get('/', (req, res) => {
  Product.all((err, products) => res.json(products));
});

route.get('/addRandom', (req, res) => {
  Product.createRandom((err, product) => {
    if (err) res.status(500).send(err);
    else return res.json(product);
  });
});

module.exports = route;
