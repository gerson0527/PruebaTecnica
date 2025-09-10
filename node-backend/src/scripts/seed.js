
const bcrypt = require('bcryptjs');
const path = require('path');
const AppDataSource = require(path.resolve(__dirname, '../../data-source.js'));

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository('User');
  const patientRepo = AppDataSource.getRepository('Patient');

  // Usuario admin
  const adminExists = await userRepo.findOne({ where: { username: 'admin' } });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await userRepo.save({
      username: 'admin',
      passwordHash,
      nombre: 'Administrador',
      email: 'admin@demo.com',
      role: 'admin',
      isActive: true,
    });
    console.log('Usuario admin creado');
  }

  // Paciente demo
  const patientExists = await patientRepo.findOne({ where: { nombre: 'Juan' } });
  if (!patientExists) {
    await patientRepo.save({
      nombre: 'Juan',
      apellido: 'Pérez',
      fechaNacimiento: '1990-01-01',
      sexo: 'M',
      direccion: 'Calle Falsa 123',
      telefono: '555-1234',
      email: 'juan@demo.com',
    });
    console.log('Paciente demo creado');
  }

  await AppDataSource.destroy();
}

seed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
