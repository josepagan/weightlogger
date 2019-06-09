const express = require('express');
const { Customer, validateCustomer } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().lean();
  res.send(customers);
});

module.exports = router;
