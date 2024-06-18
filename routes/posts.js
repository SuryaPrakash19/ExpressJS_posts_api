import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

router.get("", (req, res) => {
  const limit = Number(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    res.status(404).json({ msg: "ID not found:", id });
  } else {
    res.status(200).json(post);
  }
});

router.post("", (req, res) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    return res.status(400).json({ msg: "Incorrect request. Add a title." });
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

router.put("/:id", (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ msg: `ID: ${id} not found.` });
  }

  post.title = req.body.title;

  return res.status(201).json(posts);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ msg: `ID: ${id} not found.` });
  }
  posts = posts.filter((p) => p.id !== id);
  return res.status(201).json(posts);
});

export default router;
