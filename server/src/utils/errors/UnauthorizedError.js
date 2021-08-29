const CustomError = require('./CustomError');

/**
 * Error class for 401 'Unauthorized'
 * */
class UnauthorizedError extends CustomError {
  /**
   * @param {string} message
   * */
  constructor(message = 'You are not authorized') {
    super(message);
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
