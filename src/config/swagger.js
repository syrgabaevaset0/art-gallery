const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Art Gallery API',
      version: '1.0.0',
      description: 'API documentation for Art Gallery backend'
    },
    servers: [
      {
        url: 'https://art-gallery-c18j.onrender.com'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
}

const specs = swaggerJsdoc(options)

module.exports = { swaggerUi, specs }
