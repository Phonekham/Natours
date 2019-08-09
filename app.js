const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
// 1 middleware
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
// Serving static file
app.use(express.static(`${__dirname}/public`));

// Test from middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server`
  // });

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
