import React, { Component } from 'react';
import ReactCoffeeGauge from 'react-coffee-gauge';
 
class Gauge extends Component {
    render() {
        var gauge_opts = {
          angle: 0, // The span of the gauge arc
          radiusScale: 1, // Relative radius
          pointer: {
            length: 0.5, // // Relative to gauge radius
            strokeWidth: 0.024, // The thickness
            color: '#000000' // Fill color
          },
          renderTicks: {
              divisions: 5,
              divWidth: 0.8,
              divLength: 0.7,
              divColor: '#333333',
              subDivisions: 3,
              subLength: 0.5,
              subWidth: 0.6,
              subColor: '#666666'
          },
          lineWidth: 0.15,
          limitMax: false,     // If false, max value increases automatically if value > maxValue
          limitMin: false,     // If true, the min value of the gauge will be fixed
          colorStart: '#6FADCF',   // Colors
          colorStop: '#8FC0DA',    // just experiment with them
          strokeColor: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]],  // to see which ones work best for you
          generateGradient: true,
          highDpiSupport: true,     // High resolution support
          staticZones: [
                {strokeStyle: "#F03E3E", min: 0, max: 200}, // Red from 100 to 130
                {strokeStyle: "#30B32D", min: 200, max: 900}, // Green
                {strokeStyle: "#FFDD00", min: 900, max: 1000}, // Yellow
          ]
        };
        return (
            <ReactCoffeeGauge
                min="0"
                max="1000"
                value="600"
                opts={gauge_opts}
            />
        );
    }
}
 
export default Gauge;