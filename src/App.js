import React, { Component } from 'react';
import Map from './components/Map'
import './App.css';


const options = [{
  name: 'Population_stovner',
  description: 'Total population',
  property: 'pop_tot',
  maxVal: 10000,
  intervals: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000], 

},{
  name: 'Population',
  description: 'Male population',
  property: 'pop_mal',
  maxVal: 5000,
  intervals: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
}]


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: options[1],
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
