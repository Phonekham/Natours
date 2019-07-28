const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have name"],
    unique: true
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, "A tour must have price"]
  }
});
const Tour = mongoose.model("Tour", tourSchema);

module.export = Tour;
