import messageModel from "../models/MongoDB/messageModel";

//Creación del mensaje
export const createMessage = async (message) => {
    try{
        const newMessage = await messageModel.create(message)
        return newMessage
    }catch(error) { 
        throw new error(error)
    }
}

//Trae los mensajes
export const resMessages = async () => {
    try{
        return await messageModel.find()
    }catch(error) {
        throw new error(error)
    }
}