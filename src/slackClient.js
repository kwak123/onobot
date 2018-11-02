const { WebClient } = require('@slack/client');

const client = new WebClient(process.env.OAUTH_ACCESS_TOKEN);

const getAllUsers = () => client.users.list()
  .then(results => results.members);

module.exports = {
  getAllUsers,
};
