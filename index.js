const express = require('express');
const bodyParser = require('body-parser');
/* eslint-disable-line */ const dotenv = require('dotenv').config();
/* eslint-disable-line */ const redis = require('./src/db/redis');

// Controllers
const messagesController = require('./src/controller/messages');
const commandsController = require('./src/controller/commands');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./dist'));

/* Routing */
app.get('/', (req, res) => {
  res.send('Sup');
});

app.post('/command', (req, res) => {
  commandsController.parseCommandIntent(req, res);
});

app.post('/dialog', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

// Challenge
app.post('/', (req, res) => {
  const { type } = req.body;
  if (type === 'url_verification') {
    return res.send(req.body.challenge);
  }

  const { event } = req.body;

  // Ignore other bots and myself
  if (event.bot_id) {
    return res.sendStatus(200);
  }

  return messagesController.handleKarmaMessage(req, res);
});

const port = process.env.NODE_ENV === NODE_ENV_PROD ? 8080 : 49001;
app.listen(port, () => console.log(`now listening on port ${port}`));
