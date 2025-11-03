import Note from "../models/Note.js";

// ✅ Get all notes
export async function getallNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notes" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Create a note
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content });
    await newNote.save();

    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error in createNotes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ Update a note
export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error("Error in updateNotes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deletenotes(req, res) {
  console.log("DELETE route hit! ID:", req.params.id);

  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    console.log("Deleted note document:", deletedNote); // ✅ log after declaring it

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deletenotes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
