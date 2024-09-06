// utils/productUtils.js

import Product from '../models/Product.js';

export const validateCartProducts = async (cartProducts) => {
    const validatedProducts = [];
    let totalPrice = 0;

    for (const item of cartProducts) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new Error(`Producto con ID ${item.product} no encontrado`);
        }
        if (product.stock < item.quantity) {
            throw new Error(`Stock insuficiente para el producto ${product.name}`);
        }

        validatedProducts.push({
            product: item.product,
            quantity: item.quantity,
        });

        totalPrice += product.price * item.quantity;
    }

    return { validatedProducts, totalPrice };
};
