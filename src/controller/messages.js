const messagesUtil = require('../utils/messages.util');
const users = require('../db/users');
const slackClient = require('../slackClient');

const handleMessage = async (req, res) => {
  const { event: { text, channel } } = req.body;

  const isKarmaModifier = messagesUtil.checkIsKarmaModifier(text);

  if (isKarmaModifier) {
    try {
      // TODO: This is pretty jank
      const karmaString = isKarmaModifier[0];
      const userId = karmaString.slice(2, 11);
      const karmaUp = karmaString.slice(-2) === '++';

      // If we do, check if we have user info
      let userRecord = await users.getUser({ userId });

      // If no user info, fetch user info
      if (!userRecord) {
        // Get user info from slack
        const fetchedUser = await slackClient.fetchUserInfo(userId);
        const userName = fetchedUser.user.profile.display_name;

        // Add user data to redis
        // TODO: This can be done a bit smarter
        await users.addUser({ userId, userName });
        userRecord = await users.getUser({ userId });
      }
      const oldKarma = userRecord.karma;

      // Now that we have user info, update db karma
      const karma = await users.setKarma({ userId, oldKarma, karmaUp });

      const newText = `*@${userRecord.name}*: ${karma}`;

      // await axios.post(CHANNEL_URLS[channel], channelMessage);
      await slackClient.postMessage({ channel, text: newText });
    }
    catch (e) {
      // Hue
      console.warn(e);
    }
  }

  return res.sendStatus(200);
};

module.exports = {
  handleMessage,
};
