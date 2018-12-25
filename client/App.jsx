import React from 'react';

class App extends React.Component {
  tempMethod = () => console.log('hello');

  render() {
    return (
      <div onClick={this.tempMethod}>Hello</div>
    );
  }
}

export default App;
