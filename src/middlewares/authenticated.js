import { User } from "../models/user.js";
import {jwt} from "../utils/index.js";

const asureAuth = (req,res,next) =>{
   try {
    if (!req.headers.authorization) {
        res.status(403).json({msg:"Falta autenticacion"}) 
    }
const token = req.headers.authorization.replace("Bearer ", "")

const hasExpired = jwt.hashExpiredToken(token)
if (hasExpired) return res.status(400).json({msg:"El token ha expirado"})
const payload = jwt.decoded(token)
// una vez validado el token le doy el usuario a req y la llamo user 
req.user=payload
 next()
   } catch (error) {
    res.status(500).json({error:"Token invalido"}) 
   }
}

export const mdAuth = {
    asureAuth
}