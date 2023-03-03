const UserModel = require('../models/user')
const config = require('config')

const CREATE_USER = config.get('success.CREATE_USER')
const SIGN_IN = config.get('success.SIGN_IN')

const UserController = {
    UserSignUp: async (req, res) => {
        try {
            await UserModel.CreateUser(req.body.account, req.body.password, req.body.nickName)
            res.json({message: CREATE_USER})
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    },
    UserSignIn: async (req, res) => {
        try {
            const token = await UserModel.UserLogin(req.body.account, req.body.password)
            res.json({token: token, message: SIGN_IN})
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    }

}

module.exports = UserController