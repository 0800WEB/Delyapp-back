// controllers/orders/deleteOrder.js

import Order from '../../models/Order.js';

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
console.log(orderId)
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    await order.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default deleteOrder;
