let express = require('express');
let mysql = require('mysql');

//MySQL Setting Connections
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});



//MySQL Connection! Database and Table are created if not yet existed
db.connect(function (err) {
    if(err) {
        throw err;
    }
    else {
        console.log('MySQL Successfully Connected!');
        db.query('CREATE DATABASE IF NOT EXISTS inventory', function (err, results, fields) {
            if(err){
                throw err;
            }
            else {
                db.query('USE inventory', function (err, results, fields) {
                    if(err){
                        throw err;
                    }
                    else {
                        let createItemTable = 'CREATE TABLE IF NOT EXISTS items(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255)NOT NULL, qty INT NOT NULL DEFAULT 0, amount INT NOT NULL DEFAULT 0)';
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
            }
        });
    }
});

//Get all data
exports.getData = function (req, res, next) {
    db.query('SELECT * FROM items', function (err, rows, fields) {
        if(err){
            res.send({err});
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.send(rows);
        }
    })
};

//Get specific data
exports.getSpecificData = function (req, res, next) {
    db.query('SELECT * FROM items WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if(err){
            res.send({err});
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.send(rows)
        }
    })
};

exports.postData = function (req, res, next) {
    db.query('INSERT INTO items(name, qty, amount) VALUES(?, ?, ?)', [req.body.name, req.body.qty, req.body.amount], function (err, rows, fields) {
        if(err){
            throw err;
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.send({message: 'Data Successfully Saved!'})
        }
    })
};

exports.updateData = function (req, res, next) {
    db.query(`UPDATE items SET name = IFNULL(? , name), qty = IFNULL(? , qty) , amount = IFNULL(? , amount) WHERE id = ?`, [req.body.name, req.body.qty, req.body.amount, req.params.id], function (err, rows, fields) {
        if(err){
            throw err;
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.send({message: 'Data Successfully Updated!'})
        }
    })
};

exports.deleteData = function (req, res, next) {
    db.query('DELETE FROM items WHERE id = ?', [req.params.id], function (err, row, fields) {
        if (err){
            throw err.message;
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            return res.send({message: 'Data Successfully Deleted!'})
        }
    })
};


exports.tblReadAllData = function (req, res, next) {
    db.query('SELECT * FROM items', function (err, rows, fields) {
        if(err){
            res.send({err});
        }
        else {
            res.render('table', { items: rows, title: 'Item Table' });
        }
    });
};


exports.tblReadSpecificData = function (req, res, next) {
    db.query('SELECT * FROM items WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if(err){
            res.send({err});
        }
        else {
            res.render('item', {item: rows[0], title: 'Item Table' });
        }
    })
};

exports.tblPostData = function (req, res, next) {
    db.query('INSERT INTO items(name, qty, amount) VALUES(?, ?, ?)', [req.body.name, req.body.qty, req.body.amount], function (err, rows, fields) {
        if(err){
            throw err;
        }
        else {
            res.redirect('/crud/table')
        }
    })
};

exports.tblEditData = function (req, res, next) {
    db.query('SELECT * FROM items WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if(err){
            res.send({err});
        }
        else {
            res.render('edit', {item: rows[0]})
        }
    })
};

exports.tblUpdateData = function (req, res, next) {
    db.query('UPDATE items SET name = ? , qty = ? , amount = ? WHERE id = ?', [req.body.name, req.body.qty, req.body.amount, req.params.id], function (err, rows, fields) {
        if(err){
            throw err;
        }
        else {
            console.log("wat");
            res.redirect('/crud/table')
        }
    })
};

exports.tblDeleteData = function (req, res, next) {
    db.query('DELETE FROM items WHERE id = ?', [req.params.id], function (err, rows, fields) {
        if (err){
            throw err.message;
        }
        else {
            res.redirect('/crud/table')
        }
    })
};

