// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const router = express.Router()



// Get books or add a new one
router.route('/')
    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM books`, (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

    .post((req, res, next) => {     
        pool((err, connection) => {
            console.log(req.body)
            connection.query(`INSERT INTO books (name, genre) VALUES ( ?, ?)`, [req.body.name, req.body.genre], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Added a new book")
            })
        })
    })

// CRUD on one book
router.route('/:id')

    .get((req, res, next) => {     
        pool((err, connection) => {
            connection.query(`SELECT * FROM books WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.json(result)
            })
        })
    })

    .put((req, res, post) => {
        pool((err, connection) => {

            connection.query("UPDATE books SET `name` = ?, `genre` = ? WHERE id = " + connection.escape(req.params.id), 
            [req.body.name, req.body.genre], (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Updated book with id: " + req.params.id + " with following values => Name: " + req.body.name + ", genre: " + req.body.genre)
            })
        })
    })
    
    .delete((req, res, next) => {
        pool((err, connection) => {
            connection.query(`DELETE FROM books WHERE id = ` + connection.escape(req.params.id), (error, result, fields) => {
                connection.release()
                if (error) throw error
                res.send("Deleted book: " + req.params.id)
            })
        })
    })

module.exports = router
