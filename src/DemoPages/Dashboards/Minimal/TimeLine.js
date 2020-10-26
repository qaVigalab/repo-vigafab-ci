
import React from "react";
import ReactApexChart from "react-apexcharts";

class TimeLine extends React.Component {
  constructor(props) {
    super(props);

    var objeto;
    var objeto_anterior;
    const labels = {
      enabled: false
    };


    const markers = {
      size: 0
    };

    const tooltips = {

      x: {
        format: 'dd/MM/yy HH:mm',

      },
      y: {
        formatter: undefined,
        title: {
          formatter: '',
        },
      },
    };


    this.state =
    {
      dataBD: [],
      infoData: true,

      series2: [{

        data: [
          {
            x: 'En Paro',
            y: [
              new Date('2019-02-27').getTime()
            ],
            fillColor: '#008FFB'
          },
          {
            x: 'Produciendo',
            y: [
              new Date('2019-03-04').getTime()
            ],
            fillColor: '#00E396'
          },

          {
            x: 'En Paro',
            y: [
              new Date('2019-03-10').getTime()
            ],
            fillColor: '#008FFB'
          },
          {
            x: 'Produciendo',
            y: [
              new Date('2019-03-14').getTime()
            ],
            fillColor: '#00E396'
          },
          {
            x: 'En Paro',
            y: [
              new Date('2019-03-18').getTime(),
              new Date('2019-03-24').getTime()
            ],
            fillColor: '#008FFB'
          }

        ]
      }],

      options2: {

        dataLabels: labels,
        markers: markers,
        tooltip: tooltips,

        chart: {
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: false,
            dataLabels: {
              hideOverflowingLabels: false
            }
          }
        },

        xaxis: {
          type: 'datetime',

        },

        grid: {
          row: {
            colors: ['#f3f4f5', '#fff'],
            opacity: 1
          }
        }
      },

    }

  }

  /*loadTimeLine(){
    fetch(
      "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getproducto",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
        },
        body: false,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        //this.setState({ productos: result });
        result.map(r => (
          objeto={
            x: r.id_tipo_reporte == 1 ? 'En Paro' : 'En Producción',
            y: [
              r.fecha,
              new Date('2019-03-04').getTime()
            ],
            fillColor: '#008FFB'
          }
        )

          )

      })
      .catch((err) => {
        console.error(err);
      });
  }*/



  render() {
    return (


      <div id="chart">
        <ReactApexChart options={this.state.options2} series={this.state.series2} type="rangeBar" height={250} />

      </div>




    );
  }
}

export default TimeLine;