const { Weight, validateWeight } = require('../models/weight');
const express = require('express');

const router = express.Router();

// function validateWeight(body) {
//   const schema = {
//     weight: Joi.alphanum().required(),
//   };
//   return Joi.validate(body, schema);
// }
//
// const weightSchema = new mongoose.Schema({
//   weight: {
//     type: Number,
//     required: true,
//     minlength: 22,
//     max: 500,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Weight = mongoose.model('Weight', weightSchema);

router.get('/', async (req, res) => {
  console.log(Weight);
  const weights = await Weight.find().lean();
  res.send(weights);
});

router.post('/', async (req, res) => {
  // const { error } = validateWeight(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // we use variable first to define and save objet, then we store
  // the id returned by .save()
  let newWeight = new Weight({ weight: req.body.weight });
  newWeight = await newWeight.save();
  const weights = await Weight.find().lean();
  res.send(weights);
});


// exports.Weight = Weight;

// exports.validateGenre = validateGenre;
//
//
//
//
// SEGUIR LLENANDO ESTO TAL Y COMO GENRE -->:w
//


//
module.exports = router;
