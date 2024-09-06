import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import User from '../../models/User.js';
import sendEmail from '../../utils/mailing.util.js';
import { templateVerification } from '../../utils/signup.template.js';
function generateFourDigitCode() {
    let code;
    do {
        // Genera 2 bytes de datos aleatorios
        const randomBytes = crypto.randomBytes(2);
        // Convierte los bytes en un número entero sin signo de 16 bits
        code = randomBytes.readUInt16BE(0);
    } while (code < 1000 || code > 9999);
    return code;
}

let signUp = async (req, res, next) => {
    req.body.is_online = false;
    req.body.role = 0;
    req.body.is_verified = false;
    req.body.verify_code = generateFourDigitCode()
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    try {
        await User.create(req.body);
        await sendEmail({to:req.body.email, subject:`Verifica tu cuenta en Dringo 🥳`, template:templateVerification(req.body.verify_code)})
        return res.status(201).json({
            success: true,
            message: "The user was created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "There was an error creating the user"
        });
    }
}

export default signUp;
