import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre debe ser un texto válido.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre no puede tener más de 50 caracteres.',
      'any.required': 'El nombre es obligatorio.'
    }),
  description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto válido.',
      'string.empty': 'La descripción no puede estar vacía.',
      'string.min': 'La descripción debe tener al menos 10 caracteres.',
      'string.max': 'La descripción no puede tener más de 500 caracteres.',
      'any.required': 'La descripción es obligatoria.'
    }),
  price: Joi.number()
    .positive()
    .precision(2)
    .min(1)
    .max(1000000)
    .required()
    .messages({
      'number.base': 'El precio debe ser un número válido.',
      'number.positive': 'El precio debe ser un número positivo.',
      'number.precision': 'El precio no puede tener más de 2 decimales.',
      'number.min': 'El precio debe ser al menos 1.00.',
      'number.max': 'El precio no puede exceder de 1,000,000.',
      'any.required': 'El precio es obligatorio.'
    }),
  category: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Debe seleccionar una categoría válida.',
      'any.required': 'La categoría es obligatoria.',
      'string.empty': 'La categoría no puede estar vacía.',
    }),
  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'El stock debe ser un número válido.',
      'number.integer': 'El stock debe ser un número entero.',
      'number.min': 'El stock no puede ser negativo.',
      'any.required': 'El stock es obligatorio.'
    }),
  images: Joi.array()
    .items(
      Joi.string().uri().messages({
        'string.uri': 'Cada imagen debe ser una URL válida.',
        'string.empty': 'La URL de la imagen no puede estar vacía.',
        'any.required': 'La URL de la imagen es obligatoria.',
      })
    )
    .min(1).message({'any.required':"minimo 1"})
    .required()
    .messages({
      'array.base': 'Las imágenes deben ser un arreglo de URLs válidas.',
      'array.min': 'Debe proporcionar al menos una imagen válida.',
      'any.required': 'Las imágenes son obligatorias.',
    })
}).messages({
  'object.unknown': 'No se permite el envío de propiedades adicionales.'
});
