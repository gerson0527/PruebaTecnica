const express = require('express');
const { encounterSchema } = require('../schemas/encounter');
const encounterService = require('../services/encounterService');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error, value } = encounterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const encounter = await encounterService.createEncounter(value);
    res.status(201).json(encounter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const encounters = await encounterService.getEncounters();
    res.json(encounters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const encounter = await encounterService.getEncounterById(req.params.id);
    if (!encounter) return res.status(404).json({ error: 'No encontrado' });
    res.json(encounter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = encounterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const encounter = await encounterService.updateEncounter(req.params.id, value);
    res.json(encounter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await encounterService.deleteEncounter(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
