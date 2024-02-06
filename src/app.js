import  express  from "express";
import { initSocketServer } from "./utils/socketServer.js";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import {authRoutes,userRoutes,chatRoutes,chatMessageRutes} from "./routes/index.js"
const app = express();
const server = http.createServer(app)
initSocketServer(server)

// configuracion de body-parser
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
//carpeta statica
app.use(express.static("./src/uploads"))

app.use("/",authRoutes);
app.use("/user",userRoutes);
app.use("/user",chatRoutes);
app.use("/user",chatMessageRutes);

export { server}