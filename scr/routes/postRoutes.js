// Import libraries
import express from 'express';
import multer from 'multer';
// Import internal code
import { createNewPost, listAllPosts, listPostById } from '../controller/postController.js';

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

const routes = (app) => {
  app.use(express.json());

  // Acessar todos os "posts"
  app.get('/posts', listAllPosts);
  
  // Acessar um "post" específico
  app.get('/post/:id', listPostById);

  // Criar um novo "post"
  app.post('/post/create', upload.single("image_url"), createNewPost);
};

export default routes;
