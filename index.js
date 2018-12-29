'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const mainRoutes = require('./routes/mainRoutes');
const bodyParser = require("body-parser")
const jsonParser = require("body-parser").json;
require('./models/User');
require('./services/passport');
// connection to database AWS and mlab
mongoose.connect(keys.mongoURI,  {useNewUrlParser: true} );
const app = express();

//make use of sessions
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        keys:[keys.cookieKey]
    })
)
// tell passport to use sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(jsonParser()); // place before routes
//app.use("./routes/mainRoutes", mainRoutes);
//require returns a function and then it is immediately called

require('./routes/authRoutes')(app);
require('./routes/mainRoutes')(app);

//server listening on environmental PORT or localhost 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT);

