let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

// @desc Get all posts
// @route GET /api/posts

const getPosts = (req, res, next) => {
  const limit = Number(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
};

// @desc Get post by ID
// @route GET /api/posts/:id

const getPost = (req, res, next) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const err = new Error(`ID: ${id} not found.`);
    err.status = 404;
    return next(err);
  }
  res.status(200).json(post);
};

// @desc Create a post
// @route POST /api/posts
const createPost = (req, res, next) => {
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
};

// @desc Update post by ID
// @route PUT /api/posts
const updatePost = (req, res, next) => {
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
};

// @desc Get all posts
// @route DELETE /api/posts/:id
const deletePost = (req, res, next) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    const err = new Error(`ID: ${id} not found.`);
    err.status = 404;
    return next(err);
  }

  posts = posts.filter((p) => p.id !== id);
  return res.status(201).json(posts);
};

export { createPost, deletePost, updatePost, getPost, getPosts };
