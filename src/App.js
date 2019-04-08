import React, { Component } from 'react';
import { Router } from "@reach/router";
import './App.css';

import Header from "./components/Header";
import NewsDisplay from "./components/NewsDisplay";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <NewsDisplay path="/" >
            <NewsDisplay path=":category" />
          </NewsDisplay>
        </Router>
      </div >
    );
  }
}

export default App;
