import React, { Component } from 'react';
import Map from './components/Map'
import './App.css';
import options from './data/options.json';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: options['pop_tot'],
      colors: this.coroplethColors
    };
  }

  render() {
    return (
      <div className="App">
        <Map active={this.state.active}/>
      </div>
    );
  }
}

export default App;
