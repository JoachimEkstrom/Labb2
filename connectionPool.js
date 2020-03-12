const mysql = require('mysql')


let pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'labb',
    password: 'password',
    database: 'biblan',
    multipleStatements: true
})

let poolConnection = (callback) => {
    pool.getConnection((err, connection) => {
        callback(err, connection)
    })
}




module.exports = poolConnection