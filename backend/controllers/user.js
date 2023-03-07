const UserModel = require('../models/user')
const config = require('config')
const { GetUserDataFromJwt } = require('../libs/hash')

const OpenAIModel = require('../models/openai')
const AzureModel = require('../models/azure')

const CREATE_USER = config.get('success.CREATE_USER')
const SIGN_IN = config.get('success.SIGN_IN')
const BIND_CHECK = config.get('success.BIND_CHECK')


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
            const {nickName} = await GetUserDataFromJwt(token)
            res.json({token: token, nickName: nickName, message: SIGN_IN})
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    },
    UserBindKey: async (req, res) => {
        try {
            const { userId } = req.userInfo
            const { openId, speechRegion, speechKey } = req.body 
            await OpenAIModel.CheckOpenId(openId)
            await AzureModel.CheckAzureId(speechRegion, speechKey)
            res.json({message: BIND_CHECK})
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    }

}

module.exports = UserController