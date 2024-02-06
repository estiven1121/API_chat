import {Chat,chatMessage} from "../models/index.js"

const create = async (req,res) => {
    const {participant_id_one,participant_id_two} = req.body
  
  try {
    const foundOne = await Chat.findOne({
        participant_one:participant_id_one,
        participant_two:participant_id_two 
    })
    const foundTwo = await Chat.findOne({
        participant_two:participant_id_one,
        participant_one:participant_id_two
    })
    
    if (foundOne || foundTwo) return  res.status(200).send("ya tienes mensaje chat")

    const chat = new Chat({
        participant_one:participant_id_one,
        participant_two:participant_id_two
    })
    const chatCreate = await chat.save()
    res.status(200).send(chatCreate)
  } catch (error) {
    res.status(200).send(error.message)
  }
}

const getAll = async (req, res) => {
    const { user_id } = req.user;
    try {
        const chats = await Chat.find({
            $or: [
                { participant_one: user_id },
                { participant_two: user_id }
            ]
        })
        .populate("participant_one")
        .populate("participant_two")
        .exec();
    
        if (!chats || chats.length === 0) {
            return res.status(404).json({ error: "No se encontraron chats" });
        }
    
        const arrayChats = [];
        
        for await (const chat of chats){
            const response = await chatMessage.findOne({chat:chat._id}).sort({
                createdAt: -1
            })
            arrayChats.push({
                ...chat._doc,
                last_message_date: response?.createdAt || null

            });
        }
        //65bd9bfdedab938f374fc069
        res.status(200).json(arrayChats);
    } catch (err) {
        console.error("Error al obtener los chats:", err);
        res.status(500).json({ error: "Error al obtener los chats" });
    }
};


const deleteChat = async (req, res) => {
   try {
    const chat_id = req.params.id

    const delChat = await Chat.findByIdAndDelete(chat_id)
   if (!delChat)  return  res.status(400).send("no se pudo eliminar el chat");
    res.status(200).send("chat eliminado correctamente");
   } catch (error) {
    res.status(500).send("error "+error.message);
   }
}

const getChat = async (req,res) => {
   try {
    const chat_id = req.params.id;

    const chat = await Chat.findById(chat_id)
    .populate("participant_one")
        .populate("participant_two")
    .exec()
if (!chat) return  res.status(200).send("no se encontraron chats");
res.status(200).send(chat);
   
   } catch (error) {
    res.status(500).send(error.message);
   }
}
export const chatController = {create,getAll,deleteChat,getChat}