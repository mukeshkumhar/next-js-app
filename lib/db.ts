import mongoose from "mongoose";

const MONGODB_URI = process.env.MongoDb_Url || "mongodb://localhost:27017";

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {

        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Adjust as needed
            serverSelectionTimeoutMS: 5000, // Adjust as needed
            socketTimeoutMS: 45000, // Adjust as needed
        }

        
        mongoose.connect(MONGODB_URI)
        .then(() => mongoose.connection)
    }

    try{
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    return cached.conn;
}