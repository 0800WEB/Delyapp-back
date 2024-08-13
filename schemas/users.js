import joi from 'joi';

export const userSignUp = joi.object({
    name: joi.string().min(4).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().min(8).max(25).required(),
    phone: joi.string().pattern(/^[0-9]{10,15}$/).required(), // Ejemplo: entre 10 y 15 dígitos
    role: joi.number().integer().min(0).max(1).optional().default(0),
    is_online: joi.boolean().optional().default(false),
    ageVerified: joi.boolean().optional().default(false),
    is_verified: joi.boolean().optional().default(false),
    verify_code: joi.number().integer().required() // Ejemplo: código de 6 dígitos
});


export const userSignIn = joi.object({
    email: joi.string().email({minDomainSegments: 2}).required(),
    password: joi.string().min(8).max(25).required()
})