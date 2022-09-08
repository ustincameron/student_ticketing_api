import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Student Ticketing API',
    version: '0.0.1',
  },
  schemes: ['http', 'https'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: {
    bearerAuth: [],
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local Server',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['src/routes/**/*.route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export {
  swaggerSpec,
};
