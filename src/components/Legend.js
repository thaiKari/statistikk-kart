import React, { Component } from 'react';
import './legend.css'

class Legend extends Component {

  render() {

    console.log('drwn lgnd');
    var stops = this.props.active.stops;
    console.log(stops);
    var legendStops = [];

    var prevStop = -1;
    var prevColor;

    for ( var i = 0; i < stops.length; i++ ) {
        if ( prevStop >= 0 && prevColor) {
            var text = prevStop + ' - ' + stops[i][0];
            legendStops.push([text, prevColor]);
        }

        prevStop = stops[i][0];
        prevColor = stops[i][1];

    }


    text =  prevStop + ' + ';
    legendStops.push([text, prevColor]);
    console.log("legendStops", legendStops);

    let legendItems = legendStops.map( stop => {
        var color = stop[1];
        var text = stop[0];
        var divStyle = {
            backgroundColor: color,
          };
        return (
            <div style={divStyle} className="legendItem"> <p>{text}</p> </div>
        );
    });    

    return (
      <div className="legend" id="legend">
        <h3>{this.props.active.description}</h3> 
            {legendItems}
      </div>
    );
  }
}

export default Legend;
