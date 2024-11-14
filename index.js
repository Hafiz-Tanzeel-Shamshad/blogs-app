import express, { Router } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user/user.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/category/category.routes.js";
import BlogRoutes from "./routes/blog/blog.routes.js";
import bodyParser from "body-parser";

const router = express.Router();
dotenv.config()
const app = express();

// Parse JSON request body

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
try {
    mongoose.connect('mongodb://127.0.0.1:27017/Auth');
    console.log("DB connted");
} catch (error) {
    console.log(error,"mongooDB conn err");
}


//user routes start point
app.use("/user",userRoutes);

app.use("/category",categoryRoutes);

app.use("/blog",BlogRoutes);












app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 3000}`)
})