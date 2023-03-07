const { Configuration, OpenAIApi} = require('openai')
const config = require('config')
const INVALID_OPEN = config.get('error.INVALID_OPEN')

const OpenAIModel = {
    CheckOpenId: async (openId) => {
        try {
            const configuration = new Configuration({
                apiKey: openId,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.listModels()
        }
        catch (e) {
            throw Error(INVALID_OPEN)
        }
    }
}

module.exports = OpenAIModel