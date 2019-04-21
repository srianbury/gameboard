import React, { Component } from 'react';
import Start from './Components/Start';


class App extends Component {
  render(){
    const gameId = this.props.location.state==null ? null : this.props.location.state.gameId;
    return(
      <div className='container'>
        <div style={{marginTop:'2em'}}>{/*spacer*/}</div>
        <Start 
          gameId={gameId} />
      </div>
    );
  }
}

export default App;
