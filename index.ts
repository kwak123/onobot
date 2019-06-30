import express from "express";
import { NextFunction, Request, Response } from "express";

/* tslint:disable-line */ const dotenv = require("dotenv").config();
/* tslint:disable-line */ const redis = require("./src/db/redis");

// Controllers
import commandsController from "./src/controller/commands";
import messagesController from "./src/controller/messages";

// Deprecated
import bodyParser from "body-parser";

import { NODE_ENV_PROD } from "./constants";

// Initialize
const app = express();

/* Middleware */
const logger = (req: Request, _: Response, next: NextFunction) => {
  /* eslint-disable-next-line no-console */
  console.log(`received ${req.method} at ${req.url}`);
  next();
};
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./dist"));

/* Routing */
app.get("/", (req: Request, res: Response) => {
  res.send("Sup");
});

app.post("/command", (req: Request, res: Response) => {
  commandsController.parseCommandIntent(req, res);
});

app.post("/dialog", (req: Request, res: Response) => {
  console.log(req.body);
  res.sendStatus(200);
});

// Challenge
app.post("/", (req: Request, res: Response) => {
  const { type } = req.body;
  if (type === "url_verification") {
    return res.send(req.body.challenge);
  }

  const { event } = req.body;

  // Ignore other bots and myself
  if (event.bot_id) {
    return res.sendStatus(200);
  }

  return messagesController.handleKarmaMessage(req, res);
});

const port = process.env.NODE_ENV === NODE_ENV_PROD ? 8080 : 49001;
app.listen(port, () => console.log(`now listening on port ${port}`));
