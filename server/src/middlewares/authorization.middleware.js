const expressJwt = require('express-jwt');
const { AccessDeniedError } = require('../utils/errors');
const { asyncErrorHandle } = require('../utils/app.util');


/**
 * Authorization middleware
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
async function authorizationMiddleware(req, res, next) {
  await expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: (req) => getJwtToken(req),
  })(req, res, next);
}

/**
 * Get Jwt token from Authentication header or from cookies
 * @param {object} req
 * @return {string | AccessDeniedError}
 * */
function getJwtToken(req) {
  const tokenFormAuthHeader = getJwtTokenFromAuthHeader(req);
  if (tokenFormAuthHeader) {
    return tokenFormAuthHeader;
  }

  const tokenFromCookie = req.cookies?.token;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  throw new AccessDeniedError(
    'There is no Jwt token applied. ' +
    'Attach Jwt token to \'Authentication\' header of request.',
  );
}

/**
 * Get Jwt token from Authentication header
 * @param {object} req
 * @return {string | undefined}
 * */
function getJwtTokenFromAuthHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return;
  }
  const [type, token] = authHeader.split(' ');
  if (authHeader && type === 'Bearer' || type === 'JWT') {
    return token;
  }
}


module.exports = {
  authorizationMiddleware: asyncErrorHandle(authorizationMiddleware),
};
