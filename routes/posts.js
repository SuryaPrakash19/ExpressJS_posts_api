import express from "express";
const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

router.get("", (req, res, next) => {
  const limit = Number(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

router.get("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const err = new Error(`ID: ${id} not found.`);
    err.status = 404;
    return next(err);
  }
  res.status(200).json(post);
});

router.post("", (req, res, next) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    const err = new Error("Incorrect request. Add a title.");
    err.status = 400;
    return next(err);
    // return res.status(400).json({ msg: "Incorrect request. Add a title." });
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

router.put("/:id", (req, res, next) => {
  console.log(req.params);
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const err = new Error(`ID: ${id} not found.`);
    err.status = 404;
    return next(err);
  }

  post.title = req.body.title;

  return res.status(201).json(posts);
});

router.delete("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const err = new Error(`ID: ${id} not found.`);
    err.status = 404;
    return next(err);
  }

  posts = posts.filter((p) => p.id !== id);
  return res.status(201).json(posts);
});

export default router;
