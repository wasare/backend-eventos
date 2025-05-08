const express = require('express');
const eventosRouter = require('./routes/eventosRouter');

const app = express();

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Routes
app.use('/', eventosRouter);

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
