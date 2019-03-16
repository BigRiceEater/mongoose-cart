const express = require('express');
const router = express.Router();

const productApi = require('./product/api');

router.use('/product', productApi);

module.exports = router;
