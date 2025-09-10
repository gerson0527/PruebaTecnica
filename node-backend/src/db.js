// src/db.js
const AppDataSource = require('../data-source');

let initialized = false;

async function getDataSource() {
  if (!initialized) {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    initialized = true;
  }
  return AppDataSource;
}

module.exports = { getDataSource };
