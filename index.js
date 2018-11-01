const express = require('express');

const { NODE_ENV_PROD } = require('./constants');

const app = express();

const port = process.env.NODE_ENV === NODE_ENV_PROD ? 8080 : 3001;
app.listen(port, () => console.log(`now listening on port ${port}`));
