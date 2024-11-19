import express from 'express';

const app = express();
// Usualmente se é usado a porta 3000 para servidores locais
app.listen(3000, () => {
  console.log('Servidor iniciado, pode começar a brincadeira... hehehe');
});

// Criando uma rota | http://localhost:3000/api
app.get('/api', (rec, res) => {
  res.status(200).send('Solicitação bem sucedida :)');
});
