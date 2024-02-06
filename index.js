import {server} from './src/app.js';
import  {PORT,IP_SERVER} from "./src/constants.js";
import  {io} from "./src/utils/index.js";
import './src/db.js'; 



server.listen(PORT,()=>{
    
    console.log(`conectado puerto ${PORT} y servidor es ${IP_SERVER},`)
    io.sockets.on("connection",(socket)=>{
   
         console.log("nuevo usuario conectado")

        socket.on("disconnect",()=>{
            console.log("usuario desconectado")
        })

        socket.on("subscribe",(room)=>{
            socket.join(room)
        })

        socket.on("unsubscribe",(room)=>{
            socket.leave(room)
        })
    })

})