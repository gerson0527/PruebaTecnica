const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createAllergy(data) {
  const repo = AppDataSource.getRepository('Allergy');
  const allergy = repo.create(data);
  await repo.save(allergy);
  return allergy;
}


async function getAllergies() {
  const repo = AppDataSource.getRepository('Allergy');
  return repo.find();
}


async function getAllergyById(id) {
  const repo = AppDataSource.getRepository('Allergy');
  return repo.findOne({ where: { id } });
}


async function updateAllergy(id, data) {
  const repo = AppDataSource.getRepository('Allergy');
  await repo.update(id, data);
  return getAllergyById(id);
}


async function deleteAllergy(id) {
  const repo = AppDataSource.getRepository('Allergy');
  return repo.delete(id);
}

module.exports = {
  createAllergy,
  getAllergies,
  getAllergyById,
  updateAllergy,
  deleteAllergy,
};
