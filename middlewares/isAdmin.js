import User from '../models/User.js';

const isAdmin = async (req, res, next) => {
    console.log(req.user)
    try {
        const userAdmin = await User.findById(req.user._id);
        if (!userAdmin) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        if (userAdmin.role !== 1) {
            return res.status(403).json({
                success: false,
                message: "Error al verificar: No tienes acceso para ingresar"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export default isAdmin;
