const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class InitSchema1694294400000 {
  name = 'InitSchema1694294400000'

  async up(queryRunner) {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      role VARCHAR(50) DEFAULT 'user',
      is_active BOOLEAN DEFAULT true,
      professional_license VARCHAR(255),
      specialty VARCHAR(255),
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS patients (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      nombre VARCHAR(255) NOT NULL,
      apellido VARCHAR(255) NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      sexo VARCHAR(10) NOT NULL,
      direccion VARCHAR(255),
      telefono VARCHAR(50),
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS encounters (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
      tipo VARCHAR(100) NOT NULL,
      fecha TIMESTAMP NOT NULL,
      motivo VARCHAR(255),
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS observations (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      encounter_id uuid NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
      categoria VARCHAR(100) NOT NULL,
      valor VARCHAR(255) NOT NULL,
      unidad VARCHAR(50),
      fecha TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS diagnoses (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      encounter_id uuid NOT NULL REFERENCES encounters(id) ON DELETE CASCADE,
      cie10_code VARCHAR(10) NOT NULL,
      descripcion VARCHAR(255) NOT NULL,
      principal BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS allergies (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
      nombre VARCHAR(255) NOT NULL,
      descripcion VARCHAR(255),
      severidad VARCHAR(50),
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
    )`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS audit_logs (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      entity VARCHAR(100) NOT NULL,
      entity_id uuid,
      action VARCHAR(50) NOT NULL,
      user_id uuid REFERENCES users(id) ON DELETE SET NULL,
      diff_json JSON,
      ip_address VARCHAR(45),
      created_at TIMESTAMP DEFAULT now()
    )`);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE IF EXISTS audit_logs`);
    await queryRunner.query(`DROP TABLE IF EXISTS allergies`);
    await queryRunner.query(`DROP TABLE IF EXISTS diagnoses`);
    await queryRunner.query(`DROP TABLE IF EXISTS observations`);
    await queryRunner.query(`DROP TABLE IF EXISTS encounters`);
    await queryRunner.query(`DROP TABLE IF EXISTS patients`);
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
};
