// utils/couponUtils.js

import Coupon from '../models/Coupon.js';

export const handleCouponUsage = async (couponId, userId) => {
    try {
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
            throw new Error('Cupón no encontrado');
        }

        // Verificar si el usuario ya usó el cupón
        if (coupon.users.includes(userId)) {
            throw new Error('Este cupón ya ha sido utilizado por este usuario.');
        }

        // Reducir el límite de uso del cupón
        coupon.usageLimit -= 1;

        // Agregar el usuario al arreglo de usuarios que han usado el cupón
        coupon.users.push(userId);

        // Guardar los cambios en el cupón
        await coupon.save();

        return coupon;  // Devuelve el cupón actualizado
    } catch (error) {
        throw new Error(error.message);
    }
};
