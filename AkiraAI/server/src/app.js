import express from "express";
import cookieParser from "cookie-parser";

import AuthRouter from "./routes/auth.routes.js";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ message: "Server is runnning on " });
});
/**ENDPOINTS**/
app.use("/auth", AuthRouter);

export default app;
