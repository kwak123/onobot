const express = require('express');
const redis = require('./src/db/redis');

const { NODE_ENV_PROD } = require('./constants');

// Initialize
const app = express();

/* Middleware */
const logger = (req, res, next) => {
  /* eslint-disable-next-line no-console */
  console.log(`received ${req.method} at ${req.url}`);
  next();
};
app.use(logger);

const port = process.env.NODE_ENV === NODE_ENV_PROD ? 8080 : 3001;
app.listen(port, () => console.log(`now listening on port ${port}`));
