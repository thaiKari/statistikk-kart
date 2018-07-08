import React, { Component } from 'react';
import './legend.css'

class Legend extends Component {

  render() {

    var legendStops = [];
    
    if(this.props.colors){
            console.log('drwn lgnd');
    let colors = this.props.colors;
    console.log(colors);
    let intervals = this.props.active.intervals;
    


    for ( var i = 0; i < colors.length; i++ ) {
        var text
        if ( i < colors.length -1) {
            text = intervals[i] + ' - ' + intervals[i + 1];
        }else {
            text = intervals[i] + ' +';
        }

        legendStops.push([text, colors[i]]);

    }
    }




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
