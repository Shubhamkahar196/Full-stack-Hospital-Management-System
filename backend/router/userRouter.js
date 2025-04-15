import express from 'express';
import { addNewAdmin, login, patienRegister } from '../controller/user.controller.js';
import {isAdminAuthenticated, isPatientAuthenticated} from '../middlewares/auth.js'



const router = express.Router();

router.post("/patient/register",patienRegister)
router.post("/login",login)
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin)


export default router;