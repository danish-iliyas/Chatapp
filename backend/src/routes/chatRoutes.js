
import express from "express";
import { sendMessage ,getMessages} from "../controllers/messageController.js";
import { ensureAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/sendmessage/:reciverId", ensureAuthenticated, sendMessage);
router.get("/getmessage/:reciverId", ensureAuthenticated, getMessages);

// router.get("/chat", ensureAuthenticated, fetchChats);
// router.post("/group", ensureAuthenticated, createGroupChat);
// router.put("/rename" , ensureAuthenticated , renameGroup) ;
// router.put("/groupadd" , ensureAuthenticated , addToGroup) ;
// router.put("/groupremove" , ensureAuthenticated , removeFromGroup); 



export default router