import express from "express";
import {
  createNote,
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
} from "../controllers/note.controller.js";
import protect from "../middlewares/protect.js";

// 1) router oluştur
const router = express.Router();

// 2) yolları tanımla
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.post("/", protect, createNote);
router.delete("/:id", protect, deleteNote);
router.patch("/:id", protect, updateNote);

// 3) export et ve app'e tanıt
export default router;
