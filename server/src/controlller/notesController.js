import Note from '../models/Note.js'


//  GET ALL  Controller
export const getAllNotes = async (_,res)=>{
    try {
        const notes = await Note.find().sort({createdAt:-1}); // newest first
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message:"Internal server error"})
    }
  
};

//  GET BY ID Controller


export const getNoteById = async (req,res)=>{
    try {
        const note = await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:"Note not found"});
         res.status(200).json({message:note});
    } catch (error) {
         console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal server error"});
    }
};

//  CREATE Controller

export const createNote = async (req,res)=>{
    try {
        const {title,content} = req.body
        const note = new Note({title,content})
        const saveNote = await note.save()
        res.status(201).json({message:saveNote})
    } catch (error) {
        console.error("Error in createNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

//  UPDATE Controller

export const updateNote = async (req,res)=>{
    try {
        const {title,content} = req.body
        const updatedNote =  await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true,
            }
        )
        if(!updatedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:updatedNote});
    } catch (error) {
        console.error("Error in updated controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}

//  DELETE Controller

export const deleteNote = async (req,res)=>{
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
         if(!deletedNote) return res.status(404).json({message:"Note not found"});
         res.status(200).json({message:'Note deleted successfully!'});
    } catch (error) {
        console.error("Error in deletedNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}