const CustomError = require('./CustomError');

/**
 * Error class for 404 'Not Found'
 * */
class NotFoundError extends CustomError {
  /**
   * @param {string} message
   * */
  constructor(message = 'Not found') {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;
