const CustomError = require('./CustomError');

/**
 * Error class for 401 'Forbidden'
 * */
class AccessDeniedError extends CustomError {
  /**
   * @param {string} message
   * */
  constructor(message = 'Access denied') {
    super(message);
    this.status = 403;
  }
}

module.exports = AccessDeniedError;
