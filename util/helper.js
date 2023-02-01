let response_data = {
  err_code: 0,
  err_msg: "",
  data: null,
};
exports.ResponseData = (err_code, err_msg, data) => {
  response_data.err_code = err_code;
  response_data.err_msg = err_msg;
  response_data.data = data;
  return response_data;
};
