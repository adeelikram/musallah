// require express app
var express = require('express');
var mongo = require('./mongo');
var app = express();
// express cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// express json
app.use(express.json());
// express url extended
app.use(express.urlencoded({ extended: true }));
// express require router signUp,login, addMosque,getMosque 
app.use(require('./routes/signUp'));
app.use(require('./routes/verify'));
app.use(require('./routes/login'));
app.use(require('./routes/addMosque'));
app.use(require('./routes/getMosque'));
// express listen
app.listen(3000);
