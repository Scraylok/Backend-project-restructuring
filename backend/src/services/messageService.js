import messageModel from "../models/MongoDB/messageModel";

export const createMessage = async (message) => {
    try{
        const newMessage = await messageModel.create(message)
        return newMessage
    }catch(error) { 
        throw new error(error)
    }
}

export const resMessages = async () => {
    try{
        return await messageModel.find()
    }catch(error) {
        throw new error(error)
    }
}