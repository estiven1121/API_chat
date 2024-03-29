import express from "express";
import { chatController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/chat", mdAuth.asureAuth, chatController.create);
api.get("/chat", mdAuth.asureAuth, chatController.getAll);
api.delete("/chat/:id", mdAuth.asureAuth, chatController.deleteChat);
api.get("/chat/:id", mdAuth.asureAuth, chatController.getChat);

export const chatRoutes = api;
