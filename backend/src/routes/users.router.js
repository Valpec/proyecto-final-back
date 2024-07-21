import { Router } from "express";
import { authorization, passportCall } from "../utils.js";
import { putPremiumUserController , resetPassword, postDocumentController, getUsers, deleteUsers} from '../controllers/users.controller.js';
const router = Router();

import { uploader } from "../utils.js";


router.put('/premium/:uid' ,putPremiumUserController)

router.get('/resetPassword/:token', (req, res) => {
    const {token} = req.params
    res.render('resetPassword', {token} )
})
router.post('/resetPassword/:token', resetPassword)

router.post('/:uid/documents',passportCall('jwt'), uploader.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'productPhotos', maxCount: 10 },
    // { name: 'documents', maxCount: 3 }
    { name: 'documents_identificacion', maxCount: 1 },
    { name: 'documents_comprobante_domicilio', maxCount: 1 },
    { name: 'documents_comprobante_cuenta', maxCount: 1 }
]) , postDocumentController)

router.get('/', passportCall('jwt'),authorization('admin'), getUsers)
router.delete('/', passportCall('jwt'),authorization('admin'), deleteUsers)



export default router;
