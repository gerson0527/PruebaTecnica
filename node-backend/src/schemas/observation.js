const Joi = require('joi');

const observationSchema = Joi.object({
  encounterId: Joi.string().uuid().required(),
  categoria: Joi.string().required(),
  valor: Joi.string().required(),
  unidad: Joi.string().allow(null, ''),
  fecha: Joi.date().required(),
});

module.exports = {
  observationSchema,
};
