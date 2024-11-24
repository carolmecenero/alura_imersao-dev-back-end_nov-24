// Import libraries
import express from 'express';
import multer from 'multer';
import cors from 'cors';
// Import internal code
import { listAllPosts, listPostById, createNewPost, updateThisPost, updateThisPostWithAi } from '../controllers/postController.js';

// Configura o armazenamento do Multer para uploads de imagens no Windowns
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));

  // Acessar todos os "posts"
  app.get('/posts', listAllPosts);
  
  // Acessar um "post" específico
  app.get('/post/:id', listPostById);

  // Criar um novo "post"
  app.post('/post/create', upload.single("image_url"), createNewPost);

  app.put('/post/update/:id', upload.none(), updateThisPost);

  app.put('/post/update-with-ai/:id', upload.none(), updateThisPostWithAi);
};

export default routes;
