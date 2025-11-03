import express from "express";
import {
  getallNotes,
  createNotes,
  deletenotes,
  updateNotes,
  getNoteById,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getallNotes);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deletenotes);
router.get("/:id", getNoteById); // ✅ Add this

export default router;
