import fs from 'fs';
import createDescriptionWithGemini from "../services/geminiService.js"
import { getAllPosts, getPostById, createPost, updatePost } from "../models/postModels.js";

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

export async function updateThisPost(request, result) {
  const postId = request.params.id;
  const imageUrl = `/${postId}.png`;
  const textFields = request.body;
  const newData = { ...textFields, image_url: imageUrl};

  try {
    const updatedPost = await updatePost(postId, newData);
    result.status(200).json(updatedPost);
  } catch(exception) {
    console.error(exception.message);
    result.status(500).json({"Error":"Failed to update the post."});
  };
};

export async function updateThisPostWithAi(request, result) {
  try {
    const postId = request.params.id;
    const imageUrl = `/${postId}.png`;
    const textFields = request.body;
    const imageBuffer = fs.readFileSync(`./uploads/${postId}.png`);
    const aiDescription = await createDescriptionWithGemini(imageBuffer);
    const newData = { ...textFields,
      image_url: imageUrl,
      image_alt_ai:aiDescription,
    };
    const updatedPost = await updatePost(postId, newData);
    result.status(200).json(updatedPost);
  } catch(exception) {
    console.error(exception.message);
    result.status(500).json({"Error":"Failed to update the post."});
  };
};
