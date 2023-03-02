require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const app = express()
const port = process.env.SERVER_PORT
const routes = require('./routes')
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 限制5分鐘
    max: 1000 // 限制請求數量
})

app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.listen(port, () => {        //伺服器運行的Function
    console.log(`Server listening at http://localhost:${port}`)  //運作提示字樣
})

app.use('/', routes)

module.exports = app