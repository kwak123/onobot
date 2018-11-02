const express = require('express');
const axios = require('axios');
/* eslint-disable-line */ const dotenv = require('dotenv').config();
/* eslint-disable-line */ const bodyParser = require('body-parser');
/* eslint-disable-line */ const redis = require('./src/db/redis');

const { getAllUsers } = require('./src/slackClient');
const { NODE_ENV_PROD } = require('./constants');
const { CHANNEL_URLS } = require('./private');
const {
  getOrAddUser,
  setKarma,
  setUserNamesTable,
  getUserName,
} = require('./src/users');

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

app.post('/update/users', (req, res) => {
  const { key } = req.body;
  if (key !== process.env.PRIVILEGED) {
    return res.sendStatus(403);
  }
  return getAllUsers()
    .then(members => setUserNamesTable({ members }))
    .then(() => res.sendStatus(200));
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
  if (CHANNEL_URLS[event.channel]
    && event.text
    && event.text.includes('@')
    && (event.text.includes('++') || event.text.includes('--'))) {
    // const { user } = event;
    const userName = event.text.slice(2, 11);
    const karmaUp = event.text.includes('++');
    return getOrAddUser({ userName })
      .then(() => setKarma({ userName, karmaUp }))
      .then(({ karma }) => getUserName({ userName })
        .then(name => axios.post(
          CHANNEL_URLS[event.channel],
          { text: `@${userName} (${name}): ${karma}` },
        )))
      .then(() => {
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
