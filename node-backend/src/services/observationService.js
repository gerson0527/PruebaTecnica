const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createObservation(data) {
  const repo = AppDataSource.getRepository('Observation');
  const observation = repo.create(data);
  await repo.save(observation);
  return observation;
}


async function getObservations() {
  const repo = AppDataSource.getRepository('Observation');
  return repo.find();
}


async function getObservationById(id) {
  const repo = AppDataSource.getRepository('Observation');
  return repo.findOne({ where: { id } });
}


async function updateObservation(id, data) {
  const repo = AppDataSource.getRepository('Observation');
  await repo.update(id, data);
  return getObservationById(id);
}


async function deleteObservation(id) {
  const repo = AppDataSource.getRepository('Observation');
  return repo.delete(id);
}

module.exports = {
  createObservation,
  getObservations,
  getObservationById,
  updateObservation,
  deleteObservation,
};
