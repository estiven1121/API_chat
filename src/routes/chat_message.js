import express from "express";
import multiparty from "connect-multiparty";
import { chatMessageController } from "../controllers/chat_message.js";
import { mdAuth } from "../middlewares/index.js";

const mdUpload = multiparty({uploadDir:"./src/uploads/images"})
const api = express.Router();

api.post("/chat/message",mdAuth.asureAuth,chatMessageController.sendText)//? envio un chat
api.post("/chat/image",mdAuth.asureAuth,mdUpload,chatMessageController.sendImage) //? envio una imagen
api.get("/chat/message/:chat_id",mdAuth.asureAuth,chatMessageController.getAll) //? recibo todos los mensajes y el total del id del chat
api.get("/chat/message/total/:chat_id",mdAuth.asureAuth,chatMessageController.getTotalMessages) //? recibo el total todos los mensajes del id del chat
api.get("/chat/message/last/:chat_id",mdAuth.asureAuth,chatMessageController.getLastMessage) //? recibo el ultimo mensaje 


export const chatMessageRutes = api
