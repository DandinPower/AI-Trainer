const UserModel = require('../models/user')
const config = require('config')
const { GetUserDataFromJwt } = require('../libs/hash')

const OpenAIModel = require('../models/openai')
const AzureModel = require('../models/azure')

const CREATE_USER = config.get('success.CREATE_USER')
const SIGN_IN = config.get('success.SIGN_IN')
const BIND_CHECK = config.get('success.BIND_CHECK')
const CHECK_BIND_STATUS = config.get('success.CHECK_BIND_STATUS')
const UNBIND_KEY = config.get('success.UNBIND_KEY')

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
            await UserModel.BindKey(userId, { openId: openId, speechRegion: speechRegion, speechKey: speechKey})
            res.json({message: BIND_CHECK})
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    },
    GetBindStatus: async (req, res) => {
        try {
            const { userId } = req.userInfo
            const status = await UserModel.GetBindStatus(userId)
            res.json({bindStatus: status, message: CHECK_BIND_STATUS})            
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    },
    UnBindKey: async (req, res) => {
        try {
            const { userId } = req.userInfo
            await UserModel.UnBindKey(userId)
            res.json({message: UNBIND_KEY})
        }
        catch (e) {
            res.status(403).json({message: e.message})
        }
    }

}

module.exports = UserController