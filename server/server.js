import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import express from "express"

const app = express();
const PORT = 5000

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})