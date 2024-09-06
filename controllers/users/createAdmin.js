import User from '../../models/User.js'

const createAdmin = async (req,res,next) =>{
    const userId = req.user._id; 
    try {
        let user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: '¡Usuario no encontrado!'
            });
        }
        user.role = 1
        await user.save();

        return res.status(200).json({
            success: true,
            message: '¡El usuario ha sido actualizado a Administrador con éxito!',
            user
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al crear el administrador'
        });
    }



}

export default createAdmin