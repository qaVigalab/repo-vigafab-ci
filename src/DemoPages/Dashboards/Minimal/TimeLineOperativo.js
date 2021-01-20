import React, { Component } from "react";
import Chart from "react-apexcharts";

class TimeLineOperativo extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [
        // George Washington
        {
          name: 'Paro',
          data: [
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 00:00:00").getTime(),
                new Date("2021-01-20 01:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 02:00:00").getTime(),
                new Date("2021-01-20 03:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 04:00:00").getTime(),
                new Date("2021-01-20 05:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 06:00:00").getTime(),
                new Date("2021-01-20 07:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 08:00:00").getTime(),
                new Date("2021-01-20 09:00:00").getTime()
              ]
            },
            
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 00:00:00").getTime(),
                new Date("2021-01-20 01:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 02:00:00").getTime(),
                new Date("2021-01-20 03:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 04:00:00").getTime(),
                new Date("2021-01-20 05:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 06:00:00").getTime(),
                new Date("2021-01-20 07:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 08:00:00").getTime(),
                new Date("2021-01-20 09:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 00:00:00").getTime(),
                new Date("2021-01-20 01:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 02:00:00").getTime(),
                new Date("2021-01-20 03:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 04:00:00").getTime(),
                new Date("2021-01-20 05:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 06:00:00").getTime(),
                new Date("2021-01-20 07:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 08:00:00").getTime(),
                new Date("2021-01-20 09:00:00").getTime()
              ]
            },
          ]
        },
        // John Adams
        {
          name: 'Produciendo',
          data: [
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 01:00:00").getTime(),
                new Date("2021-01-20 02:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 03:00:00").getTime(),
                new Date("2021-01-20 04:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 05:00:00").getTime(),
                new Date("2021-01-20 06:00:00").getTime()
              ]
            },
            {
              x: 'Formadora',
              y: [
                new Date("2021-01-20 07:00:00").getTime(),
                new Date("2021-01-20 08:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 01:00:00").getTime(),
                new Date("2021-01-20 02:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 03:00:00").getTime(),
                new Date("2021-01-20 04:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 05:00:00").getTime(),
                new Date("2021-01-20 06:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 3',
              y: [
                new Date("2021-01-20 07:00:00").getTime(),
                new Date("2021-01-20 08:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 01:00:00").getTime(),
                new Date("2021-01-20 02:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 03:00:00").getTime(),
                new Date("2021-01-20 04:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 05:00:00").getTime(),
                new Date("2021-01-20 06:00:00").getTime()
              ]
            },
            {
              x: 'Envasadora 4',
              y: [
                new Date("2021-01-20 07:00:00").getTime(),
                new Date("2021-01-20 08:00:00").getTime()
              ]
            },
          ]
        },
  
      ],
      options: {
        chart: {
          height: 350,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '50%',
            rangeBarGroupRows: true
          }
        },
        colors: [
          "#F7431E", "#2264A7"
        ],
        fill: {
          type: 'solid'
        },
        xaxis: {
          type: 'datetime'
        },
        legend: {
          position: 'right'
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
    
          },
        }
      },
    
    
    };
  }

  render() {
    return (
      <div id="chart">
  <Chart options={this.state.options} series={this.state.series} type="rangeBar" height={350} />
</div>
    );
  }
}

export default TimeLineOperativo;