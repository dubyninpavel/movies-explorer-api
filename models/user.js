const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { INCORRECT_EMAIL } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: INCORRECT_EMAIL,
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.methods.hiddenPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
