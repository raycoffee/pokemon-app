import express, { Request, Response } from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemonRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your original route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello!");
});

// Pokemon routes
app.use("/api", pokemonRoutes);

export default app;