import usersDb from "../db/users";
import slackClient from "../slackClient";

interface IKarmaMessage {
  userId: string;
  karmaChange: number;
}

class KarmaController {
  public parseKarmaMessage = async (karmaMessage: IKarmaMessage) => {
    // const { userId, karmaChange } = karmaMessage;
    // let userRecord = await usersDb.getUser({ userId });
    // if (!userRecord) {
    //   const fetched = await slackClient.fetchUserInfo;
    // }
  };
}
