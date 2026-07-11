import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import AuthRouter from "./routes/auth.routes.js";
import ChatRouter from "./routes/chat.routes.js";

const app = express();
const frontend_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// ─── CORS ──────────────────────────────────────────────────────────
app.use(
  cors({
    origin: frontend_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ─── LOGGER ────────────────────────────────────────────────────────
// "dev" format: METHOD  url  status  response-time  content-length
app.use(morgan("dev"));

// ─── BODY PARSERS ──────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── HEALTH CHECK ──────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

// ─── ROUTES ────────────────────────────────────────────────────────
app.use("/api/auth", AuthRouter);
app.use("/api/chat", ChatRouter);

export default app;
