// const { Configuration, OpenAIAPI} = require('openai')
// const configuration = new Configuration( { apiKey : process.env.OPENAI_API_KEY } )
// import OpenAI from "openai";
const OpenAI =require('openai')
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY , dangerouslyAllowBrowser: true });



export async function sendMsgToOpenAI(prompt){
    const message = [
        {
            role: "system",
            content: "You are a helpful assistant that paraphrase the lyrics, but do not translate them."
        },
        {
            role: "user",
            content: prompt
        }
    ];

    const res = await openai.chat.completions.create({
        model : 'gpt-3.5-turbo',
        messages: message,
        temperature : 0.5,
    });
    return res.data.choices[0].message.content;
}