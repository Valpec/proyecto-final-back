import config from '../config/config.js';
import __dirname, { generateJWToken } from '../utils.js';
import { v4 } from 'uuid';
import EmailService from '../services/dao/email.service.js';
import userModel from '../services/dao/db/models/user.js';

const emailService = new EmailService()



export const sendEmailController = async (req, res) => {
    try {
        const mailOptions = {
            from: "E-commerce Cattalina Test - " + config.gmailAccount,
            to: config.gmailAccount,
            subject: 'Correo enviado desde el e-commerce de Cata deco-home',
            html: `<div><h3> Esto es un test de envio del e-commerce </h3></div>`,
            attachments: []
        }
        const info = await emailService.sendEmail(mailOptions);
        res.send({ message: 'Success', payload: info });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}


export const sendEmailWithAttachments = async (req, res) => {
    try {
        const mailOptionsWithAttachments = {
            from: "Coder Test - " + config.gmailAccount,
            to: config.gmailAccount,
            subject: 'Correo de prueba desde el e-commerce de Cattalina deco-home',
            html: ` <div>
                        <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                        <p>Enviando imagenes: </p>
                      
                    </div>`,
            attachments: [
                {
                    filename: "Logo test",
                    path: __dirname + '/public/images/logo_gris.png',
                    cid: 'logo cattalina'
                }
            ]
        }
        const info = await emailService.sendEmail(mailOptionsWithAttachments);
        res.send({ message: "Success", payload: info });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}




export const sendEmailPasswordReset = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(404).send('Email not provided');
        }
        const token = v4();
        console.log(Date.now());
        console.log(token)
        const resetUrl = `http://localhost:8080/api/users/resetPassword/${token}`

        const passwordReset = {
            from: "E-commerce Cattalina Test - " + config.gmailAccount,
            to: email,
            subject: 'Restablecer contrasena Cattalina Deco-home',
            html: `<div><h3> El siguiente link lo redirigira para cambiar su contrasena. Tenga en cuenta que tiene validez de una hora.  </h3>
            <a href="${resetUrl}"><button>Reestablecer contrasena</button></a>
            </div>`
        }

        const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
        await user.updateOne({ resetPasswordLink: {
            token: token , 
            expirationTime: new Date(Date.now() + 1 * 60 * 1000)
        } });
        
        const info = await emailService.sendEmail(passwordReset);
        res.send({ message: 'Success', payload: info });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}


