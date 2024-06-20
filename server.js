import express from "express";
import path from "path";
import logger from "./middleware/logger.js";
const port = process.env.PORT || 8000;
const app = express();
import posts from "./routes/posts.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);
// app.use(express.static(path.join(__dirname, "public"))); // makes a static folder.
app.use("/api/posts", posts);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log("Server is running on port", port));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });
