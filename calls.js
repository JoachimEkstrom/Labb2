// Add connection details
const pool = require('./connectionPool.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const router = express.Router()


// Call procedure
router.route('/procedure')
.get((req, res, next) => {     
    pool((err, connection) => {
        connection.query(`CALL upper_case()`, (error, result, fields) => {
            connection.release()
            if (error) throw error
            res.send("Procedure called - Adding capital letter to books name")
        })
    })
})

module.exports = router
