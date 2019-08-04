const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    minlength: 8,
    select: false //Hide password to client
  },
  passwordConfirm: {
    type: String,
    required: [true, "Plase confirm your password"],
    validate: {
      // This only work on create & save
      validator: function(el) {
        return el === this.password;
      },
      message: "Password dose not match"
    }
  }
});

userSchema.pre("save", async function(next) {
  // Only run if password was actually modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Check if password is correct
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
