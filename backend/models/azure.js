const axios = require('axios')
const config = require('config')
const INVALID_AZURE = config.get('error.INVALID_AZURE')

const AzureModel = {
    CheckAzureId: async (speechRegion, speechKey) => {
        try {
            const response = await axios.get(`https://${speechRegion}.tts.speech.microsoft.com/cognitiveservices/voices/list`, {
                headers: { 'Ocp-Apim-Subscription-Key': speechKey }
            })
        }
        catch (e) {
            throw Error(INVALID_AZURE)
        }
    }
}

module.exports = AzureModel