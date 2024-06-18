import express from "express";
import path from "path";
const port = process.env.PORT || 8000;
const app = express();
import posts from "./routes/posts.js";

// app.use(express.static(path.join(__dirname, "public"))); // makes a static folder.

app.listen(port, () => console.log("Server is running on port", port));

app.use("/api/posts", posts);
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });
