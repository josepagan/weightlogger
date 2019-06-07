const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');

function validateWeight(body) {
  const schema = {
    weight: Joi.alphanum().required(),
  };
  return Joi.validate(body, schema);
}

const weightSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
    minlength: 22,
    max: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Weight = mongoose.model('Weight', weightSchema);

module.exports.Weight = Weight;
module.exports.validateWeight = validateWeight;
module.exports.weightSchema = weightSchema;
