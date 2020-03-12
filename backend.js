// Routes
const authors = require('./authors.js')
const authors_books = require('./authors_books.js')
const books = require('./books.js')
const borrowers = require('./borrowers.js')
const borrowers_books = require('./borrowers_books.js')
const calls = require('./calls.js')

// Fix Express 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

// Link all external routing files
app.use('/authors', authors)
app.use('/authors_books', authors_books)
app.use('/books', books)
app.use('/borrowers', borrowers)
app.use('/borrowers_books', borrowers_books)
app.use('/calls', calls)

app.listen(3000, () => {
    console.log("Server is running!")
})