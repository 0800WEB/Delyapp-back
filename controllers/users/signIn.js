import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 


let signin = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email });


        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }


        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }


        user.is_online = true;
        await user.save();


        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: '10d' } 
        );


        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                phone:user.phone,
                name:user.name
            }
        });
    } catch (error) {
        console.error(error);
        next(error); 
    }
}

export default signin;
