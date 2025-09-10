const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createPatient(data) {
  const repo = AppDataSource.getRepository('Patient');
  const patient = repo.create(data);
  await repo.save(patient);
  return patient;
}


async function getPatients() {
  const repo = AppDataSource.getRepository('Patient');
  return repo.find();
}


async function getPatientById(id) {
  const repo = AppDataSource.getRepository('Patient');
  return repo.findOne({ where: { id } });
}


async function updatePatient(id, data) {
  const repo = AppDataSource.getRepository('Patient');
  await repo.update(id, data);
  return getPatientById(id);
}


async function deletePatient(id) {
  const repo = AppDataSource.getRepository('Patient');
  return repo.delete(id);
}

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
