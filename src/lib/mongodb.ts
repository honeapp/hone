import { MongoClient } from 'mongodb';

if (!process.env.DATABASE_URL) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.DATABASE_URL;
const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    retryWrites: true,
    w: "majority"
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;