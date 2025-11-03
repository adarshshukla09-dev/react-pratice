import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const NoteCard = ({ note, setNotes }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      setDeleting(true);
      const res = await axios.delete(`http://localhost:3000/api/notes/${id}`);
      console.log("Delete response:", res.data);

      // ✅ Immediately update UI
      setNotes((prev) => prev.filter((n) => n._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.response?.data || error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        {/* ✅ Make title/content clickable */}
        <Link to={`/note/${note._id}`} className="block cursor-pointer">
          <h3 className="card-title text-base-content font-semibold">
            {note.title}
          </h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </Link>

        {/* Footer */}
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-2">
            <Link
              to={`/note/${note._id}`}
              className="btn btn-ghost btn-xs text-primary hover:bg-primary/10"
            >
              <PenSquareIcon className="size-4" />
            </Link>

            <button
              disabled={deleting}
              onClick={() => handleDelete(note._id)}
              className={`btn btn-ghost btn-xs text-error hover:bg-error/10 ${
                deleting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
