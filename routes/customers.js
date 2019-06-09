const express = require('express');
const { Customer, validateCustomer } = require('../models/customer');
const { Weight } = require('../models/weight');

const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().lean();
  res.send(customers);
});

router.post('/', async (req, res) => {
  // add validation joi here
  const newCustomer = new Customer({
    name: req.body.name,
    email: req.body.email,
    language: req.body.language,
    displayUnit: req.body.displayUnit,
  });

  await newCustomer.save();
  res.send(`New customer ${newCustomer.name} saved!`);
});

router.put('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  customer.weights.push(new Weight({ weight: req.body.weight }));
  customer.save();
  res.send(`this is ${customer.name}`);
});


module.exports = router;
