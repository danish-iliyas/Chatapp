import express  from "express";
import { User } from "../models/user.model.js";
import {register , login , getAllUsers } from "../controllers/user.controller.js";
import {getUserBySerch , getCurrentChats} from "../controllers/userHandler.js";
import { ensureAuthenticated } from "../middleware/auth.js";

import { get } from "mongoose";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users" ,ensureAuthenticated, getAllUsers);
router.get("/home", ensureAuthenticated, (req, res) => res.send("hello"));
router.get("/search", ensureAuthenticated, getUserBySerch);
router.get("/getCurrentChats", ensureAuthenticated, getCurrentChats)



export default router