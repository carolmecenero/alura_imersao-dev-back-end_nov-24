import express from 'express';
import { listAllPosts, listPostById } from '../controller/postController.js';

const routes = (app) => {
  app.use(express.json());

  // Acessar todos os "posts"
  app.get('/posts', listAllPosts);
  
  // Acessar um "post" específico
  app.get('/post/:id', listPostById);
};

export default routes;
