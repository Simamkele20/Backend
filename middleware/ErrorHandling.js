function errorHandling(err, req, res, next) {
  if (err || res.statusCode >= 400) {
    res.json({
      status: err.statusCode || 500,
      msg: "An error occured.Please try again later",
    });
  } else {
    next();
  }
}
export { errorHandling };
