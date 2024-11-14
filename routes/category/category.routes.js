import express from "express";
import { createCategory } from "../../controllers/category/category.controllers.js";
import { varityUser } from "../../middleware/auth/varify.middleware.js";

const router = express.Router();

router.post("/add",varityUser,createCategory );

export default router;