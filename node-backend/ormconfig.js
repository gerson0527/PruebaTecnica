module.exports = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'medical_user',
  password: 'medical_password',
  database: 'medical_system',
  synchronize: true, // Solo para desarrollo
  logging: false,
  entities: [
    'src/entity/**/*.js'
  ],
  migrations: [
    'src/migration/**/*.js'
  ],
  subscribers: [
    'src/subscriber/**/*.js'
  ]
};
