import React, { Component } from 'react';
import './App.css';
import BuyTicket from "./container/BuyTicket";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">活动报名</h1>
        </header>
        <div className="App-content">
            <BuyTicket />
        </div>
      </div>
    );
  }
}

export default App;
