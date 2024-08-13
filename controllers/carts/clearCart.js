import Cart from "../../models/Cart.js";

const clearCart = async (req, res) => {
    const userId = req.user?._id.toString(); 

    if (!userId) {
        return res.status(400).json({ success: false, message: 'Usuario no autorizado' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Carrito no encontrado' });
        }


        cart.products = [];
        cart.totalPrice = 0
        await cart.save();

        return res.status(200).json({ success: true, message: '¡El carrito ha sido limpiado con éxito!' });
    } catch (error) {
        console.error('Error al limpiar carrito:', error); 
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default clearCart;
