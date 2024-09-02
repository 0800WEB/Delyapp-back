import User from '../../models/User.js'

const adminConvert = async(req,res) => {
    try {
        let user = await User.findById(req.params.id)
        if(user){
            if(user.role === 0){
                user.role = 1
            }else{
                user.role = 0
            }
            await user.save()
            return res.status(201).json({
                success: true,
                message: '¡Usuario actualizado con éxito!',
                user
            });    
        }
        return res.status(400).json({ success: false, message: 'Ocurrió un error con la lectura del usuario' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
}
export default adminConvert