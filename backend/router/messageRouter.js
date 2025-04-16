import express from 'express';
import { getAllMessage, sendMessage } from '../controller/message.controller.js';
import {isAdminAuthenticated} from '../middlewares/auth.js'
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall",isAdminAuthenticated,getAllMessage)
export default router;