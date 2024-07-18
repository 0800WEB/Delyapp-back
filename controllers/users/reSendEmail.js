import User from "../../models/User.js"
import sendEmail from '../../utils/mailing.util.js';

let reSend = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email})
    try {
        if (user) {
            await sendEmail({to:user.email, first_name:user.name, code:user.verify_code })
            return res.status(200).json({success: true,message: "email reSend"})
        }
        return res.status(200).json({
            success: false,
            message: "user no exist"
        })
    } catch (error) {
        res.status(400).json({
            succes: false,
            message: "error"
        })
    }
}
export default reSend