import Joi from 'joi';

export const couponSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.base': 'El título debe ser un texto.',
      'string.empty': 'El título no puede estar vacío.',
      'string.min': 'El título debe tener al menos 1 carácter.',
      'string.max': 'El título no puede tener más de 100 caracteres.',
      'any.required': 'El título es obligatorio.'
    }),
  code: Joi.string()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.base': 'El código debe ser un texto.',
      'string.empty': 'El código no puede estar vacío.',
      'string.min': 'El código debe tener al menos 1 carácter.',
      'string.max': 'El código no puede tener más de 50 caracteres.',
      'any.required': 'El código es obligatorio.'
    }),
  discountPercentage: Joi.number()
    .min(0)
    .max(100)
    .default(0)
    .messages({
      'number.base': 'El porcentaje de descuento debe ser un número.',
      'number.min': 'El porcentaje de descuento no puede ser negativo.',
      'number.max': 'El porcentaje de descuento no puede ser mayor a 100.',
      'number.default': 'El porcentaje de descuento por defecto es 0.'
    }),
  discountAmount: Joi.number()
    .min(0)
    .default(0)
    .messages({
      'number.base': 'El monto de descuento debe ser un número.',
      'number.min': 'El monto de descuento no puede ser negativo.',
      'number.default': 'El monto de descuento por defecto es 0.'
    }),
  expiryDate: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de expiración debe ser una fecha válida.',
      'date.iso': 'La fecha de expiración debe estar en formato ISO 8601.',
      'any.required': 'La fecha de expiración es obligatoria.'
    }),
  usageLimit: Joi.number()
    .integer()
    .min(1)  // Evitar valores negativos o cero
    .default(1)
    .messages({
      'number.base': 'El límite de uso debe ser un número.',
      'number.integer': 'El límite de uso debe ser un número entero.',
      'number.min': 'El límite de uso debe ser al menos 1.',
      'number.default': 'El límite de uso por defecto es 1.'
    })
})
