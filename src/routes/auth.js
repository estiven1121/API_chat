import  express  from "express";
import { AuthController } from "../controllers/index.js"

const api = express.Router();

//todo: definimos los endpoints

api.post("/auth/register",AuthController.register);//? esta nos sirve para registrar el usuario 
api.post("/auth/login",AuthController.login); //? aca podemos loguearnos con emmail y password
api.post("/auth/refresh_access_token",AuthController.refresAccessToken); //? para refrescar el access token

export const authRoutes = api