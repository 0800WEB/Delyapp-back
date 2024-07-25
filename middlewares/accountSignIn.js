import User from '../models/User.js'

async function accountExistsSignIn(req, res, next){
    const user = await User.findOne({email: req.body.email})
    if(user){
        req.user = {
            _id: user._id,
            email: user.email,
            password: user.password,
            role: user.role,
            is_verified: user.is_verified
        }
        return next()
    }
    return res.status(400).json({
        success: false,
        message: [
            {
                path: "credentials",
                message: "wrong credentials"
            }
        ]
    });
}

export default accountExistsSignIn