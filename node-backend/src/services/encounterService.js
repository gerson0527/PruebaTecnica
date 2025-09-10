const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createEncounter(data) {
  const repo = AppDataSource.getRepository('Encounter');
  const encounter = repo.create(data);
  await repo.save(encounter);
  return encounter;
}


async function getEncounters() {
  const repo = AppDataSource.getRepository('Encounter');
  return repo.find();
}


async function getEncounterById(id) {
  const repo = AppDataSource.getRepository('Encounter');
  return repo.findOne({ where: { id } });
}


async function updateEncounter(id, data) {
  const repo = AppDataSource.getRepository('Encounter');
  await repo.update(id, data);
  return getEncounterById(id);
}


async function deleteEncounter(id) {
  const repo = AppDataSource.getRepository('Encounter');
  return repo.delete(id);
}

module.exports = {
  createEncounter,
  getEncounters,
  getEncounterById,
  updateEncounter,
  deleteEncounter,
};
