let express = require('express');

let mysql = require('mysql');

let app = express();
let indexRouter = require('./routes/index');
let PORT = '3000';

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

db.connect(function (err) {
    if(err) {
        throw err;
    }
    else {
        console.log('MySQL Successfully Connected!')
    }
});

app.use('/', indexRouter);

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
});

