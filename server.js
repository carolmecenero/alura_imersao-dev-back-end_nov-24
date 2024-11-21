import express from 'express';

const posts = Array(9).fill().map((_, index) => ({
  id: index + 1,
  descricao: `descrição ${index + 1}`,
  imagem: 'https://placecats.com/louie/300/200'
}));

const app = express();

app.use(express.json());

// Usualmente se é usado a porta 3000 para servidores locais
app.listen(3000, () => {
  console.log('Servidor iniciado, pode começar a brincadeira... hehehe');
});

// Criando uma rota | http://localhost:3000/api
// Consultar possíveis status: https://http.cat
app.get('/api', (rec, res) => {
  res.status(200).send('Solicitação bem sucedida :)');
});

// Acessar todos os "posts"
app.get('/posts', (rec, res) => {
  res.status(200).json(posts);
});

// Acessar um "post" específico
app.get('/post/:id', (rec, res) => {
  const index = buscarPostPorId(rec.params.id);
  res.status(200).json(posts[index]);
});

// Funções
function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}
