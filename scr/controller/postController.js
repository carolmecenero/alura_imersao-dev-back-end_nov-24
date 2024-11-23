import fs from 'fs';
import { getAllPosts, getPostById, createPost } from "../models/postModels.js";

// Consultar possíveis status: https://http.cat

export async function listAllPosts(request, result) {
  const allPosts = await getAllPosts();
  result.status(200).json(allPosts);
};

export async function listPostById(request, result) {
  const post = await getPostById(request.params.id);
  result.status(200).json(post);  
};

export async function createNewPost(request, result) {
  const textFields = request.body;
  const newPost = { ...textFields, [request.file.fieldname] : request.file.originalname};

  try {
    const createdPost = await createPost(newPost);
    const newImageFileName = `./uploads/${createdPost.insertedId}.png`;
    fs.renameSync(request.file.path, newImageFileName);
    result.status(200).json(createdPost);
  } catch(exception) {
    console.error(exception.message);
    result.status(500).json({"Error":"Failed to create a new post."});
  };
};
