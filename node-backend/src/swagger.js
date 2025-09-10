const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Medical System API',
    version: '1.0.0',
    description: 'Documentación de la API para Medical System (Node.js)',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Puedes agregar aquí los paths a tus archivos de rutas para documentar automáticamente
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
