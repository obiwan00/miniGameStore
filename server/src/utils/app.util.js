const asyncErrorHandle = (callback) => {
  return (res, req, next) => {
    return callback(res, req, next).catch(next);
  };
};


module.exports = {
  asyncErrorHandle,
};
