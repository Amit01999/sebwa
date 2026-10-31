import mongoose from "mongoose";
import { env } from "../config/env.js";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Cached on `globalThis` so warm serverless invocations reuse the same
// connection instead of opening a new one on every request.
const globalWithCache = globalThis as unknown as { _mongooseCache?: MongooseCache };

const cache: MongooseCache = globalWithCache._mongooseCache ?? { conn: null, promise: null };
globalWithCache._mongooseCache = cache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    mongoose.set("strictQuery", true);
    cache.promise = mongoose.connect(env.MONGODB_URI, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }

  return cache.conn;
}
