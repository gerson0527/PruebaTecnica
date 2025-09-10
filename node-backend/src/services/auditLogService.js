const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));


async function createAuditLog(data) {
  const repo = AppDataSource.getRepository('AuditLog');
  const log = repo.create(data);
  await repo.save(log);
  return log;
}


async function getAuditLogs() {
  const repo = AppDataSource.getRepository('AuditLog');
  return repo.find();
}


async function getAuditLogById(id) {
  const repo = AppDataSource.getRepository('AuditLog');
  return repo.findOne({ where: { id } });
}

module.exports = {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
};
