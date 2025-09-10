const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../entity/User');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';

async function login({ username, password }) {
  const userRepo = AppDataSource.getRepository('User');
  const user = await userRepo.findOne({ where: { username } });
  if (!user) throw new Error('Usuario o contraseña incorrectos');
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error('Usuario o contraseña incorrectos');
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
}

module.exports = {
  login,
};
