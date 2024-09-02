// controllers/categories/update.js
import Category from '../../models/Category.js';

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    // Buscar y actualizar la categoría
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, image, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Categoría actualizada con éxito',
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la categoría',
      error: error.message,
    });
  }
};

export default update;
