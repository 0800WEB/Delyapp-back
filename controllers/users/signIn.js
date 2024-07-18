import User from '../../models/User.js';
import jwt from 'jsonwebtoken';


let signin = async (req, res, next) => {
    try {
        let user = await User.findOneAndUpdate(
            { email: req.body.email },
            { is_online: true },
            { new: true }
        )
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: 60 * 60 * 24 * 10 }
        )
        return res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        next(error);
    }
}

export default signin;