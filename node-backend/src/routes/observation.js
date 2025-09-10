const express = require('express');
const { observationSchema } = require('../schemas/observation');
const observationService = require('../services/observationService');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error, value } = observationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const observation = await observationService.createObservation(value);
    res.status(201).json(observation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const observations = await observationService.getObservations();
    res.json(observations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const observation = await observationService.getObservationById(req.params.id);
    if (!observation) return res.status(404).json({ error: 'No encontrado' });
    res.json(observation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = observationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const observation = await observationService.updateObservation(req.params.id, value);
    res.json(observation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await observationService.deleteObservation(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
