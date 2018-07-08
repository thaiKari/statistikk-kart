import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import data from './../data/stovner.json'
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


const options = [{
  name: 'Population_stovner',
  description: 'Estimated total population',
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
    [10000, '#6e40e6']
  ]
},{
  name: 'Population',
  description: 'Estimated total population',
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

class Map extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      active: options[0]
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      //center: [5, 34],
      //zoom: 1.5
      center: [10.924519, 59.962828],
      zoom: 11
    });

    this.map.on('load', () => {
      this.map.addSource('countries', {
        type: 'geojson',
        data
      });

      this.map.addLayer({
        id: 'countries',
        type: 'fill-extrusion',
        source: 'countries',
        paint: {
          'fill-extrusion-color':{
            property: this.state.active.property,
            stops: this.state.active.stops
          },
        }
      },); // ID metches `mapbox/streets-v9`

      //this.setFill();
      this.getHeight();
    });

    this.map.on('rotate', () =>{
      if(this.map.getPitch() > 25 ) {
        this.map.setPaintProperty('countries', 'fill-extrusion-height', this.getHeight()
        /*{
          type: 'identity',
          property: this.state.active.property
        }*/);
      } else {
        this.map.setPaintProperty('countries', 'fill-extrusion-height',0 );
      }
    });
  }

  getHeight() {
    let heightProperty = this.state.active.property;
    let maxVal = data.maxVals[heightProperty];
    console.log(maxVal);
    let allFeatures = data.features;
    const stops = [];

    Object.keys(allFeatures).forEach(id => {
      const value = allFeatures[id].properties.pop_tot;

      if (value !== null) {
        let normValue = value * 1000 / maxVal;
        stops.push([value, normValue]);
      }
    });

    let height = {
      property: heightProperty,
      default: 0,
      type: "categorical",
      stops: stops
    };

    console.log(height);

    return height;
  }

  setFill() {
    const { property, stops } = this.state.active;
    this.map.setPaintProperty('countries', 'fill-color', {
      property,
      stops
    });    
  }

  render() {
    return (
      <div className="Map">
        <div ref={el => this.mapContainer = el} className="map" id='map'/>
      </div>
    );
  }
}

export default Map;
