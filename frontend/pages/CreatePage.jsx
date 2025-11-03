import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef();

  // Auto-focus on title input
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Both title and content are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/notes", { title, content });
      toast.success("Note created successfully!", { position: "top-right" });
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create note", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Back button */}
        <Link
          to="/"
          className="btn btn-ghost mb-6 flex items-center gap-2 text-base-content hover:bg-base-300 transition"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>

        {/* Card */}
        <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all border-t-4 border-[#00FF9D]">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 font-semibold text-center text-base-content">
              ✨ Create a New Note
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="form-control mb-6">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-base-content/80">
                    Title
                  </span>
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="Enter note title..."
                  className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-[#00FF9D] transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={80}
                />
                <div className="text-xs text-base-content/60 mt-1 text-right">
                  {title.length}/80
                </div>
              </div>

              {/* Content Input */}
              <div className="form-control mb-8">
                <label className="label mb-2">
                  <span className="label-text font-semibold text-base-content/80">
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-48 bg-base-100 focus:ring-2 focus:ring-[#00FF9D] transition-all"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={500}
                />
                <div className="text-xs text-base-content/60 mt-1 text-right">
                  {content.length}/500
                </div>
              </div>

              {/* Submit Button */}
              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className={`btn btn-primary flex items-center gap-2 transition-all ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Note"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
