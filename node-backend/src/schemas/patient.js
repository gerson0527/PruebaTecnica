const Joi = require('joi');

const patientSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  fechaNacimiento: Joi.date().required(),
  sexo: Joi.string().valid('M', 'F', 'O').required(),
  direccion: Joi.string().allow(null, ''),
  telefono: Joi.string().allow(null, ''),
  email: Joi.string().email().allow(null, ''),
});

module.exports = {
  patientSchema,
};
