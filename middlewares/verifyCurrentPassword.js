import bcryptjs from 'bcryptjs';

const verifyCurrentPassword = async (req, res, next) => {
    try {
        let { user } = req
        let { oldPassword } = req.body
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = bcryptjs.compareSync(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while verifying the current password"
        });
    }
};

export default verifyCurrentPassword;
