import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NoteCard from "./NoteCard";
import axios from "axios";
import toast from "react-hot-toast";

export default function Homepage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("http://localhost:3000/api/notes");
        console.log("Fetched notes:", res.data);

        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to load notes");
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* ✅ Use _id instead of id */}
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}

        {!loading && notes.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}
