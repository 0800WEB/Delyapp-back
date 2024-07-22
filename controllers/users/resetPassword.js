import bcryptjs from 'bcryptjs';

let resetPassword = async (req, res, next) => {
    const { newPassword, oldPassword } = req.body;
    const user = req.user;

    try {
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        user.password = hashedPassword;
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
