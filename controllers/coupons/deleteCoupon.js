import Coupon from "../../models/Coupon.js";

const deleteCoupon = async(req, res) => {
    const {id} = req.params
    try {
        const coupon = await Coupon.findByIdAndDelete(id);
        if (!coupon) {
            return res.status(404).json({ success: false, message: 'Cupon no encontrado' });
        }

        return res.status(200).json({ success: true, message: 'Cupon eliminado exitósamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
    }
}

export default deleteCoupon