
const bcrypt = require('bcryptjs');
const User = require('../entity/User');
const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createUser(data) {
  const userRepo = AppDataSource.getRepository('User');
  const exists = await userRepo.findOne({ where: { username: data.username } });
  if (exists) throw new Error('Usuario ya existe');
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = userRepo.create({
    ...data,
    passwordHash,
  });
  await userRepo.save(user);
  return user;
}


async function getUserByUsername(username) {
  const userRepo = AppDataSource.getRepository('User');
  return userRepo.findOne({ where: { username } });
}

module.exports = {
  createUser,
  getUserByUsername,
};
