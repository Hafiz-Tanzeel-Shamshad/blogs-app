import express from "express";
import { createBlog } from "../../controllers/blog/blog.controllers.js";


import multer from "multer";
// Configure Multer for memory storage
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Example: Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only images are allowed"));
      }
    }
  });
  


const router = express.Router();

router.post("/add",upload.single("image"),createBlog);

export default router;


// app->routes->controller
// app: (base url pass kry gy ,routes : name of routes)
// e.g: app.use("/user",userRoutes)

// routes: (1st para endpoint, 2nd controller name)
// e.g: router.[req type(get/post...)]("/add",user controller )

// controller: model ay ga or manipulate kry gy

// configartion files: