const { WebClient } = require('@slack/client');

const client = new WebClient(process.env.OAUTH_ACCESS_TOKEN);

const getAllUsers = () => client.users.list()
  .then(results => results.members);

const fetchUserInfo = user => client.users.info({ user });

const fetchChannelInfo = channel => client.channels.info({ channel, scopes: ['identify'] });

const postMessage = ({ channel, text }) => client.chat.postMessage({ channel, text, as_user: false });

const postDialog = ({ triggerId, dialog }) => client.dialog.open({ trigger_id: triggerId, dialog }).catch(e => console.log(e.data));

module.exports = {
  getAllUsers,
  fetchUserInfo,
  fetchChannelInfo,
  postMessage,
  postDialog,
};
