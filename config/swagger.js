import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hunter x Hunter API',
      version: '1.0.0',
      description: 'API de ejemplo para cazadores del universo Hunter x Hunter',
    },
    servers: [
      {
        url: `${process.env.HOST}/api`,
        description: 'Servidor local',
      },
    ],
  },
  // Archivos donde Swagger buscará anotaciones (rutas)
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📘 Swagger disponible en: ${process.env.HOST}/api-docs`);
};

export default swaggerDocs;
