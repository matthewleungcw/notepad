import {Request, response, Response} from "express";
import Note from "../models/Note";

export async function getAllNotes(req: Request, res: Response) {
    try{
        const notes = await Note.find().sort({createdAt: -1}) // -1 == sort in createdAt desc
        res.status(200).json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function createNewNotes(req: Request, res: Response) {
    try{
        const {title,content} = req.body
        const note = new Note({title, content})

        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function getNoteById(req: Request,  res: Response ) {
    try{
        const notes = await Note.findById(req.params.id)
        if (!notes) {
            res.status(404).json({message: "Note Not Found"})
            return
        }
        res.status(200).json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function updateNotes(req: Request, res: Response) {
    try {
        const {title, content} = req.body
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true, runValidators: true}
        )
        if (!updateNote) {
            res.status(404).json({message: "Note Not Found"})
            return
        }
        res.status(200).json({message: "Note Updated Successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function deleteNotes(req: Request, res: Response) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) {
            res.status(404).json({message: "Note Not Found"})
            return
        }
        res.status(200).json(deleteNote)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal Server Error"})
    }
}