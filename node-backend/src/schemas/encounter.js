const Joi = require('joi');

const encounterSchema = Joi.object({
  patientId: Joi.string().uuid().required(),
  tipo: Joi.string().required(),
  fecha: Joi.date().required(),
  motivo: Joi.string().allow(null, ''),
});

module.exports = {
  encounterSchema,
};
