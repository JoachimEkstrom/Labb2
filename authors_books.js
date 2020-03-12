// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Get all info about authors an books or add new author/book relation
router.route('/')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM authors_books`, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })
    .post((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`INSERT INTO authors_books (authorID, bookID) VALUES (? , ?)`, [req.body.authorID, req.body.bookID], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Added new author/book relation")
            })
        })
    })

// CRUD on one author/book relation
router.route('/:id')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM authors_books WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })
    .put((req, res, post) => {})
    .delete((req, res, next) => {
        pool((err, connection) => {
            connection.query(`DELETE FROM authors_books WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Deleted author/book: " + req.params.id)
            })
        })
    })

module.exports = router
