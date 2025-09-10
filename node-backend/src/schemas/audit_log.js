const Joi = require('joi');

const auditLogSchema = Joi.object({
  entity: Joi.string().required(),
  entityId: Joi.string().uuid().allow(null, ''),
  action: Joi.string().required(),
  userId: Joi.string().uuid().allow(null, ''),
  diffJson: Joi.object().allow(null),
  ipAddress: Joi.string().allow(null, ''),
});

module.exports = {
  auditLogSchema,
};
