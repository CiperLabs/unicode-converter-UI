import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Uploader from './components/Uploader.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to University of Moratuwa Unicode Converter</h1>
        </header>
        <Uploader/>
      </div>
    );
  }
}

export default App;
