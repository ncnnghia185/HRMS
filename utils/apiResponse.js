const successResponse = (res, data) => {
  return res.status(200).json({
    success: true,
    message: "Success",
    data: data,
  });
};

const failResponse = (res, error) => {
  return res.status(400).json({
    success: false,
    message: "Failed",
    error: error.message,
  });
};

module.exports = {
  successResponse,
  failResponse,
};
