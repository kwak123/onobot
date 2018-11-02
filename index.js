const express = require('express');
const axios = require('axios');
/* eslint-disable-line */ const dotenv = require('dotenv').config();
/* eslint-disable-line */ const bodyParser = require('body-parser');
/* eslint-disable-line */ const redis = require('./src/db/redis');

const { getOrAddUser, setKarma } = require('./src/users');

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
  const { type } = req.body;
  if (type === 'url_verification') {
    return res.send(req.body.challenge);
  }

  const { event } = req.body;
  // console.log(req.body);
  // Ignore other bots and myself
  if (event.bot_id) {
    return res.sendStatus(200);
  }
  // TEMP
  if (event.channel === 'CDUAQ8AMB'
    && event.text
    && event.text.includes('@')
    && (event.text.includes('++') || event.text.includes('--'))) {
    const { user } = event;
    const karmaUp = event.text.includes('++');
    return getOrAddUser({ userName: user })
      .then(() => setKarma({ userName: user, karmaUp }))
      .then(({ karma }) => axios.post(
        'https://hooks.slack.com/services/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',
        { text: `<@${user}>: ${karma}` },
      )).then(() => {
        console.log('sent');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.warn(error);
        res.sendStatus(500);
      });
  }
  return res.sendStatus(200);
});

const port = process.env.NODE_ENV === NODE_ENV_PROD ? 8080 : 3001;
app.listen(port, () => console.log(`now listening on port ${port}`));
