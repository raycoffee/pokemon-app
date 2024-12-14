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

const allowedOrigins = [
  'https://pokedex-eta-lake-67.vercel.app',
  'http://localhost:3000',
  'https://raypivot.site',
  'https://api.raypivot.site'
];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400, // 24 hours in seconds
  preflightContinue: false,
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello!");
});


app.use("/api", pokemonRoutes);


app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

export default app;