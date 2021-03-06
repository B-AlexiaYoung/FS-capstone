"use strict";
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const jsonParser = require("body-parser").json;
require("./models/User");
require("./services/passport");
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);
const app = express();

app.use(jsonParser()); // place before routes
app.use(bodyParser.urlencoded({ extended: false }));
//make use of sessions
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    keys: [keys.cookieKey]
  })
);
// tell passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

//require returns a function and then it is immediately called

require("./routes/authRoutes")(app);
require("./routes/mainRoutes")(app);

// for heroku production env
if (process.env.NODE_ENV === "production") {
  //serve production assets main.js main.css
  app.use(express.static("client/build"));
  //express to forward html file if route is not recognized
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});
//server listening on environmental PORT or localhost 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT);
