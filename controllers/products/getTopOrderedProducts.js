import Order from '../../models/Order.js';
import Product from '../../models/Product.js';

const getTopOrderedProducts = async (req, res) => {
  try {
    // Obtener todos los productos ordenados con su cantidad total vendida
    const topProducts = await Order.aggregate([
      // Descomponer las órdenes por producto
      { $unwind: '$products' },

      // Agrupar por productId y sumar las cantidades vendidas
      {
        $group: {
          _id: '$products.product', // Agrupa por el ID del producto
          totalSold: { $sum: '$products.quantity' }, // Suma la cantidad vendida
        },
      },

      // Filtrar solo los productos que aún existen y tienen stock
      {
        $lookup: {
          from: 'products', // Colección "products"
          localField: '_id', // Campo a relacionar desde la colección actual
          foreignField: '_id', // Campo de la colección "products" para relacionar
          as: 'productData', // Resultado almacenado en "productData"
        },
      },
      { $unwind: '$productData' }, // Descomponer el array de resultados

      // Filtrar por stock positivo
      { $match: { 'productData.stock': { $gt: 0 } } },

      // Ordenar por la cantidad total vendida de mayor a menor
      { $sort: { totalSold: -1 } },

      // Limitar a los top 10 productos
      { $limit: 10 },

      // Proyectar solo los campos necesarios
      {
        $project: {
          _id: 0,
          productId: '$_id',
          name: '$productData.name',
          description: '$productData.description',
          totalSold: 1,
          stock: '$productData.stock',
          price: '$productData.price',
          category: '$productData.category',
          images: '$productData.images',
        },
      },
    ]);

    // Verificar si hay productos en la lista
    if (topProducts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron productos más pedidos.',
      });
    }

    res.status(200).json({
      success: true,
      data: topProducts,
    });
  } catch (error) {
    console.error('Error obteniendo los productos más pedidos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos más pedidos.',
    });
  }
};

export default getTopOrderedProducts