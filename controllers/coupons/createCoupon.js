import Coupon from "../../models/Coupon.js";

const createCoupon = async (req, res) => {
    try {
        const { title,code, discountPercentage, discountAmount, expiryDate, usageLimit } = req.body;

   
        if (!code || !expiryDate) {
            return res.status(400).json({ success: false, message: 'Código y fecha de expiración son obligatorios.' });
        }

     
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ success: false, message: 'El código del cupón ya existe.' });
        }

       
        const newCoupon = new Coupon({
            title,
            code,
            discountPercentage: discountPercentage || 0,
            discountAmount: discountAmount || 0,
            expiryDate: new Date(expiryDate),
            usageLimit: usageLimit || 1
        });

        
        await newCoupon.save();

        return res.status(201).json({
            success: true,
            message: 'Cupón creado con éxito.',
            coupon: newCoupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Hubo un error al crear el cupón, prueba más tarde', error: error.message });
    }
};

export default createCoupon;
