const response = (res, statusCode, status, message, results) => {
  if (results !== null) {
    res.status(statusCode).json({
      status: status,
      message: message,
      results: results,
    });
  } else {
    res.status(statusCode).json({
      status: status,
      message: message,
    });
  }
};

module.exports = response;
