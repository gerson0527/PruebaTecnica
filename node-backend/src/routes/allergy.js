const express = require('express');
const { allergySchema } = require('../schemas/allergy');
const allergyService = require('../services/allergyService');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error, value } = allergySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const allergy = await allergyService.createAllergy(value);
    res.status(201).json(allergy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allergies = await allergyService.getAllergies();
    res.json(allergies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const allergy = await allergyService.getAllergyById(req.params.id);
    if (!allergy) return res.status(404).json({ error: 'No encontrado' });
    res.json(allergy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { error, value } = allergySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const allergy = await allergyService.updateAllergy(req.params.id, value);
    res.json(allergy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await allergyService.deleteAllergy(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
