import bcryptjs from 'bcryptjs';
import User from '../../models/User.js'

let resetPassword = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id)
        const { newPassword } = req.body;
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        user.password = hashedPassword;
        console.log(user)
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password has been updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the password"
        });
    }
}

export default resetPassword;
