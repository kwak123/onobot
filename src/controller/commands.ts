import { Request, Response } from "express";
import moment from "moment";
// import slackClient from '../slackClient';
import dialogBox from "./dialogBox";

const parseCommandIntent = (req: Request, res: Response) => {
  /* eslint-disable camelcase */
  const { text, trigger_id }: { text: string; trigger_id: string } = req.body;

  const commandSet = text.split(" ");
  const userTag = commandSet.find((command) => command.match(/<@.+>/gi) !== null);

  const birthdayCommand = "birthday";
  const addTermCommand = "+=";
  const removeTermCommand = "-=";

  if (commandSet.includes(addTermCommand)) {
    addTermToUser().then((_) => res.send("Added term test"));
  } else if (commandSet.includes(removeTermCommand)) {
    removeTermFromUser().then((_) => res.send("Removed term test "));
  } else if (commandSet.includes(birthdayCommand)) {
    if (userTag) {
      if (commandSet.includes("set")) {
        const dateSlice = commandSet.slice(-3);
        try {
          const birthday = new Date(dateSlice.join(" "));
          const formattedBirthday = moment(birthday).format("MMM Do, YYYY");
          if (formattedBirthday === "Invalid date") {
            return res.send('Please split month, day, and year into 3 words (no "th"s), e.g. 12 4 1992 or Dec 4 1992');
          }

          dialogBox.attachments[0].text = formattedBirthday;
          return res.send(dialogBox);
          // Dispatch dialog to confirm birthday
          // return res.send(formattedBirthday);
          // return slackClient.postDialog({
          //   triggerId: trigger_id,
          //   dialog: dialogBox,
          // });
        } catch (e) {
          return res.send("Could not parse date");
        }
      }
      return res.send("Get usertag birthday");
    }
    return res.send("Birthday intent");
  }

  return res.send("Couldn't guess what you wanted");
};

const addTermToUser = async () => {
  /* Add term */
};

const removeTermFromUser = async () => {
  /* Remove Term */
};

export default {
  parseCommandIntent,
};
