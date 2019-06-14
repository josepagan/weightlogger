const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { weightSchema } = require('../models/weight');

function validateUser(body) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(1024),
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
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
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

// having the token in the model allows up to create it dinamically with
// the right user, 'this'

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, 'wtfomgbbq');
  return token;
};


const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;
