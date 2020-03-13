// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Get all borrowers/book relation which is currently loaned
router.route('/all')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(
                    `SELECT borrowers.firstName, borrowers.lastName, books.name AS BookTitle FROM books
                     JOIN borrowers_books ON books.id = borrowers_books.bookID
                     JOIN borrowers ON borrowers_books.borrowerID = borrowers.id
                     `, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })


// Check if a potential borrower has any books loaned
router.route('/:firstName')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(
                `SELECT borrowers.firstName, borrowers.lastName, books.name AS BookTitle FROM books
                 JOIN borrowers_books ON books.id = borrowers_books.bookID
                 JOIN borrowers ON borrowers_books.borrowerID = borrowers.id 
                 WHERE borrowers.firstName = ` + connection.escape(req.params.firstName), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

module.exports = router
