// controllers/categories/create.js
import Category from '../../models/Category.js';

const create = async (req, res) => {
    try {
      console.log(req.body)
    const { name, image, description } = req.body;

    // Crear la nueva categoría
    const newCategory = new Category({ name, image, description });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: 'Categoría creada con éxito',
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la categoría',
      error: error.message,
    });
  }
};

export default create;
