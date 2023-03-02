const PrintLog = (_str) => {
    const date = new Date();
    console.log(`[${date.toLocaleString()}] ${_str}`)
}

const GetTime = () => {
    const date = new Date()
    return date.toLocaleString()
}

module.exports = { PrintLog, GetTime }