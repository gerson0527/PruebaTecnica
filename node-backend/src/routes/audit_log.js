const express = require('express');
const { auditLogSchema } = require('../schemas/audit_log');
const auditLogService = require('../services/auditLogService');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error, value } = auditLogSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const log = await auditLogService.createAuditLog(value);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const logs = await auditLogService.getAuditLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const log = await auditLogService.getAuditLogById(req.params.id);
    if (!log) return res.status(404).json({ error: 'No encontrado' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
