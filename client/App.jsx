import React from 'react';
import axios from 'axios';

import MessageList from './MessageList/MessageList';

class App extends React.Component {
  tempMethod = message => axios.post('/', { event: message });

  render() {
    return (
      <div>
        <MessageList onMessageClick={this.tempMethod}/>
      </div>
    );
  }
}

export default App;
