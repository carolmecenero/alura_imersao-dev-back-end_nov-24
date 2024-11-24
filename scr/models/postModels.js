import 'dotenv/config';
import databaseConection from '../config/database-config.js';
import { ObjectId } from "mongodb";

const conection = await databaseConection(process.env.STRING_CONEXAO_MONGODB);
const databaseName = await process.env.DATABASE_MONGODB;
const collectionName = await process.env.COLLECTION_POST;

export async function getAllPosts() {
  const database = conection.db(databaseName);
  const postsCollection = database.collection(collectionName);

  return postsCollection.find().toArray();
};

export async function getPostById(id) {
  const database = conection.db(databaseName);
  const postsCollection = database.collection(collectionName);
  const result = await postsCollection.findOne({ _id: ObjectId.createFromHexString(id)});

  return result ?? "Post não encontrado";
};

export async function createPost(newPost) {
  const database = conection.db(databaseName);
  const postsCollection = database.collection(collectionName);

  return postsCollection.insertOne(newPost);
};

export async function updatePost(id, newData) {
  const database = conection.db(databaseName);
  const postsCollection = database.collection(collectionName);
  const postId = ObjectId.createFromHexString(id);

  return postsCollection.updateOne({ _id: new ObjectId(postId) }, { $set:newData });
};
