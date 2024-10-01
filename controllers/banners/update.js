// controllers/banners/update.js
import Banner from '../../models/Banner.js';

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description } = req.body;

    // Buscar y actualizar la categoría
    const updatedBanner = await Banner.findByIdAndUpdate(
      id,
      { name, image, description },
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: 'Banner no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Banner actualizado con éxito',
      banner: updatedBanner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el banner',
      error: error.message,
    });
  }
};

export default update;
