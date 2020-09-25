import React, {Component} from 'react';
import Chart from 'react-apexcharts'

class Gauge extends Component {
    
    
    constructor(props) {
        super(props);
        const meta=500;
        this.state = {
            options2: {
                chart: {
                    height: 280,
                    type: "radialBar",
                  },
                  series: [67],
                  colors: ["#20E647"],
                  plotOptions: {
                    radialBar: {
                      startAngle: -90,
                      endAngle: 90,
                      track: {
                        background: '#333',
                        startAngle: -90,
                        endAngle: 90,
                      },
                      dataLabels: {
                        name: {
                          show: false,
                        },
                        value: {
                          fontSize: "30px",
                          show: true
                        }
                      }
                    }
                  }
            },
            
            series2: [67],
        }
    }

    render() {

        return (
            <div className="bar">
                <Chart 
                options={this.state.options2} 
                series={this.state.series2} 
                type="line" 
                width="100%"
                height="100%"
                />
            </div>
        );
    }
}

export default Gauge;