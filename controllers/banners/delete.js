// controllers/banners/delete.js
import Banner from '../../models/Banner.js';

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar y eliminar el Banner
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: 'Banner no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Banner eliminado con éxito',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el banner',
      error: error.message,
    });
  }
};

export default deleteBanner;
