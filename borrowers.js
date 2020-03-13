// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Get all borrowers
router.route('/')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM borrowers`, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

    .post((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`INSERT INTO borrowers (firstName, lastName, age) VALUES (? , ?, ?)`, [req.body.firstName, req.body.lastName, req.body.age], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Added new potential borrower")
            })
        })
    })

// CRUD on one borrower
router.route('/:id')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM borrowers WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

    .put((req, res, post) => {
        pool((err, connection) => {

            connection.query("UPDATE borrowers SET `firstName` = ?, `lastName` = ?, `age` = ? WHERE id = " + connection.escape(req.params.id), 
            [req.body.firstName, req.body.lastName, req.body.age], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Updated borrowed with id: " + req.params.id + " with following values => Firstname: " + req.body.firstName + ", Lastname: " + req.body.lastName + " age: " + req.body.age)
            })
        })
    })
    
    .delete((req, res, next) => {
        pool((err, connection) => {
            connection.query(`DELETE FROM borrowers WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Deleted borrower " + req.params.id)
            })
        })
    })

module.exports = router
