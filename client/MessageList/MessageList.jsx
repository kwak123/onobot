import React from 'react';

import testMessages from '../../testMessages';

const MessageList = ({ onMessageClick }) => {
  const messageKeys = Object.keys(testMessages);
  return (
    <ul className='message-list__container'>
      {messageKeys.map((key) => {
        /* eslint-disable camelcase */
        const message = testMessages[key];
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
