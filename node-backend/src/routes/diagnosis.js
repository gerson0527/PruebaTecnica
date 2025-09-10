const express = require('express');
const { diagnosisSchema } = require('../schemas/diagnosis');
const diagnosisService = require('../services/diagnosisService');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error, value } = diagnosisSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const diagnosis = await diagnosisService.createDiagnosis(value);
    res.status(201).json(diagnosis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const diagnoses = await diagnosisService.getDiagnoses();
    res.json(diagnoses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const diagnosis = await diagnosisService.getDiagnosisById(req.params.id);
    if (!diagnosis) return res.status(404).json({ error: 'No encontrado' });
    res.json(diagnosis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = diagnosisSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const diagnosis = await diagnosisService.updateDiagnosis(req.params.id, value);
    res.json(diagnosis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await diagnosisService.deleteDiagnosis(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
