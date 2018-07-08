import React, { Component } from 'react';
import Map from './components/Map'
import './App.css';

const options = [{
  name: 'Population_stovner',
  description: 'Total population',
  property: 'pop_tot',
  stops: [
    [0, '#f8d5cc'],
    [1000, '#f4bfb6'],
    [2000, '#f1a8a5'],
    [3000, '#ee8f9a'],
    [4000, '#ec739b'],
    [5000, '#dd5ca8'],
    [6000, '#c44cc0'],
    [7000, '#9f43d7'],
    [8000, '#6e40e6']
  ]
},{
  name: 'Population',
  description: 'Male population',
  property: 'pop_mal',
  stops: [
    [0, '#f8d5cc'],
    [500, '#f4bfb6'],
    [1000, '#f1a8a5'],
    [1500, '#ee8f9a'],
    [2000, '#ec739b'],
    [2500, '#dd5ca8'],
    [3000, '#c44cc0'],
    [3500, '#9f43d7'],
    [4000, '#6e40e6']
  ]
}]


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: options[0]
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
