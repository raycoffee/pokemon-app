import app from "./src/app"
import express from "express"

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
