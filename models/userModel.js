const crypto = require("crypto"); //buildin module
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
  role: {
    type: String,
    enum: ["user", "lead-guide", "admin"],
    default: "user"
  },
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
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
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

// Check if user changed password after the token was issued
userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangeAt, JWTTimestamp);
    return JWTTimestamp < changedTimestamp; //100<200
  }
  // falses mean not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
