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
      //active: options[0]
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
            property: this.props.active.property,
            stops: this.props.active.stops,
          },
          'fill-extrusion-opacity': 0.8
        }
      },); // ID metches `mapbox/streets-v9`

      //this.setFill();
      this.getHeight();
    });

    this.map.addControl(new PitchToggle({minpitchzoom: 11})); 

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
    let heightProperty = this.props.active.property;
    let maxVal = data.maxVals[heightProperty];
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

    console.log(height);

    return height;
  }

  setFill() {
    const { property, stops } = this.props.active;
    this.map.setPaintProperty('countries', 'fill-color', {
      property,
      stops
    });    
  }

  render() {
    return (
      <div className="Map">
        <Legend active={this.props.active}/>
        <div ref={el => this.mapContainer = el} className="map" id='map'/>
      </div>
    );
  }
}

export default Map;
