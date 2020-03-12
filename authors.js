// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

// Get all authors or add a new one
router.route('/')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM authors`, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })
    .post((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`INSERT INTO authors (firstName, lastName) VALUES (? , ?)`, [req.body.firstName,req.body.lastName], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Added new author")
            })
        })
    })

// CRUD on one autor 
router.route('/:id')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM authors WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })
    .put((req, res, post) => {})
    .delete((req, res, next) => {
        pool((err, connection) => {
            connection.query(`DELETE FROM authors WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Deleted author: " + req.params.id)
            })
        })
    })

module.exports = router
