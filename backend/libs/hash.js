const bcrypt = require('bcrypt')
const saltRounds = 10

// hash password
const HashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return reject(err)
            }
            return resolve(hash)
        })
    })
}

// compare password and hash password
const ComparePassword = (password, hashPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = { HashPassword, ComparePassword }