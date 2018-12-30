const redis = require('./redis');

const CHANNELS_HASH = 'channels';

const refreshChannel = channel => redis.hsetAsync(
  CHANNELS_HASH,
  channel,
  true,
);

module.exports = {
  CHANNELS_HASH,
  refreshChannel,
};
