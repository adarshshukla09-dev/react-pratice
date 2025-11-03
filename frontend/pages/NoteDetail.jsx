import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Fetch the note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // ✅ Delete note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  // ✅ Save note
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);
    try {
      await axios.put(`http://localhost:3000/api/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2Icon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-lg text-base-content/70">Note not found.</p>
      </div>
    );
  }

  // ✅ Main view
  return (
    <div className="min-h-screen bg-base-200 px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="btn btn-ghost flex items-center gap-2 text-base-content hover:bg-base-300"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline flex items-center gap-2"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete
          </button>
        </div>

        {/* Note Editor Card */}
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all border-t-4 border-[#00FF9D]">
          <div className="card-body">
            {/* Title */}
            <div className="form-control mb-6">
              <label className="label mb-2">
                <span className="label-text font-semibold text-base-content/80">
                  Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your note title..."
                className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-[#00FF9D] transition-all"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                maxLength={80}
              />
              <div className="text-xs text-base-content/60 mt-1 text-right">
                {note.title.length}/80
              </div>
            </div>

            {/* Content */}
            <div className="form-control mb-8">
              <label className="label mb-2">
                <span className="label-text font-semibold text-base-content/80">
                  Content
                </span>
              </label>
              <textarea
                placeholder="Write your note content here..."
                className="textarea textarea-bordered h-48 bg-base-100 focus:ring-2 focus:ring-[#00FF9D] transition-all"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                maxLength={500}
              />
              <div className="text-xs text-base-content/60 mt-1 text-right">
                {note.content.length}/500
              </div>
            </div>

            {/* Footer */}
            <div className="card-actions justify-between items-center">
              <span className="text-sm text-base-content/60 italic">
                Last updated:{" "}
                {new Date(note.updatedAt || note.createdAt).toLocaleString()}
              </span>

              <button
                className={`btn btn-primary flex items-center gap-2 ${
                  saving ? "opacity-70" : ""
                }`}
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
