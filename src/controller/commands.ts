import moment from 'moment';
import { Request, Response } from 'express';
// import slackClient from '../slackClient';
import dialogBox from './dialogBox';

const parseCommandIntent = (req: Request, res: Response) => {
  /* eslint-disable camelcase */
  const { text, trigger_id }: { text: String, trigger_id: String } = req.body;
  console.log(text);

  const commandSet = text.split(' ');
  const userTag = commandSet.find(command => command.match(/<@.+>/gi) !== null);

  if (commandSet.includes('birthday')) {
    if (userTag) {
      if (commandSet.includes('set')) {
        const dateSlice = commandSet.slice(-3);
        try {
          const birthday = new Date(dateSlice.join(' '));
          const formattedBirthday = moment(birthday).format('MMM Do, YYYY');
          if (formattedBirthday === 'Invalid date') {
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
        }
        catch (e) {
          console.warn(e);
          return res.send('Could not parse date');
        }
      }
      return res.send('Get usertag birthday');
    }
    return res.send('Birthday intent');
  }

  return res.send('Couldn\'t guess what you wanted');
};

export default {
  parseCommandIntent,
};
