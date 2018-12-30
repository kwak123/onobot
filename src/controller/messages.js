const axios = require('axios');

const messagesUtil = require('../utils/messages.util');
const users = require('../db/users');
// const channels = require('../db/channels');
const slackClient = require('../slackClient');

const { CHANNEL_URLS } = require('../../private');

const handleMessage = async (req, res) => {
  const { event: { text, channel } } = req.body;

  const isKarmaModifier = messagesUtil.checkIsKarmaModifier(text);

  if (isKarmaModifier) {
    try {
      const karmaString = isKarmaModifier[0];
      const userId = karmaString.slice(2, 11);
      const karmaUp = karmaString.slice(-2) === '++';
      // Check we have the channel
      // If not, just return
      // TODO: Channels should be able to be added and integrated on first use
      if (!CHANNEL_URLS[channel]) {
        console.log('Invalid channel');
        return res.send(200);
      }

      // If we do, check if we have user info
      let userRecord = await users.getUser({ userId });

      // If no user info, fetch user info
      if (!userRecord) {
        // Get user info from slack
        const fetchedUser = await slackClient.fetchUserInfo(userId);
        const userName = fetchedUser.user.name;

        // Add user data to redis
        // TODO: This can be done a bit smarter
        await users.addUser({ userId, userName });
        userRecord = await users.getUser({ userId });
        console.log(userRecord);
      }
      const oldKarma = userRecord.karma;

      // Now that we have user info, update db karma
      const karma = await users.setKarma({ userId, oldKarma, karmaUp });

      // Send the new message to the channel
      // TODO: Use display name
      const channelMessage = { text: `*@${userRecord.name}*: ${karma}` };
      await axios.post(CHANNEL_URLS[channel], channelMessage);
    }
    catch (e) {
      console.warn(e);
    }
    return res.sendStatus(200);

    // return channels.refreshChannel(channel)
    //   .then(() => users.getOrAddUser({ userName }))
    //   .then(() => users.setKarma({ userName, karmaUp }))
    //   .then(({ karma }) => users.getUserName({ userName })
    //     .then(name => axios.post(
    //       CHANNEL_URLS[event.channel],
    //       { text: `@${userName} (${name}): ${karma}` },
    //     )))
    //   .then(() => res.sendStatus(200));
  }

  return res.sendStatus(400);
};

module.exports = {
  handleMessage,
};
