// controllers/orders/deleteOrders.js

import Order from '../../models/Order.js';

const deleteOrders = async (req, res) => {
  try {
    // Eliminamos todas las órdenes en la colección
    const result = await Order.deleteMany({});

    return res.status(200).json({
      success: true,
      message: 'All orders have been deleted successfully',
      deletedCount: result.deletedCount, // Número de órdenes eliminadas
    });
  } catch (error) {
    console.error('Error deleting all orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default deleteOrders;
