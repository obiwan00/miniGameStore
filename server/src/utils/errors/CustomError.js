/**
 * Base class for custom errors
 * */
class CustomError extends Error {
  /**
   * @param {string} message
   * */
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

module.exports = CustomError;
