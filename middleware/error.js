const errorHandler = (err, req, res, next) => {
  res.status(err.status ?? 500).json({ msg: err.message });
};

export default errorHandler;
