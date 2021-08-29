const CustomError = require('./CustomError');

/**
 * Error class for 400 'Bad request'
 * */
class BadRequestError extends CustomError {
  /**
   * @param {string} message
   * */
  constructor(message = 'Bad Request. Check if syntax of request is valid.') {
    super(message);
    this.status = 400;
  }
}

module.exports = BadRequestError;
