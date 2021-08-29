const CustomError = require('./CustomError');

/**
 * Error class for 401 'Unauthorized'
 * */
class InternalServerError extends CustomError {
  /**
   * @param {string} message
   * */
  constructor(message = 'Internal server error') {
    super(message);
    this.status = 500;
  }
}

module.exports = InternalServerError;
