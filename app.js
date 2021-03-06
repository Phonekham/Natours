const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// 1 middleware
// implement cors
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options("*", cors());
//
// Serving static file
app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// limit request from same  100 per hour to prevent brutforce attact
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //1 hour,
  message: "Too many requests from this IP, Please try again in an hour"
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({ limit: "10kb" /*limit amount of data that come in to body*/ })
);
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss()); //prevent html mulicious
// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price"
    ]
  })
);

app.use(compression());

// Test from middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// Routes
app.use("/", viewRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server`
  // });

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
