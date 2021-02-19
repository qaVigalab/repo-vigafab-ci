import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button, Col, Card, Table, Row } from "reactstrap";
import _ from "lodash";
import moment from 'moment'
import Circle from "react-circle";
import icono1 from "./images/icono1.png";
import icono2 from "./images/icono2.png";
import icono3 from "./images/icono3.png";
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import Brightness1Icon from "@material-ui/icons/Brightness1";

function FullSceen() {
  const handle = useFullScreenHandle();
  const [dataTortaFor, setDataTortaFor] = useState(
    {
      labels: [
        "Desconectado",
        "Paro sin Justificar",
        "Producción",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7 ",
          ],
        },
      ],
    }
  )
  const [dataTortaEnv3, setDataTortaEnv3] = useState(
    {
      labels: [
        "Desconectado",
        "Paro sin Justificar",
        "Producción",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7 ",
          ],
        },
      ],
    }
  )
  const [dataTortaEnv4, setDataTortaEnv4] = useState(
    {
      labels: [
        "Desconectado",
        "Paro sin Justificar",
        "Producción",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7 ",
          ],
        },
      ],
    }
  )
  const [dataTortaEnv5, setDataTortaEnv5] = useState(
    {
      labels: [
        "Desconectado",
        "Paro sin Justificar",
        "Producción",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7 ",
          ],
        },
      ],
    }
  )
  const [dataTortaEnv6, setDataTortaEnv6] = useState(
    {
      labels: [
        "Desconectado",
        "Paro sin Justificar",
        "Producción",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7 ",
          ],
        },
      ],
    }
  )
  const [dataTortaEmp, setDataTortaEmp] = useState(
    {
      labels: [
        "Desconectado",
        "Paro sin Justificar",
        "Producción",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#2264A7 ",
          ],
        },
      ],
    }
  )

  const [calidad, setCalidad] = useState(0)
  const [eficiencia, setEficiencia] = useState(0)
  const [disponibilidad, setDisponibilidad] = useState(0)

  var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
      num += '';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
      }
      return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
      this.simbol = simbol || '';
      return this.formatear(num);
    }
  }

  const formatHour = (min) => {
    let horas = min / 60;
    horas = Math.trunc(horas)
    let minutos = min - (60 * horas)
    return horas === 0 ? minutos + " Min" : horas + " Hrs " + minutos + " Min"
  }

  const [tiempoOrden, setTiempoOrden] = useState("00:00");
  const [reportesSelected, setReportesSelected] = useState([]);
  const loadReportes = () => {
    fetch(global.api.dashboard.getReportesByOrden, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({
        id_orden: ordenSelected.id_sub_orden
      }),
    })
    .then(response => response.json())
    .then(r => {
      var reportesSel = r.filter(rep => !rep.hora_inicio.includes('05:55') && rep.id_sub_orden === ordenSelected.id_sub_orden && rep.id_tipo != 4);
      
      /* Se settea el tiempo de producción de la orden en curso */
      const startMoment = moment(reportesSel[0].hora_inicio);
      const endMoment = moment(reportesSel[reportesSel.length-1].hora_termino);
      const diff = endMoment.diff(startMoment);
      const diffDuration = moment.duration(diff);

      var hours = 0, minutes = 0;
      if (diffDuration.hours() === 0){
        hours = "00:"
      } else if (diffDuration.hours() < 10){
        hours = "0" + diffDuration.hours() + ":"
      } else{
        hours = diffDuration.hours() + ":"
      }

      if (diffDuration.minutes() === 0){
        minutes = "00"
      } else if (diffDuration.minutes() < 10){
        minutes = "0" + diffDuration.minutes()
      } else{
        minutes = diffDuration.minutes()
      }
      setTiempoOrden(hours + minutes);

      setReportesSelected(r);
    })
    .catch(err => {
      console.error(err);
    });
  }

  /* Se crean las variables para cálculo de Disponibilidad, Eficiencia, Calidad y OEE. Así como también las que representan a la orden en curso en cada máquina. */
  const [disponibilidadFormadora, setDisponibilidadFormadora] = useState(0);
  const [disponibilidadEnvasadoras, setDisponibilidadEnvasadoras] = useState(0);
  const [disponibilidadEmpaquetadora, setDisponibilidadEmpaquetadora] = useState(0);

  const [eficienciaFormadora, setEficienciaFormadora] = useState(0);
  const [eficienciaEnvasadoras, setEficienciaEnvasadoras] = useState(0);
  const [eficienciaEmpaquetadora, setEficienciaEmpaquetadora] = useState(0);

  const [ordenActivaFormadora, setOrdenActivaFormadora] = useState({});
  const [ordenActivaEnvasadoras, setOrdenActivaEnvasadoras] = useState({});
  const [ordenActivaEmpaquetadora, setOrdenActivaEmpaquetadora] = useState({});

  const [tActivoFormadora, setTActivoFormadora] = useState(0);
  const [tActivoEnvasadora3, setTActivoEnvasadora3] = useState(0);
  const [tActivoEnvasadora4, setTActivoEnvasadora4] = useState(0);
  const [tActivoEnvasadora5, setTActivoEnvasadora5] = useState(0);
  const [tActivoEnvasadora6, setTActivoEnvasadora6] = useState(0);
  const [tActivoEmpaquetadora, setTActivoEmpaquetadora] = useState(0);

  const [tInactivoFormadora, setTInactivoFormadora] = useState(0);
  const [tInactivoEnvasadora3, setTInactivoEnvasadora3] = useState(0);
  const [tInactivoEnvasadora4, setTInactivoEnvasadora4] = useState(0);
  const [tInactivoEnvasadora5, setTInactivoEnvasadora5] = useState(0);
  const [tInactivoEnvasadora6, setTInactivoEnvasadora6] = useState(0);
  const [tInactivoEmpaquetadora, setTInactivoEmpaquetadora] = useState(0);

  useEffect(() => {
    var t_activo_formadora = 0, t_activo_envasadoras = 0, t_activo_empaquetadora = 0;
    var t_inactivo_formadora = 0, t_inactivo_envasadoras = 0, t_inactivo_empaquetadora = 0;
    var t_activo_env3 = 0, t_activo_env4 = 0, t_activo_env5 = 0, t_activo_env6 = 0;
    var t_inactivo_env3 = 0, t_inactivo_env4 = 0, t_inactivo_env5 = 0, t_inactivo_env6 = 0;

    if (reportesSelected.length > 0){
      var reportesSel = reportesSelected.filter(rep => !rep.hora_inicio.includes('05:55'));
      for (var i=0; i<reportesSel.length; i++){
          const startDate = moment(reportesSel[i].hora_inicio);
          const timeEnd = moment(reportesSel[i].hora_termino);
          const diff = timeEnd.diff(startDate);
          const diffDuration = moment.duration(diff);

          if (reportesSel[i].id_tipo === 1){
              if (reportesSel[i].id_tipo_vibot === 2)
                  t_inactivo_formadora += diffDuration.hours()*60 + diffDuration.minutes();
              else if (reportesSel[i].id_tipo_vibot === 4){
                if (reportesSel[i].id_vibot != 34828){
                  t_inactivo_envasadoras += diffDuration.hours()*60 + diffDuration.minutes();

                  if (reportesSel[i].id_vibot === 23608)
                    t_inactivo_env4 += diffDuration.hours()*60 + diffDuration.minutes();
                  else if (reportesSel[i].id_vibot === 30776)
                    t_inactivo_env5 += diffDuration.hours()*60 + diffDuration.minutes();
                  else if (reportesSel[i].id_vibot === 32818)
                    t_inactivo_env6 += diffDuration.hours()*60 + diffDuration.minutes();
                } else {
                  t_inactivo_env3 += diffDuration.hours()*60 + diffDuration.minutes();
                }
              }
              else if (reportesSel[i].id_tipo_vibot === 5)
                  t_inactivo_empaquetadora += diffDuration.hours()*60 + diffDuration.minutes();
          }
          else if (reportesSel[i].id_tipo === 2)
              if (reportesSel[i].id_tipo_vibot === 2)
                  t_activo_formadora += diffDuration.hours()*60 + diffDuration.minutes();
              else if (reportesSel[i].id_tipo_vibot === 4){
                t_activo_envasadoras += diffDuration.hours()*60 + diffDuration.minutes();

                if (reportesSel[i].id_vibot === 34828)
                  t_activo_env3 += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_vibot === 23608)
                  t_activo_env4 += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_vibot === 30776)
                  t_activo_env5 += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_vibot === 32818)
                  t_activo_env6 += diffDuration.hours()*60 + diffDuration.minutes();
              }
              else if (reportesSel[i].id_tipo_vibot === 5)
                  t_activo_empaquetadora += diffDuration.hours()*60 + diffDuration.minutes();
      }

      /* Se actualiza las métricas de la Formadora */
      setDisponibilidadFormadora(
          isNaN(t_activo_formadora/(t_activo_formadora+t_inactivo_formadora)) ? 0 :
          t_activo_formadora/(t_activo_formadora+t_inactivo_formadora) * 100
      );

      setEficienciaFormadora(
          isNaN(ordenSelected.kg_formados/(ordenSelected.kg_hora * ((t_activo_formadora+t_inactivo_formadora)/60))) ? 0 :
          ordenSelected.kg_formados/(ordenSelected.kg_hora * ((t_activo_formadora+t_inactivo_formadora)/60)) * 100
      );

      var repsFor = reportesSel.filter(r => r.id_tipo_vibot === 2);
      var subOrd = repsFor[repsFor.length-1].id_sub_orden;
      setOrdenActivaFormadora(ordenes.find(ord => ord.id_sub_orden === subOrd));

      /* Se actualiza las métricas de las Envasadoras */
      setDisponibilidadEnvasadoras(
          isNaN(t_activo_envasadoras/(t_activo_envasadoras+t_inactivo_envasadoras)) ? 0 :
          t_activo_envasadoras/(t_activo_envasadoras+t_inactivo_envasadoras) * 100
      );

      setEficienciaEnvasadoras(
          isNaN(ordenSelected.kg_envasados/(ordenSelected.kg_hora * ((t_activo_envasadoras+t_inactivo_envasadoras)/60/3))) ? 0 :
          ordenSelected.kg_envasados/(ordenSelected.kg_hora * ((t_activo_envasadoras+t_inactivo_envasadoras)/60/3)) * 100
      );

      var repsEnv = reportesSel.filter(r => r.id_tipo_vibot === 4);
      var subOrd = repsEnv[repsEnv.length-1].id_sub_orden;
      setOrdenActivaEnvasadoras(ordenes.find(ord => ord.id_sub_orden === subOrd));

      /* Se actualiza las métricas de la Empaquetadora */
      setDisponibilidadEmpaquetadora(
          isNaN(t_activo_empaquetadora/(t_activo_empaquetadora+t_inactivo_empaquetadora)) ? 0 :
          t_activo_empaquetadora/(t_activo_empaquetadora+t_inactivo_empaquetadora) * 100
      );

      setEficienciaEmpaquetadora(
          isNaN(ordenSelected.real_kg/(ordenSelected.kg_hora * ((t_activo_empaquetadora+t_inactivo_empaquetadora)/60))) ? 0 :
          ordenSelected.real_kg/(ordenSelected.kg_hora * ((t_activo_empaquetadora+t_inactivo_empaquetadora)/60)) * 100
      );

      var repsEmp = reportesSel.filter(r => r.id_tipo_vibot === 5);
      var subOrd = repsEmp[repsEmp.length-1].id_sub_orden;
      setOrdenActivaEmpaquetadora(ordenes.find(ord => ord.id_sub_orden === subOrd));

      setTActivoFormadora(t_activo_formadora); setTInactivoFormadora(t_inactivo_formadora);
      setTActivoEnvasadora3(t_activo_env3); setTInactivoEnvasadora3(t_inactivo_env3);
      setTActivoEnvasadora4(t_activo_env4); setTInactivoEnvasadora4(t_inactivo_env4);
      setTActivoEnvasadora5(t_activo_env5); setTInactivoEnvasadora5(t_inactivo_env5);
      setTActivoEnvasadora6(t_activo_env6); setTInactivoEnvasadora6(t_inactivo_env6);
      setTActivoEmpaquetadora(t_activo_empaquetadora); setTInactivoEmpaquetadora(t_inactivo_empaquetadora);
      
      setDataTortaFor({
        datasets: [
          {
            data: [0, t_inactivo_formadora, t_activo_formadora],
          },
        ],
      });
      
      setDataTortaEnv3({
        datasets: [
          {
            data: [0, t_inactivo_env3, t_activo_env3],
          },
        ],
      });

      setDataTortaEnv4({
        datasets: [
          {
            data: [0, t_inactivo_env4, t_activo_env4],
          },
        ],
      });

      setDataTortaEnv5({
        datasets: [
          {
            data: [0, t_inactivo_env5, t_activo_env5],
          },
        ],
      });
      
      setDataTortaEnv6({
        datasets: [
          {
            data: [0, t_inactivo_env6, t_activo_env6],
          },
        ],
      });

      setDataTortaEmp({
        datasets: [
          {
            data: [0, t_inactivo_empaquetadora, t_activo_empaquetadora],
          },
        ],
      });
    }
  }, [reportesSelected]);

  useEffect(() => {
    /* Se actualizan las métricas globales */
    console.log(disponibilidadFormadora + " - " + disponibilidadEnvasadoras + " - " + disponibilidadEmpaquetadora);
    setCalidad(ordenSelected.real_kg/ordenSelected.kg_formados * 100)
    setEficiencia((eficienciaFormadora+eficienciaEnvasadoras+eficienciaEmpaquetadora)/3);
    setDisponibilidad((disponibilidadFormadora+disponibilidadEnvasadoras+disponibilidadEmpaquetadora)/3)
  }, [eficienciaEmpaquetadora]);

  /* Se obtienen las órdenes del día y la orden activa */
  const [ordenes, setOrdenes] = useState([]); 
  const [ordenSelected, setOrdenSelected] = useState({});
  const [fechaOrdenes, setFechaOrdenes] = useState(moment().format('YYYY-MM-DD'));
  const loadOrdenes = () => {
    const query = fetch(global.api.dashboard.getOrdenesResumen, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        fecha: fechaOrdenes
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.length >= 1) {
        setOrdenes(result);
        var ord = result.find(e => e.id_estado === 1);
        if (ord != undefined)
          setOrdenSelected(ord);
        else
          setOrdenSelected(result[0]);
      } else {
        setOrdenes([]);
        setOrdenSelected({});
      }
    })
    .catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    loadReportes();
    const interval = setInterval(() => {
      loadReportes();
    }, 60000);
    return () => clearInterval(interval);
  }, [ordenSelected]);

  useEffect(() => {
    loadOrdenes();
  },[]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadOrdenes();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Button onClick={handle.enter}>
        Ver Full Screen
      </Button>

      <FullScreen handle={handle} >
        <div className={handle.active ? "fullscreen-space" : "fullscreen-space d-none"} >
          <Row className="fullscreen-nav">
            <Col>
              <div className="app-header__logo2 ">
                <div className="logo-src2"
                  style={{ backgroundImage: `url(${localStorage.getItem("img")})` }}
                />
              </div>
            </Col>

            <Col className="bigFont2 mt-4 mr-5" align="right">
              {moment().format('DD-MM-YYYY')}
              <WatchLaterOutlinedIcon style={{ fontSize: 30 }} className="mb-1 ml-4 mr-1" />
              {moment().format("HH:mm")}
            </Col>
          </Row>

          <Row className="fullscreen-centerSpace">
            <Col xl="4" className="fullscreen-center1" >
              <Row className="fullscreen-center1-head p-3">
                <Col xl="3" className="font1 mt-3 ">
                  Orden N° {ordenSelected.id_sub_orden}
                </Col>
                
                <Col className="font1 mt-3">
                  {ordenSelected.producto}
                </Col>
              </Row>

              <Row className="fullscreen-center1-body1">
                <Col xl="4">
                  <div align="center" className="bigFont3 mt-4">{formatNumber.new(_.round(ordenSelected.kg_porcentual, 2))} %</div>
                  <div align="center" className="littleFont2">de Produccion en Línea</div>
                </Col>

                <Col xl="4">
                  <div align="center" className="bigFont3 mt-4">{formatNumber.new(_.round(ordenSelected.cajas_acumuladas/ordenSelected.tiempo_total, 1))} Caj</div>
                  <div align="center" className="littleFont2">por Minuto</div>
                </Col>

                <Col xl="4">
                  <div align="center" className="bigFont3 mt-4"> {tiempoOrden}</div>
                  <div align="center" className="littleFont2">horas de Producción</div>
                </Col>
              </Row>

              <Row className="fullscreen-center1-body2 pt-3 pb-3">
                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(disponibilidad).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#fff" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">Disponibilidad</div>
                  </div>
                </Col>

                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(eficiencia).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#FFF" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">Eficiencia</div>
                  </div>
                </Col>

                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(calidad).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#FFF" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">Calidad</div>
                  </div>
                </Col>

                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={((calidad/100*eficiencia/100*disponibilidad/100) * 100).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#FFF" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">OEE</div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col>
              <Card className="fullscreen-center2" >
                <Table className="mt-0 ">
                  <thead className="fullscreen-theadBlue">
                    <tr className="text-center">
                      <th className="border1">N° de Orden</th>
                      <th>SKU</th>
                      <th>Producto</th>
                      <th>Cajas</th>
                      <th>Productividad</th>
                      <th>Tiempo</th>
                      <th>Kg Solicitados</th>
                      <th>Kg Producidos</th>
                      <th className="border2">Kg %</th>
                    </tr>
                  </thead>

                  <tbody>{
                    ordenes.map((orden, i) => i>4 ? "" :  
                      orden.id_sub_orden ? (
                        <tr key={i}
                          className={orden.id_estado == 1 ? "orangeRow" :
                            "text-center"}
                        >
                          <td>{orden.id_sub_orden}</td>
                          <td>{orden.sku}</td>
                          <td>{orden.producto}</td>
                          <td>{formatNumber.new(orden.cajas)}</td>
                          <td>
                            {orden.tiempo_total === 0 ? 0 + " Caj/min" : formatNumber.new(_.round(orden.cajas_acumuladas/orden.tiempo_total, 1)) + " Caj/min"}
                          </td>
                          <td>
                            {formatNumber.new(_.round(orden.tiempo_estimado, 2)) + " hrs"}
                          </td>
                          <td>{formatNumber.new(_.round(orden.kg_solicitados)) + " Kg"}</td>
                          <td>{formatNumber.new(_.round(orden.real_kg)) + " Kg"}</td>
                          <td>
                            {orden.kg_porcentual == null ? "0 %"
                              : orden.kg_porcentual > 100 ? "100%"
                              : formatNumber.new(_.round(orden.kg_porcentual, 2)) + " %"}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )
                    )
                  }</tbody>
                </Table>
              </Card>

              <Row className="fullscreen-center3">
                <Col xl="3" className="fullscreen-center3-verde1 pr-0">
                  <Row align="center" className="mx-4 px-4 mt-2 ">
                    <div align="center" className="ml-3">
                      <img src={icono1} className="" alt="Empaque" width="120%" height="110%" />
                    </div>
                  </Row>
                  <div align="center" className="bigFont">{formatNumber.new(_.round(ordenSelected.kg_formados))}</div>
                  <div align="center" className="littleFont">de {formatNumber.new(ordenSelected.kg_solicitados)} Kgs</div>
                </Col>

                <Col xl="3" className="fullscreen-center3-verde2">
                  <Row align="center" className="mx-4 px-4 mt-2">
                    <div align="center" className="text-white ml-3" >
                      <img src={icono2} className="" alt="Empaque" width="120%" height="110%" />
                    </div>
                  </Row>
                  <div align="center" className="bigFont">{formatNumber.new(ordenSelected.hamb_envasadas)}</div>
                  <div align="center" className="littleFont">de {formatNumber.new(ordenSelected.hamb_solicitadas)} Packs</div>
                </Col>

                <Col xl="3" className="fullscreen-center3-verde3 ">
                  <Row align="center" className="mx-4 px-4 mt-2">
                    <div align="center" className="ml-3">
                      <img src={icono3} className="" alt="Empaque" width="120%" height="110%" />
                    </div>
                  </Row>
                  <div align="center" className="bigFont">{formatNumber.new(ordenSelected.cajas_acumuladas)}</div>
                  <div align="center" className="littleFont">de {formatNumber.new(ordenSelected.cajas)} Cajas</div>
                </Col>

                <Col xl="3" className="">
                  <Card className="p-0 fullscreen-centerMaquina">
                    <div align="center" className="text-uppercase font-weight-bold title1orange2 mr-2 mt-2">Iqf</div>
                    <div align="center" className="bigFontGreen">{formatNumber.new(_.round(ordenSelected.temp_entrada, 2))}° C</div>
                    <div align="center" className="littleFontGreen mb-2">Temp. Entrada</div>
                    <div align="center" className="bigFontGreen blackBorderTop pt-2">{formatNumber.new(_.round(ordenSelected.tiempo_retencion_iqf, 1))} Min</div>
                    <div align="center" className="littleFontGreen mb-2">Tiempo Retencion</div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <Row className="fullscreen-botSpace ">
            {/* Tarjeta Formadora */}
            <Col xl="2">
              <Card className=" main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Formadora</div>
                <Doughnut
                  data={dataTortaFor}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: { display: true, position: "buttom" },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(tActivoFormadora)}
                </Row>
                <Row className="ml-2 mb-3">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(tInactivoFormadora)}
                </Row>
                <div align="center" style={{ fontWeight: 'bold' }} className="fullscreen-botMaquina-bot pl-2 pt-2">{
                  "Orden Activa: SKU " + ordenActivaFormadora.sku + " (" + parseInt(ordenActivaFormadora.kg_formados/ordenActivaFormadora.kg_solicitados*100) + "%)"
                }</div>
              </Card>
            </Col>

            {/* Tarjeta Envasadora 3 */}
            <Col xl="2">
              <Card className="main-card fullscreen-botMaquina ">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 3</div>
                <Doughnut
                  data={dataTortaEnv3}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: { display: true, position: "buttom" },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(tActivoEnvasadora3)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(tInactivoEnvasadora3)}
                </Row>
                <div align="center" style={{ fontWeight: 'bold' }} className="fullscreen-botMaquina-bot pl-2 pt-2">{
                  "Orden Activa: SKU " + ordenActivaEnvasadoras.sku + " (" + parseInt(ordenActivaEnvasadoras.kg_envasados/ordenActivaEnvasadoras.kg_solicitados*100) + "%)"
                }</div>
              </Card>
            </Col>
            
            {/* Tarjeta Envasadora 4 */}
            <Col xl="2">
              <Card className=" main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 4</div>
                <Doughnut
                  data={dataTortaEnv4}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: { display: true, position: "buttom" },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(tActivoEnvasadora4)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(tInactivoEnvasadora4)}
                </Row>
                <div align="center" style={{ fontWeight: 'bold' }} className="fullscreen-botMaquina-bot pl-2 pt-2">{
                  "Orden Activa: SKU " + ordenActivaEnvasadoras.sku + " (" + parseInt(ordenActivaEnvasadoras.kg_envasados/ordenActivaEnvasadoras.kg_solicitados*100) + "%)"
                }</div>
              </Card>
            </Col>

            {/* Tarjeta Envasadora 5 */}
            <Col xl="2">
              <Card className="main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 5</div>
                <Doughnut
                  data={dataTortaEnv5}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: { display: true, position: "buttom" },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(tActivoEnvasadora5)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(tInactivoEnvasadora5)}
                </Row>
                <div align="center" style={{ fontWeight: 'bold' }} className="fullscreen-botMaquina-bot pl-2 pt-2">{
                  "Orden Activa: SKU " + ordenActivaEnvasadoras.sku + " (" + parseInt(ordenActivaEnvasadoras.kg_envasados/ordenActivaEnvasadoras.kg_solicitados*100) + "%)"
                }</div>
              </Card>
            </Col>

            {/* Tarjeta Envasadora 6 */}
            <Col xl="2">
              <Card className="main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 6</div>
                <Doughnut
                  data={dataTortaEnv6}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: { display: true, position: "buttom" },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(tActivoEnvasadora6)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(tInactivoEnvasadora6)}
                </Row>
                <div align="center" style={{ fontWeight: 'bold' }} className="fullscreen-botMaquina-bot pl-2 pt-2">{
                  "Orden Activa: SKU " + ordenActivaEnvasadoras.sku + " (" + parseInt(ordenActivaEnvasadoras.kg_envasados/ordenActivaEnvasadoras.kg_solicitados*100) + "%)"
                }</div>
              </Card>
            </Col>

            {/* Tarjeta Empaquetadora */}
            <Col xl="2" >
              <Card className="main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Empaque</div>
                <Doughnut
                  data={dataTortaEmp}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: { display: true, position: "buttom" },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(tActivoEmpaquetadora)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(tInactivoEmpaquetadora)}
                </Row>
                <div align="center" style={{ fontWeight: 'bold' }} className="fullscreen-botMaquina-bot pl-2 pt-2">{
                  "Orden Activa: SKU " + ordenActivaEmpaquetadora.sku + " (" + parseInt(ordenActivaEmpaquetadora.cajas_acumuladas/ordenActivaEmpaquetadora.cajas*100) + "%)"
                }</div>
              </Card>
            </Col>
          </Row>
        </div>
      </FullScreen>
    </div>
  );
}

export default FullSceen;