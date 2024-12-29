const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'A simple Express URL Shortener API',
    },
    servers: [
      {
        url: process.env.SWAGGER_BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        googleOAuth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
              tokenUrl: 'https://oauth2.googleapis.com/token',
              scopes: {
                'profile': 'Access your profile information',
                'email': 'Access your email address',
              },
            },
          },
        },
      },
    },
    security: [
      {
        googleOAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './swaggerDocs.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};