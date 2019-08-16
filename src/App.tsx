import Quotas from './components/Quotas';
import './App.css';
import logo from './logo.svg';

import React, { Component } from 'react'

interface Props {
  
}
interface State {
  
}

export default class App extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Quotas/>
          </p>          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
