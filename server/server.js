import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import express from "express"

import postRoutes from './routes/posts.js'

const app = express();
const PORT = 5000



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes init
app.use('/posts', postRoutes)

//mongoDB init

const CONNECTION_URL = 'mongodb+srv://iknowsaint:jajabone@cluster0.qzlrfzl.mongodb.net/?retryWrites=true&w=majority';
mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`));
mongoose.set("useFindAndModify", false);

// mongoose.set("useFindAndModify", false);
// mongoose.set("strictQuery", false);
// mongoose.connect(CONNECTION_URL, () => {
//     console.log(`Connected to MongoDB`)
//     app.listen(PORT, () => {
//         console.log(`Listening at ${PORT}`);
//     })
// });
