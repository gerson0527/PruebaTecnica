// Esquema de validación para usuario (usando Joi)
const Joi = require('joi');

const userRegisterSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('user', 'admin', 'doctor').default('user'),
  professionalLicense: Joi.string().allow(null, ''),
  specialty: Joi.string().allow(null, ''),
});

module.exports = {
  userRegisterSchema,
};
