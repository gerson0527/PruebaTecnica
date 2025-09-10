const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createDiagnosis(data) {
  const repo = AppDataSource.getRepository('Diagnosis');
  const diagnosis = repo.create(data);
  await repo.save(diagnosis);
  return diagnosis;
}


async function getDiagnoses() {
  const repo = AppDataSource.getRepository('Diagnosis');
  return repo.find();
}


async function getDiagnosisById(id) {
  const repo = AppDataSource.getRepository('Diagnosis');
  return repo.findOne({ where: { id } });
}


async function updateDiagnosis(id, data) {
  const repo = AppDataSource.getRepository('Diagnosis');
  await repo.update(id, data);
  return getDiagnosisById(id);
}


async function deleteDiagnosis(id) {
  const repo = AppDataSource.getRepository('Diagnosis');
  return repo.delete(id);
}

module.exports = {
  createDiagnosis,
  getDiagnoses,
  getDiagnosisById,
  updateDiagnosis,
  deleteDiagnosis,
};
