import databaseConection from '../config/database-config.js';
import { ObjectId } from "mongodb";

const conection = await databaseConection(process.env.STRING_CONEXAO_MONGODB);

export async function getAllPosts() {
  const database = conection.db("photogram");
  const postsCollection = database.collection("posts");

  return postsCollection.find().toArray();
};

export async function getPostById(id) {
  const database = conection.db("photogram");
  const postsCollection = database.collection("posts");
  const result = await postsCollection.findOne({ _id: ObjectId.createFromHexString(id)});

  return result ?? "Post não encontrado";
};

export async function createPost(newPost) {
  const database = conection.db("photogram");
  const postsCollection = database.collection("posts");

  return postsCollection.insertOne(newPost);
};
