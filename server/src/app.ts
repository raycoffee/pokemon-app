import express, { Request, Response } from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemonRoutes";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

const app = express();


const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};


connectDB();


const corsOptions = {
  origin: [
    'https://pokedex-eta-lake-67.vercel.app',
    'http://localhost:3000',
    "https://raypivot.site",
    "https://api.raypivot.site"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello!");
});

app.use("/api", pokemonRoutes);

export default app;