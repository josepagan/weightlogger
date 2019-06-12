const express = require('express');
const { User, validateUser } = require('../models/user');
const { Weight } = require('../models/weight');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.send(users);
});

router.post('/', async (req, res) => {
  // add validation joi here
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    language: req.body.language,
    displayUnit: req.body.displayUnit,
  });

  await newUser.save();
  res.send(`New user ${newUser.name} saved!`);
});

// router.put('/:id', async (req, res) => {
//   const user = await User.findById(req.params.id);
//   user.weights.push(new Weight({ weight: req.body.weight }));
//   user.save();
//   res.send(`this is ${user.name}`);
// });


module.exports = router;
