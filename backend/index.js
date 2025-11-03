import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/notes", notesRoutes);

connectDB();

app.listen(3000);
