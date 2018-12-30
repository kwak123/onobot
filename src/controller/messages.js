const messagesUtil = require('../utils/messages.util');
const users = require('../db/users');
const slackClient = require('../slackClient');

const parseKarmaMessage = async ({ userId, karmaChange }) => {
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
  const oldKarma = parseInt(userRecord.karma, 10);
  const newKarma = oldKarma + karmaChange;

  // Now that we have user info, update db karma
  const karma = await users.setKarma({ userId, newKarma });

  return `*@${userRecord.name}*: ${karma}`;
};

const handleKarmaMessage = async (req, res) => {
  try {
    const { event: { text, channel } } = req.body;

    const getKarmaModifierList = messagesUtil.getKarmaModifierList(text);

    // Natural no-op if length of array is empty
    // Turn array into hash of username with total karma change
    const parsedKarmaModifierHash = messagesUtil.parseKarmaModifierList(getKarmaModifierList);

    // TOOD: This can be done better
    Object.keys(parsedKarmaModifierHash).forEach(async (userId) => {
      const karmaChange = parsedKarmaModifierHash[userId];
      const newText = await parseKarmaMessage({ userId, karmaChange });
      slackClient.postMessage({ channel, text: newText });
    });
  }
  catch (e) {
    console.warn(e);
  }
  return res.sendStatus(200);
};

module.exports = {
  handleKarmaMessage,
  parseKarmaMessage,
};
