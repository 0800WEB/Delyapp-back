import joi from 'joi';

export const productSchema = joi.object({
  name: joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre no puede tener más de 50 caracteres.',
      'any.required': 'El nombre es obligatorio.'
    }),
  description: joi.string()
    .min(10)
    .max(500)
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto.',
      'string.empty': 'La descripción no puede estar vacía.',
      'string.min': 'La descripción debe tener al menos 10 caracteres.',
      'string.max': 'La descripción no puede tener más de 500 caracteres.',
      'any.required': 'La descripción es obligatoria.'
    }),
    price: joi.number()
    .positive()
    .precision(2)
    .min(1)
    .max(1000000)
    .required()
    .messages({
      'number.base': 'El precio debe ser un número.',
      'number.positive': 'El precio debe ser un número positivo.',
      'number.precision': 'El precio no puede tener más de {#limit} decimales.',
      'number.min': 'El precio debe ser al menos 1.00.',
      'number.max': 'El precio no puede ser mayor a 1,000,000.',
      'any.required': 'El precio es obligatorio.'
    }),
  category: joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'El ID de la categoría debe ser un ObjectId válido.',
      'any.required': 'La categoría es obligatoria.'
    }),
  stock: joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'number.base': 'El stock debe ser un número.',
      'number.integer': 'El stock debe ser un número entero.',
      'number.min': 'El stock no puede ser negativo.',
      'any.required': 'El stock es obligatorio.'
    }),
  images: joi.array()
    .items(joi.string().uri().messages({
      'string.uri': 'Cada imagen debe ser una URL válida.'
    }))
    .messages({
      'array.base': 'Las imágenes deben ser un arreglo de URLs válidas.'
    })
}).messages({
  'object.unknown': 'No se permite el envío de propiedades adicionales.'
});