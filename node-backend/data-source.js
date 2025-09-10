const { DataSource } = require('typeorm');

module.exports = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'medical_user',
  password: process.env.DB_PASSWORD || 'medical_password',
  database: process.env.DB_NAME || 'medical_system',
  synchronize: false,
  logging: false,
  entities: [
    __dirname + '/src/entity/*.js'
  ],
  migrations: [
    __dirname + '/src/migration/*.js'
  ],
});
