import React from 'react';

// Data
import testMessages from '../testMessages';

class App extends React.Component {
  constructor() {
    super();
    this.messageKeys = Object.keys(testMessages);
  }

  tempMethod = () => console.log('hello');

  render() {
    return (
      <div>
        <ul>
          {this.messageKeys.map((key) => {
            /* eslint-disable camelcase */
            const { client_msg_id } = testMessages[key];
            return (
              <li key={client_msg_id}>{key}</li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
