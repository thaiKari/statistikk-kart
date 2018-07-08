import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import data from './../data/stovner.json'
import Legend from './Legend'
import PitchToggle from './PitchToggle/pitchtogglecontrol.js'
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';




class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colors: ['#f8d5cc', '#f4bfb6', '#f1a8a5', '#ee8f9a', '#ec739b', '#dd5ca8',  '#c44cc0', '#9f43d7', '#6e40e6' ]
    };
  }

  generateStops(){
    var stops = [];
    let colors = this.state.colors;
    for (var i = 0; i < colors.length ; i++ ){
      stops.push([this.props.active.intervals[i], colors[i]]);
    }
    console.log(stops);
    return stops;
  }

  componentDidMount() {
    this.setState({stops: this.generateStops()});
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
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
            property: this.props.active.property,
            stops: this.state.stops,
          },
          'fill-extrusion-opacity': 0.8
        }
      },); 

      this.getHeight();
    });

    this.map.addControl(new PitchToggle({minpitchzoom: 11})); 

    this.map.on('rotate', () =>{
      if(this.map.getPitch() > 25 ) {
        this.map.setPaintProperty('countries', 'fill-extrusion-height', this.getHeight());
      } else {
        this.map.setPaintProperty('countries', 'fill-extrusion-height',0 );
      }
    });
  }

  getHeight() {
    let heightProperty = this.props.active.property;
    let maxVal = this.props.active.maxVal;
    console.log(maxVal);
    let allFeatures = data.features;
    const stops = [];

    Object.keys(allFeatures).forEach(id => {
      
      const value = allFeatures[id].properties[this.props.active.property];

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

    return height;
  }

  render() {
    return (
      <div className="Map">
        <Legend active={this.props.active} colors={this.state.colors}/>
        <div ref={el => this.mapContainer = el} className="map" id='map'/>
      </div>
    );
  }
}

export default Map;
