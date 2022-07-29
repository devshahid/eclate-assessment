// to work with expressjs
const express = require("express");
// it will use for all secrects
const dotenv = require("dotenv");
// calling express function and store meta data inside app, now app has all property of express
const app = express();

// configuring secrect keys path
dotenv.config();

// it will help to get the browser cookie
const cookieParser = require("cookie-parser");

//fetching port value from config.env
const PORT = process.env.PORT || 8000;

//using express.json to wrk with data in json form
app.use(express.json());

//using middleware for getting cookie from browser
app.use(cookieParser());

require("./database/conn");

//using routes middleware for handling different routes
app.use(require("./routes/route"));

// initializing the server at port value mentioned in config.env file
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
