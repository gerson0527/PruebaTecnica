const express = require('express');
const { loginSchema } = require('../schemas/auth');
const authService = require('../services/authService');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const result = await authService.login(value);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
