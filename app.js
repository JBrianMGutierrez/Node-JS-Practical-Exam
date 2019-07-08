let express = require('express');

//var mysql = require('mysql');

let app = express();
let indexRouter = require('./routes/index');
let PORT = '3000';

app.use('/', indexRouter);

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
});

