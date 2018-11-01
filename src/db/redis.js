const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis);

const client = redis.createClient({
  db: process.env.NODE_ENV === 'test' ? 10 : 0,
});

// Disable for event logging
/* eslint-disable no-console */
client.on('connect', () => console.log('connecting to redis'));
client.on('ready', () => console.log('connected to redis'));
client.on('error', error => console.error('redis error', error));
client.on('warning', warning => console.warn('redis warning', warning));
/* eslint-enable no-console */

module.exports = client;
