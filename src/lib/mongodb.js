import {MongoClient} from "mongodb";
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGODB_URI);

// Ensure the MongoDB URI is set in environment variables
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error("MongoDB connection string is missing");
    throw new Error('Environment variable "MONGODB_URI" is not defined.');
}

// Define MongoDB options and cache variables
const options = {};
let cachedClient = null;
let cachedDb = null;

// Function to establish a MongoDB connection
const connectToDB = async () => {
    try {
        console.log("Checking for cached MongoDB connection...");
        if (cachedClient && cachedDb) {
            console.log("Using cached MongoDB connection");
            return cachedDb;
        }

        console.log("Creating a new MongoDB connection");
        const client = new MongoClient(uri, options);
        await client.connect();
        console.log("MongoDB connection established");
        const db = client.db("uagrm_db"); // Change this to your DB name
        cachedClient = client;
        cachedDb = db;
        return db;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("MongoDB connection error");
    }
};


// Export a reusable function to get the DB instance
export const getDB = async () => {
    console.log("Getting DB");
    return await connectToDB()
};

// Export a function to access the "students" collection
export const StudentsCollection = async () => {
    console.log("getting db");
    const db = await getDB();
    console.log("after getting db");
    return db.collection("students");
};