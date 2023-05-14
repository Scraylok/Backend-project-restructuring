import { io } from "../index.js";
import { resMessages, createMessage } from "../services/messageService.js";

//Trae los mensajes
export const getMessages = async (req, res) => {
    try {
        const messages = await resMessages();
        console.log(messages)
        res.status(200).json({
            messages: messages
        })
    }catch(error) {
      res.status(500).send({
        message: "Server error",
        error: error.message
    })}
}   
//Se envia los mensajes del usuario
export const sendMessage = async (req, res) => {
    const { first_name,email, message } = req.body;
    try{
        await createMessage ({
            name: first_name,
            email: email,
            message: message
        })
        const messages = await resMessages()
        io.emit(messages)
        res.status(200).send({
            message: "Mensaje enviado",
        })
    }catch(error){
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
    });
    } 
}