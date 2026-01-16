const createError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  return e;
};

const errorOrResponce = (status, body) => {
  if (status >= 400) {
    return {
      Status: status,
      "Content-Type": "application/json",
      ResponseBody: body,
    };
  };
  return body;
};

const unauthorizedError = (status, body) => {
  return {
    Status: status,
    ResponseBody: body,
  };
};

module.exports = { createError, errorOrResponce, unauthorizedError };
