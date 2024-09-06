import Product from '../../models/Product.js';

const createProduct = async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });

        await newProduct.save();
        return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
};

export default createProduct;
