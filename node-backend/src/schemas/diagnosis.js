const Joi = require('joi');

const diagnosisSchema = Joi.object({
  encounterId: Joi.string().uuid().required(),
  cie10Code: Joi.string().required(),
  descripcion: Joi.string().required(),
  principal: Joi.boolean().default(false),
});

module.exports = {
  diagnosisSchema,
};
