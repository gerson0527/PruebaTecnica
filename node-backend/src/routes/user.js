const express = require('express');
const { userRegisterSchema } = require('../schemas/user');
const userService = require('../services/userService');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { error, value } = userRegisterSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const user = await userService.createUser(value);
    res.status(201).json({ id: user.id, username: user.username, email: user.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener usuario por username (ejemplo)
router.get('/:username', async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
