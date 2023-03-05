require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10
const JWT_KEY = process.env.JWT_KEY

// hash password
const HashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
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

// generate jwt token
const GetJwtToken = (userId, account, nickName) => {
    const token = jwt.sign({ userId: userId, account: account, nickName: nickName }, JWT_KEY)
    return token
}

const GetUserDataFromJwt = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_KEY, (err, userInfo) => {
            if (err) return reject(err)
            return resolve(userInfo)
        });
    })
    
}

module.exports = { HashPassword, ComparePassword, GetJwtToken, GetUserDataFromJwt }