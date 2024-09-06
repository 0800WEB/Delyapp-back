import Product from '../../models/Product.js';

const updateProduct = async (req, res) => {
    console.log(req.body)
    const { id } = req.params;
    const { name, description, price, category, stock, images } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, stock, images },
            { new: true }  // Esto devuelve el documento actualizado
        );

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default updateProduct;
