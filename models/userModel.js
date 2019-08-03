const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Tell us your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Plase provide a valid email"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Plase provide password"],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, "Plase confirm your password"]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
