import { User } from "../models/index.js";
import bscrypt from "bcryptjs"
import {jwt} from "../utils/index.js"
async function register(req, res) {
    const { email, password, lastname, firsname } = req.body;

    try {

        const salt = bscrypt.genSaltSync(10)
        const hashPassword = bscrypt.hashSync(password, salt)
        // Creamos una nueva instancia del modelo User
        const user = new User({
            email: email.toLowerCase(),
            password: hashPassword,
            lastname: lastname,
            firsname: firsname,
        });
        console.log(user)
        const existUser = await User.findOne({
            email
          });
          
          //validamos si el correo ya existe en la base de datos
          if (existUser){
            res.status(201).send("el usuario ya existe");
            return
          }
         
        // Guarda el usuario en la base de datos
        const userStorage = await user.save();

        // Responde con el usuario creado
        res.status(201).send(userStorage);
    } catch (error) {
        console.error(error);
        // Manejo de errores en caso de fallo al guardar en la base de datos
        res.status(400).send(`Error al registrar el usuario ${firstname}`);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLowerCase = email.toLowerCase();

        const user = await User.findOne({ email: emailLowerCase });

        if (!user) {
            return res.status(200).send("Usuario no encontrado");
        }

        // Comparar la contraseña proporcionada con el hash almacenado
        const passwordMatch = await bscrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(200).send("Contraseña incorrecta");
        }

        res.status(200).json({
            access: jwt.createAccessToken(user),
            refresh:jwt.refreshToken(user)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error del servidor");
    }
};

const refresAccessToken = async(req,res) => {
  try {
    const { refreshToken } = req.body
    if(!refreshToken) return res.status(403).send("token requerido")
   const hashExpired =  jwt.hashExpiredToken(refreshToken)
if(hashExpired) return res.status(400).send("token expirado")

const {user_id} = jwt.decoded(refreshToken)
console.log(user_id+"pruebas user")
const user = await User.findById(user_id);
console.log(user+"pruebas user")
if (user) {
    res.status(200).send({
        accessToken:jwt.createAccessToken(user)
    });
}
    
  } catch (error) {
    res.status(250).send("error: " + error.message);
  }
}

export const AuthController = { register,login,refresAccessToken };



