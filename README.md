# Natours
## Dependencies
- "@babel/polyfill": "^7.4.4" Babel Polyfill adds support to the web browsers for features, which are not available. Babel compiles the code from recent ecma version to the one, which we want. It changes the syntax as per the preset, but cannot do anything for the objects or methods used. We have to use polyfill for those features for backward compatibility [Docs](https://babeljs.io/docs/en/babel-polyfill)
- "axios": "^0.19.0" Promise based HTTP client for the browser and node.js [Docs](https://github.com/axios/axios)
  ### Features
  - Make XMLHttpRequests from the browser
  - Make http requests from node.js
  - Supports the Promise API
  - Intercept request and response
  - Transform request and response data
  - Cancel requests
  - Automatic transforms for JSON data
  - Client side support for protecting against XSRF
- "bcryptjs": "^2.4.3" Besides incorporating a salt to protect against rainbow table attacks, bcrypt is an adaptive function: over time, the iteration count can be increased to make it slower, so it remains resistant to brute-force search attacks even with increasing computation power [Docs](https://github.com/dcodeIO/bcrypt.js#readme)
- "compression": "^1.7.4" Returns the compression middleware using the given options. The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
[Docs](https://github.com/expressjs/compression#readme)
- "cookie-parser": "^1.4.4" Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware. [Docs](https://github.com/expressjs/cookie-parser#readme)
- "cors": "^2.8.5" CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. [Docs](https://github.com/expressjs/cors#readme)
- "dotenv": "^8.0.0" Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology. [Docs](https://github.com/motdotla/dotenv#readme)
- "express": "^4.17.1" Fast, unopinionated, minimalist web framework for node. [Docs](https://github.com/expressjs/express)
- "express-mongo-sanitize": "^1.3.2" Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.    [Docs](https://github.com/fiznool/express-mongo-sanitize#readme)
- "express-rate-limit": "^5.0.0" Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. [Docs](https://github.com/nfriedly/express-rate-limit)
- "helmet": "^3.20.0" Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help! [Docs](https://helmetjs.github.io/)
- "hpp": "^0.2.2" Express middleware to protect against HTTP Parameter Pollution attacks [Docs](https://github.com/analog-nico/hpp)
- "html-to-text": "^5.1.1" An advanced converter that parses HTML and returns beautiful text. It was mainly designed to transform HTML E-Mail templates to a text representation. So it is currently optimized for table layouts. [Docs](https://github.com/werk85/node-html-to-text)
- "jsonwebtoken": "^8.5.1" JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. [Docs](https://github.com/auth0/node-jsonwebtoken#readme)
- "mongoose": "^5.6.7" Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. [Docs](https://mongoosejs.com/docs/guide.html)
- "morgan": "^1.9.1" HTTP request logger middleware for node.js [Docs](https://github.com/expressjs/morgan#readme)
- "multer": "^1.4.2" Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency [Docs](https://github.com/expressjs/multer#readme)
- "nodemailer": "^6.3.0 Send e-mails from Node.js  "[Docs](https://nodemailer.com/about/)
- "nodemon": "^1.19.1" nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. [Docs](https://nodemon.io/)
- "pug": "^2.0.4" A clean, whitespace-sensitive template language for writing HTML [Docs](https://pugjs.org/api/getting-started.html)
- "sharp": "^0.23.0" High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP and TIFF images. Uses the libvips library. [Docs](https://github.com/lovell/sharp)
- "slugify": "^1.3.4" Slugifies a string [Docs](https://github.com/simov/slugify)
- "stripe": "^7.8.0" he Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript.he Stripe Node library provides convenient access to the Stripe API from applications written in server-side JavaScript. [Docs](https://stripe.com/)
- "validator": "^11.1.0" String validation and sanitization [Docs](https://github.com/validatorjs/validator.js)
- "xss-clean": "^0.1.1"Middleware to sanitize user input [Docs](https://github.com/jsonmaur/xss-clean)

##DevDependencies

- "ndb": "^1.1.4" ndb is an improved debugging experience for Node.js, enabled by Chrome DevTools [Docs](https://github.com/GoogleChromeLabs/ndb#readme)
- "parcel-bundler": "^1.12.3" Parcel is a web application bundler, differentiated by its developer experience. It offers blazing fast performance utilizing multicore processing, and requires zero configuration [Docs](https://parceljs.org/getting_started.html)


## Features 
- modern back-end stack: Node, Express, MongoDB and Mongoose (MongoDB JS driver)
- fast, scalable, feature-rich RESTful API (includes filters, sorts, pagination, and much more)
- CRUD operations with MongoDB and Mongoose
- mongoose (including all advanced features)
- H NoSQL databases (including geospatial data)
- Advanced authentication and authorization (including password reset)
- Security: encryption, sanitization, rate limiting, etc.
- Server-side website rendering with Pug templates
