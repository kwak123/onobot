import {
  ChannelsInfoArguments,
  ChatPostMessageArguments,
  DialogOpenArguments,
  UsersInfoArguments,
  WebAPICallResult,
  WebClient,
} from "@slack/client";

const client = new WebClient(process.env.OAUTH_ACCESS_TOKEN);

interface IUserListResult extends WebAPICallResult {
  members: any[];
}

const getAllUsers = async () => {
  const userList = (await client.users.list()) as IUserListResult;
  return userList.members;
};

const fetchUserInfo = (user: string) => client.users.info({ user }) as any;

const fetchChannelInfo = (channel: string) => client.channels.info({ channel, scopes: ["identify"] }) as any;

const postMessage = ({ channel, text }: ChatPostMessageArguments) =>
  client.chat.postMessage({ channel, text, as_user: false });

const postDialog = ({ trigger_id, dialog }: DialogOpenArguments) =>
  // tslint:disable-next-line
  client.dialog.open({ trigger_id, dialog }).catch((e) => console.log(e.data));

export default {
  getAllUsers,
  fetchUserInfo,
  fetchChannelInfo,
  postMessage,
  postDialog,
};
