import express from 'express';
import { addNewAdmin, getAllDoctors, getUserDetails, login, logoutAdmin, patienRegister ,logoutPatient, addNewDoctor } from '../controller/user.controller.js';
import {isAdminAuthenticated, isPatientAuthenticated} from '../middlewares/auth.js'



const router = express.Router();

router.post("/patient/register",patienRegister)
router.post("/login",login)
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin)
router.get("/doctors",getAllDoctors)
router.get("/admin/me",isAdminAuthenticated,getUserDetails)
router.get("/patient/me",isPatientAuthenticated,getUserDetails)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logoutPatient)
router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor)


export default router;