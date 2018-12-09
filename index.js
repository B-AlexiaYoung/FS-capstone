'use strict';
const express = require ('express');
const app = express();
app.get('/', (req, res) =>{
    res.send ({hi:'there'})
//sign-in page here
})

//server listening on environmental PORT or localhost 5000;
const PORT = process.env.PORT || 5000
app.listen(PORT);