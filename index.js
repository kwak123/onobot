const express = require('express');
/* eslint-disable-line */ const dotenv = require('dotenv').config();
/* eslint-disable-line */ const bodyParser = require('body-parser');
/* eslint-disable-line */ const redis = require('./src/db/redis');

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
app.use(bodyParser.json());

/* Routing */
app.get('/', (req, res) => {
  res.send('Sup');
});

// Challenge
app.post('/', (req, res) => {
  console.log(req.body);
  const { challenge, type } = req.body;
  if (type !== 'url_verification') {
    return res.send(challenge);
  }
  return res.sendStatus(200);
});

const port = process.env.NODE_ENV === NODE_ENV_PROD ? 8080 : 3001;
app.listen(port, () => console.log(`now listening on port ${port}`));
