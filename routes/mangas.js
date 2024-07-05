import express from "express";
import read from "../controllers/mangas/read.js";
import read_one from '../controllers/mangas/read_one.js';
const router = express.Router();

router.get("/", read)
router.get("/:id", read_one)
export default router;
//req.params.id