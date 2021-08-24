require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
const OpenApiValidator = require('express-openapi-validator');
const cookieParser = require('cookie-parser');

const { authRouter } = require('./src/controllers/auth.controller');
const { usersRouter } = require('./src/controllers/users.controller');
const { asyncErrorHandle } = require('./src/utils/app.util');
const { NotFoundError } = require('./src/utils/errors');
const { authorizationMiddleware } = require('./src/middlewares/authorization.middleware');


app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());


const pathToDist = path.resolve(__dirname, '../client/dist/miniGameStore');
app.use('/', express.static(pathToDist));

app.use(
  OpenApiValidator.middleware({
    apiSpec: './openapi.yaml',
    validateResponses: true,
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/users', authorizationMiddleware, usersRouter);
app.get('/api/test', (req, res) => {
  res.send({ message: 'Success!' });
});

app.use(asyncErrorHandle(async () => {
  throw new NotFoundError();
}));

app.use((err, req, res, next) => {
  const resStatus = err.status || 500;
  const resMessage = err.message || 'Internal server error';
  console.log(err);
  res.status(resStatus).json({ message: resMessage });
});

serveApp();

/** Connect to BD and listen to port */
async function serveApp() {
  try {
    await connectToBD();
    app.listen(process.env.PORT || 8080);
  } catch (error) {
    console.log(error);
  }
}

/** Connect to mongo DB */
async function connectToBD() {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('DB connected');
}
