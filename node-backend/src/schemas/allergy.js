const Joi = require('joi');

const allergySchema = Joi.object({
  patientId: Joi.string().uuid().required(),
  nombre: Joi.string().required(),
  descripcion: Joi.string().allow(null, ''),
  severidad: Joi.string().allow(null, ''),
});

module.exports = {
  allergySchema,
};
