import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';

const TimeLineOperativo = (props) => {
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

  useEffect(() => {
    var objeto = {}
    var dataParo = [], dataProd = [], dataCambio = [];
    for (let i = 0; i < props.reportesSelected.length; i++) {
      objeto = {
        x: props.reportesSelected[i].maquina,
        y: [
          new Date(props.reportesSelected[i].hora_inicio).getTime(),
          new Date(props.reportesSelected[i].hora_termino).getTime()
        ],
      }
      
      if (props.reportesSelected[i].id_tipo === 1) {
        dataParo.push(objeto);
      } else if (props.reportesSelected[i].id_tipo === 2) {
        dataProd.push(objeto);
      } else if (props.reportesSelected[i].id_tipo === 4) {
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
  },[props.reportesSelected]);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="rangeBar" height={350} />
    </div>
  );
}

export default TimeLineOperativo;