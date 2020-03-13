// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Get all info about authors and books
router.route('/all')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(
                `SELECT authors.firstName, authors.lastName, books.name AS BookTitle FROM authors
                 JOIN authors_books ON authors.id = authors_books.authorID
                 JOIN books ON authors_books.bookID = books.id`, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

// Get info about what books a certain author has produced
router.route('/:lastName')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(
                `SELECT authors.firstName, authors.lastName, books.name AS BookTitle FROM authors
                 JOIN authors_books ON authors.id = authors_books.authorID
                 JOIN books ON authors_books.bookID = books.id
                 WHERE authors.lastName = ` + connection.escape(req.params.lastName), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

module.exports = router
