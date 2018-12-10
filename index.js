'use strict';
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys')
require('./models/user');
require('./services/passport');
// connection to database AWS and mlab
mongoose.connect(keys.mongoURI,  {useNewUrlParser: true} );
const app = express();

//require returns a function and then it is immediately called
require('./routes/authRoutes')(app);


//server listening on environmental PORT or localhost 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT);

