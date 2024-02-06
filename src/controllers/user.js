import { User } from "../models/index.js";
import {getFilePath} from "../utils/index.js"
//? OBTENGO EL USUARIO LOGUEADO
const getMe = async (req, res) => {
  const { user_id } = req.user;

  try {
    const response = await User.findById(user_id).select(["-password"]);
    if (!response)
      return res.status(400).send("No se ha encontrado el usuario");
    res.status(200).send(response);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
//?OBTENGO TODOS LOS USUARIOS MENOS EL QUE ESTE LOGUEADO
const getUsers = async (req, res) => {
  try {
    const { user_id } = req.user;
    const users = await User.find({ _id: { $ne: user_id } }).select([
      "-password",
    ]);

    if (!users)
      return res.status(404).json({ msg: "no se encontraron usuarios" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

//?OBTENER USUARIO CON EL ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(["-password"]);
    console.log(user);
    if (!user) return res.status(404).json({ msg: "no se encotro el usuario" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.user;
  const userdata = req.body;
if (req.files.avatar) {
    console.log(req.files.avatar)
    const imagepath = getFilePath(req.files.avatar)
    userdata.avatar = imagepath;
}
try {
    const userUpdate = await User.findByIdAndUpdate({_id:user_id}, userdata).select(["-password"])
    
    if (!userUpdate) return  res.status(400).json({ msg: "error al actualizar el usuario" });
    res.status(200).json(userUpdate);
} catch (error) {
    res.status(500).json({ msg: "error del servidor" });
}

 
};

export const UserController = { getMe, getUsers, getUser, updateUser };
