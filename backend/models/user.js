const config = require('config')
const { ExecuteSql } = require('../libs/mysql')
const { PrintLog } = require('../libs/logs')
const { HashPassword, ComparePassword, GetJwtToken } = require('../libs/hash')

const INVALID_SIGN_UP_INPUT = config.get('error.INVALID_SIGN_UP_INPUT')
const DUPLICATE_ACCOUNT = config.get('error.DUPLICATE_ACCOUNT')
const CAN_NOT_FIND_USER = config.get('error.CAN_NOT_FIND_USER')
const PASSWORD_WRONG = config.get('error.PASSWORD_WRONG')

const UserModel = {
    CreateUser: async (account, password, nickName) => {
        if (!account || !password || !nickName) throw Error(INVALID_SIGN_UP_INPUT)
        try {
            let hashPassword = await HashPassword(password)
            let insertSql = `insert into User (account, password, nickName) values ("${account}", "${hashPassword}", "${nickName}");`
            let insertResult = await ExecuteSql(insertSql)
            PrintLog(`Add a new User, id = ${insertResult.insertId}`)
        }
        catch (e) {
            PrintLog(e)
            if (e.code == "ER_DUP_ENTRY") throw Error(DUPLICATE_ACCOUNT)
            else throw Error(e)
        }
    },
    UserLogin: async (account, password) => {
        if (!account || !password) throw Error(INVALID_SIGN_UP_INPUT)
        try {
            let sql = `select * from User where account = "${account}";`
            let result = await ExecuteSql(sql)
            if (result.length == 0) throw Error(CAN_NOT_FIND_USER)
            let compareResult = await ComparePassword(password, result[0]['password'])
            if (!compareResult) throw Error(PASSWORD_WRONG)
            const token = GetJwtToken(result[0]['userId'], result[0]['account'], result[0]['nickName'])
            PrintLog(`User account = ${account} login success`)
            return token            
        }
        catch (e) {
            PrintLog(e)
            throw Error(e)
        }
    },
    BindKey: async (userId, keys) => {
        const { openId, speechRegion, speechKey } = keys
        try {
            let bindSql = `update User set openId = "${openId}", speechRegion = "${speechRegion}", speechKey = "${speechKey}" where userId = ${userId};`
            let result = await ExecuteSql(bindSql)
            if (result.affectedRows == 0) throw Error(CAN_NOT_FIND_USER)
        }
        catch (e) {
            PrintLog(e)
            throw Error(e)
        }
    },
    GetBindStatus: async (userId) => {
        try {
            let sql = `select openId, speechRegion, speechKey from User where userId = ${userId};`
            let result = await ExecuteSql(sql)
            if (result.length == 0) throw Error(CAN_NOT_FIND_USER)
            const {openId, speechRegion, speechKey} = result[0]
            if (!openId || !speechRegion || !speechKey) return false 
            return true
        }
        catch (e) {
            PrintLog(e)
            throw Error(e)            
        }
    },
    UnBindKey: async (userId) => {
        try {
            let sql = `update User set openId = NULL, speechRegion = NULL, speechKey = NULL where userId = ${userId};`
            let result = await ExecuteSql(sql)
            if (result.affectedRows == 0) throw Error(CAN_NOT_FIND_USER)
        }
        catch (e) {
            PrintLog(e)
            throw Error(e)            
        }
    }
}

module.exports = UserModel