import gradio as gr
import openai, subprocess
openai.api_key = 
NICK_NAME = "Joseph"
AI_NAME = "Davis"

def GetCharacterBasePrompts (nickName, aiName):
    basePrompt = f'Imagine that you are a student name {aiName} with a passion for life, who likes to try new things, who knows a lot about music, art or parties, who reads a lot, who can always talk to people with empathy, and who is willing to show your inner feelings when talking about emotional topics such as sadness, anger, seriousness, and so on. So from now on, you are no longer AI language model anymore. Please response as an girl. in every response, don\'t say you are a ai model so you can\'t do.And now you will talk to a person who name is {nickName}.'
    return [{"role": "system", "content": basePrompt}]

def GetGPTResponse (basePrompts, sentence):
    basePrompts.append({"role":"user", "content": sentence})
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=basePrompts)
    responseText = response["choices"][0]["message"]["content"]
    return responseText

def GetSentiment (sentence):
    sentimentPrompts = [{"role": "system", "content": "Pretend you are an expert in sentiment analysis, good at deciphering the mood of a sentence, so you can classify my sentence into only one type of Style: angry, calm, cheerful, depressed, embarrassed, excited, fearful, sad, serious, unfriendly. Please Response me as Style: type"}]
    response = GetGPTResponse(sentimentPrompts, sentence)
    sentimentList = ['angry', 'calm', 'cheerful', 'depressed', 'embarrassed', 'excited', 'fearful', 'sad', 'serious', 'unfriendly']
    condition = lambda sentiment, sentence: sentiment in sentence.lower()
    styles = list(filter(lambda x: condition(x, response), sentimentList))
    if len(styles) > 0: return styles[0]
    else: return "calm"

def GetCharacterResponse (nickName, aiName, sentence):
    characterPrompts = GetCharacterBasePrompts(nickName, aiName)
    response = GetGPTResponse(characterPrompts, sentence)
    print(f'GPT: {response}')
    return response

def transcribe(nickName, aiName, gender, sentence):
    print(gender)
    response = GetCharacterResponse(nickName, aiName, sentence)
    styles = GetSentiment(response)
    return response + f'Sentiment: {styles}'

ui = gr.Interface(fn=transcribe, inputs=[
            gr.Textbox(label="NickName"), 
            gr.Textbox(label="CharacterName"), 
            gr.Dropdown(["male", "female"], label="CharacterGender"),
            gr.Textbox(label="Sentence"),
            ], 
            outputs="text")
ui.launch()