require('dotenv').config()
const config = require('config')
const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

const MISS_TOKEN = config.get('error.MISS_TOKEN')
const INVALID_TOKEN = config.get('error.INVALID_TOKEN')

const AuthenticateToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        res.status(401).send(MISS_TOKEN)
        return
    }
    jwt.verify(token, JWT_KEY, (err, userInfo) => {
        if (err) {
          res.status(403).send(INVALID_TOKEN);
          return;
        }
        req.userInfo = userInfo;
        next();
    });
}

module.exports = {AuthenticateToken}