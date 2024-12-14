// In your server's app.ts
import express, { Request, Response } from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemonRoutes";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://pokedex-eta-lake-67.vercel.app', // Your client domain
    'http://localhost:3000' // Local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello!");
});

app.use("/api", pokemonRoutes);

export default app;