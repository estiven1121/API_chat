import express from "express";
import { UserController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/index.js";
import muliparty from "connect-multiparty"
const api = express.Router();
const md_upload = muliparty({uploadDir:"./src/uploads/avatar"})
api.get("/me", mdAuth.asureAuth, UserController.getMe);
api.patch("/me", mdAuth.asureAuth,md_upload, UserController.updateUser);
api.get("/users", mdAuth.asureAuth, UserController.getUsers);
api.get("/users/:id", mdAuth.asureAuth, UserController.getUser);

export const userRoutes = api;
