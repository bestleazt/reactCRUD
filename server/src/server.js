import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import noteRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
// import ratelimiter from "./middleware/rateLimiter.js";

const app = express();
dotenv.config();
const __dirname = path.resolve();

// middleware
app.use(morgan("dev"));
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
// app.use(ratelimiter);

// route
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../client/vite-project/dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/vite-project", "dist", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
}); // connect Database
