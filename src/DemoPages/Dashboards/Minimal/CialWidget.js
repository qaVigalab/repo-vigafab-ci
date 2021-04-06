
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import ReactApexChart from "react-apexcharts";
import _ from "lodash";
import moment from 'moment';

const CialWidget = (props) => {
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

  const [dataTorta, setDataTorta] = useState(
    {
      legend: [
        {
          display: false,
          position: "top",
          fullWidth: true,
          reverse: true,
        },
      ],

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
  const [seriesTimeLine, setSeriesTimeLine] = useState([])
  const [optionsTimeLine, setOptionsTimeLine] = useState(
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
  );

  const [reportes, setReportes] = useState(props.reportesSelected);
  const [tActivo, setTActivo] = useState(0);
  const [disponibilidad, setDisponibilidad] = useState(0);
  const [eficiencia, setEficiencia] = useState(0);
  const [hambEnvasadas, setHambEnvasadas] = useState(0);
  const [kgEnvasados, setKgEnvasados] = useState(0);

  useEffect(() => {
    if (props.reportesSelected.length > 0){
      var reportesSel = props.reportesSelected.filter(rep => rep.id_tipo !== 4 && !rep.hora_inicio.includes("04:55:"));

      if (reportesSel.length > 0){
        /* Se calculan los tiempos de actividad y paro */
        var tiempo_activo = 0, tiempo_inactivo = 0;
        if (props.recambio === 0){
          var hamburguesas_envasadas = -props.ordenSelected.reproceso_rayos_mezc/3*1000/props.ordenSelected.g_hamburguesa, 
          kilos_envasados = -props.ordenSelected.reproceso_rayos_mezc/3;
        } else{
          var hamburguesas_envasadas = 0, kilos_envasados = 0;
        }

        if (hamburguesas_envasadas < 0)
          hamburguesas_envasadas = 0;
        if (kilos_envasados < 0)
          kilos_envasados = 0;

        for (var i=0; i<reportesSel.length; i++){
          if (reportesSel[i].id_tipo === 1)
            tiempo_inactivo += reportesSel[i].minutos;
          else if (reportesSel[i].id_tipo === 2){
            tiempo_activo += reportesSel[i].minutos;
            
            /* Se obtiene la cantidad de hamburguesas envasadas y sus kg acumulados */
            hamburguesas_envasadas += reportesSel[i].hamburguesas_acumuladas;
            kilos_envasados += reportesSel[i].real_kg;
          }
        }
        
        setDisponibilidad(
          isNaN(tiempo_activo/(tiempo_activo+tiempo_inactivo)) ? 0 :
          tiempo_activo/(tiempo_activo+tiempo_inactivo) * 100
        );

        while (reportesSel.length > 1 && reportesSel[0].id_tipo === 1){
          reportesSel.splice(0, 1);
        }

        var startMoment = moment(reportesSel[0].hora_inicio);
        var endMoment = moment(reportesSel[reportesSel.length-1].hora_termino);
        var diff = endMoment.diff(startMoment);
        const diffDuration = moment.duration(diff);

        setEficiencia(
            isNaN(kilos_envasados/(props.ordenSelected.kg_hora/3 * (diffDuration.hours() + diffDuration.minutes()/60 + diffDuration.seconds()/3600))) ? 0 :
            kilos_envasados/(props.ordenSelected.kg_hora/3 * (diffDuration.hours() + diffDuration.minutes()/60 + diffDuration.seconds()/3600)) * 100
        );

        setTActivo(tiempo_activo);
        setHambEnvasadas(hamburguesas_envasadas);
        setKgEnvasados(kilos_envasados);
        setDataTorta(
            {
              datasets: [
                {
                  data: [0, parseInt(tiempo_inactivo), parseInt(tiempo_activo)]
                }
              ],
            }
        );
        setReportes(props.reportesSelected);
      }
    } else{
      setDisponibilidad(0);
      setEficiencia(0);
      setTActivo(0);
      setHambEnvasadas(0);
      setKgEnvasados(0);
      setDataTorta(
          {
          datasets: [
              {
              data: [0, 0, 0]
              }
          ],
          }
      );
      setReportes([]);
    }
  }, [props.reportesSelected]);

  useEffect(() => {
    if (reportes.length > 0)
      loadTimeLine();
    else{
      setSeriesTimeLine([{
        data: [{
            x: 'Prod',
            y: [new Date().getTime(),
            new Date().getTime()],
            fillColor: '#2264A7'
        }, {
            x: 'Paro',
            y: [new Date().getTime(),
            new Date().getTime()],
            fillColor: '#F7431E'
        }, {
            x: 'Cambio',
            y: [new Date().getTime(),
            new Date().getTime()],
            fillColor: '#02c39a'
        }]
      }]);
    }
  }, [reportes]);

  const loadTimeLine = () => {
    var objetos = [{
        x: 'Prod',
        y: [new Date(reportes[0].hora_inicio).getTime(),
        new Date(reportes[0].hora_inicio).getTime()],
        fillColor: '#2264A7'
    }, {
        x: 'Paro',
        y: [new Date(reportes[0].hora_inicio).getTime(),
        new Date(reportes[0].hora_inicio).getTime()],
        fillColor: '#F7431E'
    }, {
        x: 'Cambio',
        y: [new Date(reportes[0].hora_inicio).getTime(),
        new Date(reportes[0].hora_inicio).getTime()],
        fillColor: '#02c39a'
    }];
    
    for (let i = 0; i < reportes.length; i++) {
        var x_ = "", color_ = null;
        if (reportes[i].id_tipo == 1) {
            x_ = "Paro";
            color_ = '#F7431E';
        } else if (reportes[i].id_tipo == 2) {
            x_ = "Prod";
            color_ = '#2264A7';
        } else {
            x_ = "Cambio";
            color_ = '#02c39a';
        }

        var objeto = {
            x: x_,
            y: [
                new Date(reportes[i].hora_inicio).getTime(),
                new Date(reportes[i].hora_termino).getTime()
            ],
            fillColor: color_
        }
        objetos.push(objeto)
    }
    setSeriesTimeLine([{
        data: objetos
    }]);
  }

  return (
    <Col md="6" xl="3" lg="6" xs="12">
      <Card className="main-card mb-3">
        {/* header */}  
        <div className="blackBorder2" >
          <Row>
            <br />
            <Col align="left" md="12">
              <div className="text-uppercase font-weight-bold title1orange mb-3 ml-3">{props.nombre}</div>
            </Col>
          </Row>
        </div >

        <div className="space5px">
          <Row>
            <br />
            <Col md="6">
              <Row className="mt-2" align="left">
                <div className="ml-4 font2gray">{props.formatNumber.new(_.round(hambEnvasadas))} de</div>
                </Row>
              <Row align="left">
                <div className="ml-4">{props.formatNumber.new(_.round(props.ordenSelected.hamb_solicitadas/3))} Packs</div>
              </Row>

              <Row className="mt-2" align="left">
                <div className="ml-4 font2gray">{props.formatNumber.new(_.round(kgEnvasados))} de</div>
              </Row>
              <Row align="left">
                <div className="ml-4">{props.formatNumber.new(_.round(props.ordenSelected.kg_solicitados/3))} Kgs</div>
              </Row>
            </Col>
            
            <Col md="6">
              <Row className="mt-2">
                <Col align="right">
                  {reportes.length > 0 ?
                    <div className={props.ordenSelected.id_estado != 1 || reportes.filter(rep => rep.id_tipo != 4)[reportes.filter(rep => rep.id_tipo != 4).length-1].id_tipo === 1 ? "font2gray my-1 mr-1" : "font2Blue my-1 mr-1"}>{
                      props.ordenSelected.id_estado === 3 ? "Detenida"
                      : props.ordenSelected.id_estado === 2 ? "En espera"
                      : reportes.filter(rep => rep.id_tipo != 4)[reportes.filter(rep => rep.id_tipo != 4).length-1].id_tipo === 1 ? "Detenida"
                      : "Produciendo"
                    }</div> :
                    <div className={props.ordenSelected.id_estado != 1 ? "font2gray my-1 mr-1" : "font2Blue my-1 mr-1"}>{
                      props.ordenSelected.id_estado === 3 ? "Detenida"
                      : props.ordenSelected.id_estado === 2 ? "En espera"
                      : "Produciendo"
                    }</div>
                  }
                </Col>
              </Row>

              <Row>
                <Col align="right">
                  {parseInt(tActivo/60) == 1 ?
                      <div className={props.ordenSelected.id_estado !== 1 ? "font2gray mr-1" : "font2Blue mr-1"}>
                        {parseInt(tActivo/60)} hr,
                        {" " + parseInt(tActivo%60)} min
                      </div> :
                      <div className={props.ordenSelected.id_estado !== 1 ? "font2gray mr-1" : "font2Blue mr-1"}>
                        {parseInt(tActivo/60)} hrs,
                        {" " + parseInt(tActivo%60)} min
                      </div> 
                  }
                </Col>
              </Row>

              <Row>
                <Col align="right">
                  <div className="mr-1">Tiempo de Actividad</div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row >
            <Col xs="9" className="ml-5">
              <div className="space5px">
                <Container>
                  <Doughnut
                    data={dataTorta}
                    width={10}
                    height={10}
                    align="center"
                    options={{
                      legend: {
                        display: false,
                      },
                      responsive: true,
                      maintainAspectRatio: true,
                      plotOptions: {
                        pie: {
                          donut: {
                            size: '100%'
                          }
                        }
                      },
                      plugins: {
                          datalabels: {
                             display: false,
                             color: 'white'
                          }
                      }
                    }}
                  />
                </Container>
              </div>
            </Col>
          </Row>

          <Row className="blackBorderTop blackBorderBot mr-2  " align="left">
            <Col xs="6" className="mb-3">
              <div className="circle space5px ">
                <Circle
                  animate={true} // Boolean: Animated/Static progress
                  animationDuration="3s" // String: Length of animation
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size="14rem" // String: Defines the size of the circle.
                  lineWidth="30" // String: Defines the thickness of the circle's stroke.
                  progress={(disponibilidad).toFixed(0)} // String: Update to change the progress and percentage.
                  progressColor="#02c39a" // String: Color of "progress" portion of circle.
                  bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                  textColor="#6b778c" // String: Color of percentage text color.
                  textStyle={{
                    fontSize: "4rem", // CSSProperties: Custom styling for percentage.
                  }}
                  percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                  roundedStroke={true} // Boolean: Rounded/Flat line ends
                  showPercentage={true} // Boolean: Show/hide percentage.
                  showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                />
              </div>
              <div align="center" className="font2 mt-3 ">Disponibilidad</div>
            </Col>
            <Col xs="6">
              <div className="circle space5px">
                <Circle
                  animate={true} // Boolean: Animated/Static progress
                  animationDuration="3s" // String: Length of animation
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size="50" // String: Defines the size of the circle.
                  lineWidth="30" // String: Defines the thickness of the circle's stroke.
                  progress={(eficiencia).toFixed(0)} // String: Update to change the progress and percentage.
                  progressColor="#02c39a" // String: Color of "progress" portion of circle.
                  bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                  textColor="#6b778c" // String: Color of percentage text color.
                  textStyle={{
                    fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                  }}
                  percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                  roundedStroke={true} // Boolean: Rounded/Flat line ends
                  showPercentage={true} // Boolean: Show/hide percentage.
                  showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                />
              </div>
              <div align="center" className="font2 mt-3">Eficiencia</div>
            </Col>
          </Row>

          <Row>
            <Col xs="12">
              <div id="chart" className={/*seriesTimeLine.data !== undefined ? "m-3" : "d-none"*/ ""}>
                <ReactApexChart options={optionsTimeLine} series={seriesTimeLine} type="rangeBar" height={150} />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(CialWidget);
