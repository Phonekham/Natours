const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
// const User = require("./userModel");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have name"],
      unique: true,
      trim: true,
      maxlength: [40, "T tour name must have less 40 char"],
      minlength: [10, "T tour name must have more 10 char"]
      // validate: [validator.isAlpha, "Tour must contain charactor"]
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"]
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either easy, medium, difficult"
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1"],
      mxn: [5, "Rating must be below 5"],
      set: val => Math.round(val * 10) / 10 //4.66666,4.6666.47.4.7
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "A tour must have price"]
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: "Discount price should be below regular price"
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have have a description"]
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have  a cover image"]
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    },
    startLocation: {
      // GeoJSON'
      type: {
        type: String,
        default: "Point",
        enum: ["Point"]
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
  }, //End tourSchema
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

tourSchema.virtual("durationWeeks").get(function() {
  return this.duration / 7;
});

// Virtual populate
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id"
});

// Document Middleware: runs before the save() and create() execute
tourSchema.pre("save", function(next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt"
  });
  next();
});

// 5. Modelling Tour Guides Embedding
// tourSchema.pre("save", async function(next) {
//   const guidesPromise = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromise);
//   next();
// });

// tourSchema.pre("save", function(next) {
//   console.log("will save document...");
//   next();
// });

// tourSchema.post("save", function(doc, next) {
//   next();
// });

// Query Middleware
// tourSchema.pre(/^find/, function(next) {
//   this.find({ secretTour: { $ne: true } });
//   this.start = Date.now();
//   next();
// });

// tourSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} miliseconds`);
//   console.log(docs);
//   next();
// });

// Aggregation middleware
// tourSchema.pre("aggregate", function(next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
