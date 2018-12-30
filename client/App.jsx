import React from 'react';
import axios from 'axios';

import MessageList from './MessageList/MessageList';

import testMessages from '../testMessages';

class App extends React.Component {
  tempMethod = message => axios.post('/', { event: message });

  slashCall = message => axios.post('/command', message);

  render() {
    return (
      <div>
        <MessageList
          messageList={testMessages.messages}
          onMessageClick={this.tempMethod}
        />
        <MessageList
          messageList={testMessages.slashCommands}
          onMessageClick={this.slashCall}
        />
      </div>
    );
  }
}

export default App;
