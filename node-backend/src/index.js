
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
require('reflect-metadata');
const express = require('express');
const cors = require('cors');
const AppDataSource = require('../data-source');

const app = express();
const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    // Documentación Swagger en /docs
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use(cors());
    app.use(express.json());

    // Routers
    const authRouter = require('./routes/auth');
    app.use('/api/v1/auth', authRouter);
    const auditLogRouter = require('./routes/audit_log');
    app.use('/api/v1/audit-logs', auditLogRouter);
    const allergyRouter = require('./routes/allergy');
    app.use('/api/v1/allergies', allergyRouter);
    const diagnosisRouter = require('./routes/diagnosis');
    app.use('/api/v1/diagnoses', diagnosisRouter);
    const observationRouter = require('./routes/observation');
    app.use('/api/v1/observations', observationRouter);
    const encounterRouter = require('./routes/encounter');
    app.use('/api/v1/encounters', encounterRouter);
    const patientRouter = require('./routes/patient');
    app.use('/api/v1/patients', patientRouter);
    const userRouter = require('./routes/user');
    app.use('/api/v1/users', userRouter);

    // Ruta base
    app.get('/', (req, res) => {
      res.json({ message: 'API Node.js para Medical System' });
    });

    app.listen(PORT, () => {
      console.log(`Servidor Node.js escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la conexión a la base de datos:', err);
    process.exit(1);
  });
