import express from "express";
import {createNewNotes, deleteNotes, getAllNotes, getNoteById, updateNotes} from "../controllers/noteController";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNewNotes);
router.put("/:id",updateNotes);
router.delete("/:id", deleteNotes);

export default router;