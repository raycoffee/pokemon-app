import app from "./src/app"

const PORT = process.env.PORT || 3001;

// Only start the server if we're running locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    });
}

// Export the app for Vercel
export default app;