const express = require('express');
const router = require('./routes');
// const setupSwagger = require('./swagger'); // Importe a função de configuração do Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Importe o arquivo JSON com a especificação do Swagger


const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// setupSwagger(app); // Passe a instância do app para a função setupSwagger

module.exports = app;