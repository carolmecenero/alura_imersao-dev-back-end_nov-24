import express from 'express';
import routes from './scr/routes/postRoutes.js';

const app = express();
app.use(express.static('uploads'));
routes(app);

// Usualmente se é usado a porta 3000 para servidores locais
app.listen(3000, () => {
  console.log('Servidor iniciado, pode começar a brincadeira... hehehe');
});
