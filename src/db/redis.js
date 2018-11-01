const redis = require('redis');

const client = redis.createClient();

// Disable for event logging
/* eslint-disable no-console */
client.on('connect', () => console.log('connecting to redis'));
client.on('ready', () => console.log('connected to redis'));
client.on('error', () => console.error('error with redis'));
client.on('warning', warning => console.warn(warning));
