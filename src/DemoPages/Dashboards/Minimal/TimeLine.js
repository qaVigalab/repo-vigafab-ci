
import React,{useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";

const TimeLine = (props) => {

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
    
    const [infoData, setTInfoData] = useState()
    const [series2, setSeries2] = useState([])
    const [options2, setOptions2] = useState(

      {

        dataLabels: labels,
        markers: markers,
        tooltip: tooltips,

        chart: {
          type: 'rangeBar',
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
          labels: {
            
        }
        },

        grid: {
          row: {
            colors: ['#f3f4f5', '#fff'],
            opacity: 1
          }
        }
      }
    )
    
    
    useEffect(() => {
      setTimeout(() => {
        loadTimeLine()
    }, 2000);
  }, [])

  useEffect(() => {
    loadTimeLine()
  }, [props.id_orden]);


  

 const loadTimeLine = () =>  {

    fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/gettimelinesku", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({
        id_orden: localStorage.getItem("id_orden")
      }),
    })
      .then((response) => response.json())
      .then((r) => {
        let fecha_final = (new Date().getTime()-10800000) //menos 3 horas

        var objeto = {};
        var objetos = [
          {
            x: 'En Producción',
            y: [new Date(r[0].fecha_inicio).getTime()-2,
            new Date(r[0].fecha_inicio).getTime()-1],
            fillColor: '#2264A7'
          },
          {
            x: 'En Paro',
            y: [new Date(r[0].fecha_inicio).getTime()-1,
            new Date(r[0].fecha_inicio).getTime()],
            fillColor: '#F7431E'
          }
        ];
        for (let i = 0; i < r.length; i++) {
            objeto = {
              x: r[i].id_tipo_reporte == 1 ? 'En Producción' : 'En Paro' ,
              y: [
                new Date(r[i].fecha_inicio).getTime(),
                  new Date(r[i].fecha_termino).getTime()
              ],
              fillColor: r[i].id_tipo_reporte == 1 ? '#2264A7' : '#F7431E'
            }
            objetos.push(objeto)
            if (i == r.length - 1) {
              if (localStorage.getItem("id_ordenA") === localStorage.getItem("id_orden")){
                objeto = {
                  x: r[i].id_tipo_reporte == 2 ? 'En Producción' : 'En Paro' ,
                  y: [
                    new Date(r[i].fecha_termino).getTime(),
                    new Date().getTime()-10800000, //menos 3 horas
                  ],
                  fillColor: r[i].id_tipo_reporte == 2 ? '#2264A7' : '#F7431E'
                  
                }
                objetos.push(objeto)
              }
  
            }
          
          
        }
        setSeries2([{
          data:objetos
      }]);
      })

      .catch((err) => {
        console.error(err);
      });
  }

    return (


      <div id="chart">
        <ReactApexChart options={options2} series={series2} type="rangeBar" height={250} />

      </div>




    );
  }

  const mapStateToProps = (state) => ({
    id_orden: state.dashboardReducers.id_orden,
  });
  
  export default connect(mapStateToProps)(TimeLine);