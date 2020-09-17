import React, {Component} from 'react';
import Chart from 'react-apexcharts'

class Line extends Component {

    constructor(props) {
        super(props);
        const meta=500;
        this.state = {
            options2: {
                stroke:{
                    show: true,
                    width: 1,
                },
                
                chart: {
                    id: 'DetalleAvanzadoPorKilo'
                },
                dataLabels: {
                    enabled: false,
                    
                },
                plotOptions: {
                    bar: {
                        columnWidth: '95%',
                        horizontal: false,
                        colors: {
                            ranges: [{
                              from: meta/2,
                              to: meta,
                              color: '#feb019'
                            }, {
                              from: 0,
                              to: meta/2,
                              color: '#ff4560'
                            },
                            {
                                from: meta,
                                to: meta * 10,
                                color: '#31cc54'
                              }]}
                    }
                },
                xaxis: {
                    categories: [
                    '07:00 - 07:05', 
                    '07:05 - 07:10', 
                    '07:10 - 07:15', 
                    '07:15 - 07:20', 
                    '07:20 - 07:25', 
                    '07:25 - 07:30', 
                    '07:30 - 07:35', 
                    '07:35 - 07:40',
                    '07:40 - 07:45', 
                    '07:45 - 07:50', 
                    '07:50 - 07:55', 
                    '07:55 - 08:00'
                    ],
                    labels:{
                        show:true,
                        rotate:-45
                    }
                },
                
            },
            
            series2: [{
               
                name: 'Kg',
                type: 'column',
                data: [
                    50, 
                    505, 
                    414, 
                    671, 
                    227, 
                    413, 
                    201, 
                    352, 
                    752, 
                    320, 
                    257, 
                    160]
              }, {
                name: 'Meta',
                type: 'line',
                data: [
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta, 
                    meta
                ]
              }],
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
                height="300px"
                />
            </div>
        );
    }
}

export default Line;