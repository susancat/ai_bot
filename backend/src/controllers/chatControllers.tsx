import { Request, Response, NextFunction } from "express";
import User from '../models/User';
import { configureOpenAI } from "../config/openaiConfig";
// import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import OpenAI, {ChatCompletionRequestMessage} from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).json({message: 'User not registered OR Token malfunctioned'});
        }
        console.log("user:", user)
        //grab chats of user: https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js
        const chats = user.chats.map(({role, content}) => ({ role, content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: 'user' });
        user.chats.push({ content: message, role: "user" });

        //send all chats with new one to open AI API
        // const config = configureOpenAI();
        // console.log("openai config:" + config)
        // const openai = new OpenAIApi(config);
        //get latest response
        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            // messages: chats,
            messages: [{ role: 'user', content: 'Say this is a test' }],
          });
          console.log("chat: ", chatResponse.choices[0]?.message.content);
        // user.chats.push(chatResponse.choices[0]?.message);
        // await user.save();
        // return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Something went wrong" });
    }
} 