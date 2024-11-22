import { getAllPosts, getPostById } from "../models/postModels.js";

// Consultar possíveis status: https://http.cat

export async function listAllPosts(rec, res) {
  const allPosts = await getAllPosts();
  res.status(200).json(allPosts);
}

export async function listPostById(rec, res) {
  const post = await getPostById(rec.params.id);
  res.status(200).json(post);  
}
