import "server-only";
import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local');
}

const uri: string = process.env.MONGODB_URI;

// Example options object
const options: MongoClientOptions = {
  maxPoolSize: 10,
  connectTimeoutMS: 10000, 
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development, use a global so we don’t spin up new clients on every hot reload.
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options); // Pass options here
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's best to just create one client.
  client = new MongoClient(uri, options); // Pass options here
  clientPromise = client.connect();
}

export default clientPromise;
