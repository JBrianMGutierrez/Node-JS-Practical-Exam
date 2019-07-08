let express = require('express');
let path = require('path');
let mysql = require('mysql');

let app = express();
let indexRouter = require('./routes/index');
let PORT = '3000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

