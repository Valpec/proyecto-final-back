import config from '../../config/config.js';
import {transporter} from '../../config/mailer.config.js'

class EmailService {
    constructor() {
        this.transporter = transporter
    }

    async sendEmail(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Mensaje enviado: %s', info.messageId);
            return info;
        } catch (error) {
            console.error(error);
            throw new Error('No se pudo enviar el email desde:' + config.gmailAccount);
        }
    }
}

export default EmailService;
