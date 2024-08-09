import Favorite from '../../models/Favorite.js';
import Product from '../../models/Product.js';

const removeFromFavorites = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user
    const { productId } = req.body;

    try {
        // Buscar la lista de favoritos del usuario
        let favorite = await Favorite.findOne({ user: userId });

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: 'Favorites list not found'
            });
        }

        // Verificar si el producto está en la lista de favoritos
        const productIndex = favorite.products.indexOf(productId);

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in favorites'
            });
        }

        // Eliminar el producto de la lista de favoritos
        favorite.products.splice(productIndex, 1);

        // Guardar la lista de favoritos
        await favorite.save();

        return res.status(200).json({
            success: true,
            message: 'Product removed from favorites',
            favorite
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while removing from favorites'
        });
    }
}

export default removeFromFavorites;
