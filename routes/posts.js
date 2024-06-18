const express = require("express");
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

module.exports = router;
