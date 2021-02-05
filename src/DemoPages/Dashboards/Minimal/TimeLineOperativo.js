import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const TimeLineOperativo = () => {
  const [series, setSeries] = useState([])
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
      "#F7431E", "#2264A7", '#02c39a'
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

  const [estadoMaquinas, setEstadoMaquinas] = useState([1, 1, 1, 1, 1, 1]);

  const loadData = () => {
    fetch(global.api.dashboard.gettimelineoperativo, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(r => {
        var objeto = {}
        var dataParo = [], dataProd = [], dataCambio = [];
        for (let i = 0; i < r.length; i++) {
          objeto = {
            x: r[i].maquina,
            y: [
              new Date(r[i].hora_inicio).getTime(),
              new Date(r[i].hora_termino).getTime()
            ],
          }
          
          if (r[i].id_tipo === 1) {
            dataParo.push(objeto);
          } else if (r[i].id_tipo === 2) {
            dataProd.push(objeto);
          } else if (r[i].id_tipo === 4) {
            dataCambio.push(objeto)
          }
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
          {
            name: 'Cambiando formato',
            data: dataCambio
          },
        ])
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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