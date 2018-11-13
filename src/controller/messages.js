const axios = require('axios');

const messagesUtil = require('../utils/messages.util');
const users = require('../db/users');

const { CHANNEL_URLS } = require('../../private');

const handleMessage = (req, res) => {
  const { event, event: { text } } = req.body;

  const isKarmaModifier = messagesUtil.checkIsKarmaModifier(text);

  if (isKarmaModifier) {
    const karmaString = isKarmaModifier[0];
    const userName = karmaString.slice(2, 11);
    const karmaUp = karmaString.slice(-2) === '++';
    return users.getOrAddUser({ userName })
      .then(() => users.setKarma({ userName, karmaUp }))
      .then(({ karma }) => users.getUserName({ userName })
        .then(name => axios.post(
          CHANNEL_URLS[event.channel],
          { text: `@${userName} (${name}): ${karma}` },
        )))
      .then(() => res.sendStatus(200));
  }

  return res.sendStatus(400);
};

module.exports = {
  handleMessage,
};
