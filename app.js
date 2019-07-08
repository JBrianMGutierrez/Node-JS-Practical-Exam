let express = require('express');
let path = require('path');
let bodyParser = require("body-parser");

let app = express();
let indexRouter = require('./routes/index');
let PORT = '3000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes Path
app.use('/', indexRouter);

//Test Server
app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
});

module.exports = app;