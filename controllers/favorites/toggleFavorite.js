import Favorite from '../../models/Favorite.js';
import Product from '../../models/Product.js';

const toggleFavorite = async (req, res, next) => {
    const userId = req.user._id; // Asumiendo que el ID del usuario está disponible en req.user
    const { productId } = req.body;

    try {
        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Buscar los favoritos del usuario
        let favorite = await Favorite.findOne({ user: userId });

        if (!favorite) {
            // Si no existe, crear una nueva lista de favoritos
            favorite = new Favorite({
                user: userId,
                products: [productId]
            });
        } else {
            // Verificar si el producto ya está en la lista de favoritos
            const productIndex = favorite.products.indexOf(productId);

            if (productIndex === -1) {
                // Si el producto no está en la lista, agregarlo
                favorite.products.push(productId);
                await favorite.save();

                return res.status(200).json({
                    success: true,
                    message: 'Product added to favorites',
                    favorite
                });
            } else {
                // Si el producto está en la lista, eliminarlo
                favorite.products.splice(productIndex, 1);
                await favorite.save();

                return res.status(200).json({
                    success: true,
                    message: 'Product removed from favorites',
                    favorite
                });
            }
        }

        // Guardar los favoritos
        await favorite.save();

        return res.status(200).json({
            success: true,
            message: 'Favorite list updated',
            favorite
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating favorites'
        });
    }
}

export default toggleFavorite;
