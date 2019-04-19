import express, { Request, NextFunction, Response } from 'express';

/* eslint-disable-line */ const dotenv = require('dotenv').config();
/* eslint-disable-line */ const redis = require('./src/db/redis');

// Controllers
import messagesController from './src/controller/messages';
import commandsController from './src/controller/commands';

// Deprecated
import bodyParser from 'body-parser';

const { NODE_ENV_PROD } = require('./constants');

// Initialize
const app = express();

/* Middleware */
const logger = (req: Request, _: any, next: NextFunction) => {
  /* eslint-disable-next-line no-console */
  console.log(`received ${req.method} at ${req.url}`);
  next();
};
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./dist'));

/* Routing */
app.get('/', (req: Request, res: Response) => {
  res.send('Sup');
});

app.post('/command', (req: Request, res: Response) => {
  commandsController.parseCommandIntent(req, res);
});

app.post('/dialog', (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

// Challenge
app.post('/', (req: Request, res: Response) => {
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
