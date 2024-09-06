import User from '../../models/User.js';

const updateUser = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user
    const { name, email, phone } = req.body;
    try {
 
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: '¡Usuario no encontrado!'
            });
        }

        // Actualizar los campos permitidos
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        // Guardar los cambios
        await user.save();
        
        return res.status(200).json({
            success: true,
            message: '¡Usuario actualizado con éxito!',
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al actualizar el usuario'
        });
    }
}

export default updateUser;
