import Favorite from '../../models/Favorite.js';

const getFavorites = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user

    try {
        // Buscar la lista de favoritos del usuario
        const favorite = await Favorite.findOne({ user: userId }).populate('products');

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: 'Favorites list not found'
            });
        }

        return res.status(200).json({
            success: true,
            favorite
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving the favorites list'
        });
    }
}

export default getFavorites;
