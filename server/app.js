import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS FIX
app.use(
  cors({
    origin: "https://socialmediaanalyzer1.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
