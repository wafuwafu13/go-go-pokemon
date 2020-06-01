require('dotenv').config()
const mysql = require('mysql')

const env = process.env

const connection = mysql.createConnection({
    host: env.HOST,
    user: env.USER,
    database: env.DATABASE,
    password: env.PASSWORD
})

connection.connect();

connection.query("select * from pokemons;", function(err, rows, fields) {
    if (err) {
        console.log(err)
    }
    console.log(rows)
})

connection.end()