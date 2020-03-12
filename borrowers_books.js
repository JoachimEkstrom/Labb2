// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Get all borrowers/book relation
router.route('/')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM borrowers_books`, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })
    .post((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`INSERT INTO borrowers_books (borrowerID, bookID) VALUES (? , ?)`, [req.body.borrowerID, req.body.bookID], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Added new borrower/book relation")
            })
        })
    })

// CRUD on one borrower/book relation
router.route('/:id')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM borrowers_books WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })
    .put((req, res, post) => {})
    .delete((req, res, next) => {
        pool((err, connection) => {
            connection.query(`DELETE FROM borrowers_books WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Deleted borrower/book relation " + req.params.id)
            })
        })
    })

module.exports = router
