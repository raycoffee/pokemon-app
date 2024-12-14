import app from "./src/app"

const PORT = process.env.PORT || 3001;


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    });
}


export default app;