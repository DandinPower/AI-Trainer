require('dotenv').config()
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const {AuthenticateToken} = require('../middlewares/user')

router.get('/', AuthenticateToken, (req, res) => {
    res.send('Hello World')
})

router.post('/api/v1/SignUp', UserController.UserSignUp)
router.post('/api/v1/SignIn', UserController.UserSignIn)

router.post('/api/v1/BindKey', AuthenticateToken, UserController.UserBindKey)
router.get('/api/v1/BindStatus', AuthenticateToken, UserController.GetBindStatus)
router.get('/api/v1/UnBindKey', AuthenticateToken, UserController.UnBindKey)

module.exports = router