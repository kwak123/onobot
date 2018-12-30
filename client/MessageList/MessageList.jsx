import React from 'react';

const MessageList = ({ messageList, onMessageClick }) => {
  const messageKeys = Object.keys(messageList);
  return (
    <ul className='message-list__container'>
      {messageKeys.map((key) => {
        /* eslint-disable camelcase */
        const message = messageList[key];
        const { client_msg_id } = message;

        return (
          <li key={client_msg_id}>
            <span>{key}</span>
            <button onClick={() => onMessageClick(message)}>Dispatch</button>
          </li>
        );
      })}
    </ul>
  );
};

export default MessageList;
