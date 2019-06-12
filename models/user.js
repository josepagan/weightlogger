const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const { weightSchema } = require('../models/weight');

function validateUser(body) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    language: Joi.string().required().max(10),
    displayUnit: Joi.string().max(5),
  };
  return Joi.validate(body, schema);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  language: {
    type: String,
    required: true,
    enum: ['spanish', 'english'],
  },
  displayUnit: {
    type: String,
    required: true,
    enum: ['kg', 'st', 'pb'],
  },
  weights: [weightSchema],
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;
