// controllers/banners/create.js
import Banner from '../../models/Banner.js';

const create = async (req, res) => {
    try {
      console.log(req.body)
    const { name, image, description } = req.body;

    // Crear la nueva categoría
    const newBanner = new Banner({ name, image, description });
    await newBanner.save();

    res.status(201).json({
      success: true,
      message: 'Banner creado con éxito',
      banner: newBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el banner',
      error: error.message,
    });
  }
};

export default create;
