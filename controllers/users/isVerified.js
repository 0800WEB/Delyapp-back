import User from "../../models/User.js";
let userIsVerified = async (req, res, next) => {
    try {

        let { email } = req.body

        let userVerified = await User.findOneAndUpdate(
            { verify_code: req.params.verify_code, email },
            { is_verified: true },
            { new: true }
        )
        
        if (userVerified) {
            return res
            .status(200)
            .json({
                success: true,
                userVerified
            });
        }
        return res
        .status(400)
        .json({
            success: false,
            message: "Error validating code"
        });
    } catch (error) {
        next(error);
    }
};

export default userIsVerified;