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

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
}

export default app;