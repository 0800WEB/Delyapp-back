import User from '../../models/User.js';

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        }
        return res.status(400).json({
            success: false,
            message: "Ocurrió un error al eliminar el usuario"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

const deleteUsers = async (req, res) => {
    try {
        // Suponiendo que el ID del usuario admin está en req.user.id
        const adminId = req.user.id;

        // Elimina todos los usuarios excepto el admin
        await User.deleteMany({
            _id: { $ne: adminId }
        });

        return res.status(200).json({
            success: true,
            message: 'Todos los usuarios excepto el administrador se eliminaron correctamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};
export { deleteUser, deleteUsers };
 
