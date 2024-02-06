import { chatMessage } from "../models/chat_message.js";
import { io, getFilePath } from "../utils/index.js";

//TODO: Creacion de mensajes y guardao en la base de datos
const sendText = async (req, res) => {
  const { chat_id, message } = req.body;
  const { user_id } = req.user;
  try {
    const chat_message = new chatMessage({
      chat: chat_id,
      user: user_id,
      message,
      type: "TEXT",
    });

    const chatSend = await chat_message.save();
    if (!chatSend) return res.status(400).send("no se guardo el mensaje");
    const data = await chat_message.populate("user");

    //? Enviamos el mensaje con socket a un o varios usuarios por medio de emit "message"
    io.sockets.in(chat_id).emit("message", data);
    //? Emitimos una notificacion para que el usuario sepa que le llego un mensaje si esta fuera del chat
    io.sockets.in(`${chat_id}_nofify`).emit("message_nofify", data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//TODO: guardar imagen y enviar el mensaje
const sendImage = async (req, res) => {
  try {
    const { chat_id } = req.body;
    const { user_id } = req.user;
    let url_image = " ";
    if (req.files.image) {
      url_image = getFilePath(req.files.image);
    }

    const chat_message = new chatMessage({
      chat: chat_id,
      user: user_id,
      message: url_image,
      type: "IMAGE",
    });
    const chat_message_img = await chat_message.save();
    if (!chat_message_img)
      return res.status(400).send("no se puso guardar la imagen");
    const data = await chat_message.populate("user");
    //? Enviamos el mensaje con socket a un o varios usuarios por medio de emit "message"
    io.sockets.in(chat_id).emit("message", data);
    //? Emitimos una notificacion para que el usuario sepa que le llego un mensaje si esta fuera del chat
    io.sockets.in(`${chat_id}_nofify`).emit("message_nofify", data);
    res.status(200).send({});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const { chat_id } = req.params;

  const Messages = await chatMessage
    .find({ chat: chat_id })
    .sort({ createdAt : 1 }).
    populate("user")
    .select(["-user.password"])
    .exec()

    // const totalMessages = await chatMessage.find({ chat: chat_id }).count()
    const totalMessages = await chatMessage.find({ chat: chat_id }).countDocuments();

  res.status(200).send({ Messages, total: totalMessages});
};

const getTotalMessages = async (req,res) => {
    const {chat_id} = req.params
    try {
        const response = await chatMessage.findOne({ chat: chat_id}).countDocuments();
        if(!response) return res.status(404).send({msg:"no se encontro mensaje"})
        res.status(200).send({msg:response})
    } catch (error) {
        res.status(500).send("Error servidor: " + error.message)
    }
res.status(200).send("total")
}

const getLastMessage = async (req, res) => {
    const {chat_id} = req.params
    try {
        const response = await chatMessage.findOne({chat:chat_id}).sort({
            createdAt: -1
        })
        res.status(200).send({msg:response}) 
    } catch (error) {
        res.status(500).send({errorserver:error.message})  
    }

}

export const chatMessageController = { sendText, sendImage, getAll,getTotalMessages,getLastMessage };
