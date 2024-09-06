import Cart from '../models/Cart.js';

export const clearCart = async (userId) => {
    try {
        // Encontrar el carrito del usuario
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        // Vaciar el carrito
        cart.products = [];
        cart.totalPrice = 0;

        // Guardar los cambios
        await cart.save();

        return true; // Indicar que el carrito se limpió correctamente
    } catch (error) {
        console.error('Error al limpiar el carrito:', error);
        throw new Error('Ocurrió un error al limpiar el carrito');
    }
};
