let express = require('express');
let mysql = require('mysql');

//MySQL Setting Connections
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory'
});

//MySQL Connection and Table Query if not yet existed
db.connect(function (err) {
    if(err) {
        throw err;
    }
    else {
        console.log('MySQL Successfully Connected!');
        let createItemTable = 'CREATE TABLE IF NOT EXISTS ITEMS(ID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(255)NOT NULL, QTY INT NOT NULL DEFAULT 0, AMOUNT INT NOT NULL DEFAULT 0)';
        db.query(createItemTable, function (err, results, fields) {
            if(err) {
                throw err;
            }
            else {
                console.log('Table Successfully Created!')
            }
        })
    }
});

exports.getData = function (req, res, next) {
    db.query('SELECT * FROM items', function (err, result) {
        res.setHeader('Content-Type', 'application/json');
        return res.json(result)
    })
};