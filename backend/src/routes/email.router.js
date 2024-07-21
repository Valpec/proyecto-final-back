import { Router } from "express";
import { sendEmailController, sendEmailWithAttachments, sendEmailPasswordReset } from '../controllers/email.controller.js';

const router = Router();

router.get("/", sendEmailController);
router.get("/attachments", sendEmailWithAttachments);
router.get("/resetPasswordRequest", (req, res) => {
    res.render('emailRequestResetPassword')
})
router.post("/resetPasswordRequest", sendEmailPasswordReset)



export default router;