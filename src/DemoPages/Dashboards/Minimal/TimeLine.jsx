import React, {Component} from 'react';
import Chart from 'react-apexcharts'

class TimeLine extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          
            series: [
              {
                name: 'Bob',
                data: [
                  {
                    x: 'Normal',
                    y: [
                      new Date('2015-03-05 00:05').getTime(),
                      new Date('2015-03-05 00:30').getTime(),
                    ],
                  },
                  
                  {
                    x: 'Justificado',
                    y: [
                        new Date('2015-03-05 00:30').getTime(),
                        new Date('2015-03-05 01:05').getTime(),
                    ]
                  },
                  {
                    x: 'Por Justificar',
                    y: [
                        new Date('2015-03-05 01:05').getTime(),
                        new Date('2015-03-05 01:10').getTime(),
                    ],
                  },
                  {
                    x: 'Normal',
                    y: [
                      new Date('2015-03-05 01:05').getTime(),
                      new Date('2015-03-05 01:30').getTime(),
                    ],
                  },
                  
                ]
              },
            ],
            options: {
                
              chart: {
                height: 300,
                type: 'rangeBar'
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  barHeight: '80%'
                }
              },
              xaxis: {
                type: 'datetime',
                min: new Date('2015-03-05 00:05').getTime()
                
              },
              stroke: {
                width: 1
              },
              fill: {
                type: 'solid',
                opacity: 0.6
              },
              legend: {
                position: 'top',
                horizontalAlign: 'left'
              }
            },
          
          
          };
        }

    render() {

        return (
            <div className="chart">
                <Chart 
                options={this.state.options} 
                series={this.state.series} 
                type="rangeBar" 
                width="100%"
                height={300}
                />
            </div>
        );
    }
}

export default TimeLine;
