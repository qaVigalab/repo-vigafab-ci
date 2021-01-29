import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const TimeLineOperativo = () => {

  const [series, setSeries] = useState([

  ])

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'rangeBar'
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
        rangeBarGroupRows: true
      }
    },
    colors: [
      "#F7431E", "#2264A7"
    ],
    
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
  })


  const loadData = () => {
    fetch(global.api.dashboard.gettimelineoperativo, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({

      }),
    })
      .then(response => response.json())
      .then(r => {
        var objeto = {}
        var dataParo = []
        var dataProd = []
        for (let i = 0; i < r.length; i++) {

          objeto = {
            x: r[i].maquina,
            y: [
              new Date(r[i].hora_inicio).getTime(),
              new Date(r[i].hora_termino).getTime()
            ],
          }
          r[i].id_tipo === 1 ? dataParo.push(objeto) : dataProd.push(objeto)
        }
        setSeries([
          {
            name: 'Paro',
            data: dataParo
          },
          
          {
            name: 'Produciendo',
            data: dataProd
          },
        ])
      }
      )
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    loadData()
  }, []);


  return (
    <div id="chart">
      <Chart options={options} series={series} type="rangeBar" height={350} />
    </div>
  );
}


export default TimeLineOperativo;