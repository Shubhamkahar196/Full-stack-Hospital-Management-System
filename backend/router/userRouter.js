import express from 'express';
import { login, patienRegister } from '../controller/user.controller.js';

const router = express.Router();

router.post("/patient/register",patienRegister)
router.post("/login",login)

export default router;