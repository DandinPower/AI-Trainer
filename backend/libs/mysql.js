const mysql = require('mysql2');
require('dotenv').config()

// connect with docker mysql
const pool = mysql.createPool({
    connectionLimit: process.env.DB_LIMIT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// execute sql script with connect mysql databasse
const ExecuteSql = (_sql) => {
    return new Promise((resolve, reject) => {

        pool.query(_sql, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

module.exports = { ExecuteSql }