import crypto from 'crypto';
import User from '../../models/User.js';
import sendEmail from '../../utils/mailing.util.js';

let forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generar un token de restablecimiento de contraseña
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
        const resetPasswordExpire = Date.now() + 3600000; // Token válido por 1 hora

        // Guardar el token y la expiración en el usuario
        user.resetPasswordDigit = generateFourDigitCode();
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        // Enviar un correo electrónico con el token
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${user.resetPasswordDigit}`;
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            template: `You requested a password reset. Please go to ${resetUrl}`
        });

        return res.status(200).json({
            success: true,
            message: 'Password reset token sent to email'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
}

export default forgotPassword;
