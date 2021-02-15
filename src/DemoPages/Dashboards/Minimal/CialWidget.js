
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import ReactApexChart from "react-apexcharts";
import _ from "lodash";
const CialWidget = (props) => {

  const [productividad, setProductividad] = useState(0)
  const [hacumuladas, setHacumuladas] = useState(0)
  const [tActivo, setTActivo] = useState(0)
  const [tInactivo, setTInactivo] = useState(0)
  const [kgacumulados, setKgacumulados] = useState(0)
  const [estado, setEstado] = useState(0)
  const [capacidad, setCapacidad] = useState(0)
  const [kgsolicitados, setKgsolicitados] = useState(0)
  const [hsolicitadas, setHsolicitadas] = useState(0)
  const id_vibot = props.id_vibot
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
  )

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

  const loadResumen = () => {
    let link
    localStorage.getItem("id_orden") === localStorage.getItem("id_ordenA")
      ? link = global.api.dashboard.getresumenmaquina
      : link = global.api.dashboard.getresumenhistorico
    fetch(link, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({
        id_vibot: id_vibot,
        id_orden: props.ordenSelected.id_sub_orden
      }),
    })
      .then(response => response.json())
      .then(result => {
        let data = [];
        if (result[0].tiempo_inactivo == 0 && result[0].tiempo_actividad == 0) {
          data = [1, 0, 0]
        } else {
          data = [0, Math.round(result[0].tiempo_inactivo / 60 * 100) / 100, Math.round(result[0].tiempo_actividad / 60 * 100) / 100]
        }

        setProductividad(result[0].productividad)
        setTActivo(result[0].tiempo_actividad)
        setTInactivo(result[0].tiempo_inactivo == 0 ? 1 : result[0].tiempo_inactivo)
        setEstado(result[0].estado)
        setHacumuladas(result[0].hamburguesas_acumuladas)
        setKgacumulados(result[0].real_kg)
        setHsolicitadas(result[0].hamburguesas_solicitadas)
        setKgsolicitados(result[0].kg_solicitados)
        setCapacidad(result[0].kg_hora)
        setDataTorta(
          {
            datasets: [
              {
                data: data
              }
            ],
          }
        )

      }
      )
      .catch(err => {
        console.error(err);
      });
  }
  const loadTimeLine = () => {

    fetch(global.api.dashboard.gettimelinemaquina, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({
        id_vibot: id_vibot,
        id_orden: props.ordenSelected.id_sub_orden
      }),
    })
      .then((response) => response.json())
      .then((r) => {
        var objeto = {};
        if (r.length > 0) {
          var objetos = [
            {
                x: 'Prod',
                y: [new Date(r[0].hora_inicio).getTime(),
                new Date(r[0].hora_inicio).getTime()],
                fillColor: '#2264A7'
            },
            {
                x: 'Paro',
                y: [new Date(r[0].hora_inicio).getTime(),
                new Date(r[0].hora_inicio).getTime()],
                fillColor: '#F7431E'
            },
            {
                x: 'Cambio',
                y: [new Date(r[0].hora_inicio).getTime(),
                new Date(r[0].hora_inicio).getTime()],
                fillColor: '#02c39a'
            }
          ];

          for (let i = 0; i < r.length; i++) {
            var x_ = "", color_ = null;
            if (r[i].id_tipo == 1) {
              x_ = "Paro";
              color_ = '#F7431E';
            } else if (r[i].id_tipo == 2) {
              x_ = "Prod";
              color_ = '#2264A7';
            } else {
              x_ = "Cambio";
              color_ = '#02c39a';
            }

            objeto = {
                x: x_,
                y: [
                    new Date(r[i].hora_inicio).getTime(),
                    new Date(r[i].hora_termino).getTime()
                ],
                fillColor: color_
            }
            objetos.push(objeto)
          }
        }
        
        setSeriesTimeLine([{
          data: objetos
        }]);
      })

      .catch((err) => {
        console.error(err);
      });
  }
  useEffect(() => {
    loadResumen()
    loadTimeLine()
  }, [props.ordenSelected]);

  useEffect(() => {
    setTimeout(() => {
      loadTimeLine()
      loadResumen()
    }, 2000);

    const interval = setInterval(() => {
      loadResumen();
    }, 30000);
    return () => clearInterval(interval);
  }, [props.ordenSelected]);

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

        <div className="space5px ">
          <Row>
            <br />
            <Col md="6">
              <Row className="mt-4" align="left">

                <div className="ml-4 font2gray">{formatNumber.new(_.round(hacumuladas))}</div>

                <div className="ml-2">de {formatNumber.new(_.round(hsolicitadas / 3))} F.Packs</div>

              </Row>
              <Row className="mb-4" align="left">
                <div className="ml-4 font2gray">{formatNumber.new(_.round(kgacumulados))}</div>

                <div align="center" className=" ml-2 mr-auto"> de {formatNumber.new(_.round(kgsolicitados / 3))} Kgs</div>

              </Row>
            </Col>
            <Col md="6">
              <Row >
                <Col align="right">
                  <div className={props.ordenSelected.id_estado != 1 ? "font2gray  my-4" : "font2Blue my-4"}>{
                    props.ordenSelected.id_estado === 3 ? "Terminada"
                    : props.ordenSelected.id_estado === 2 ? "En espera"
                    : "Produciendo"
                  }</div>
                </Col>
              </Row>
              <Row >
                <Col align="right">
                  <div className="font2Blue mr-2 ">{formatNumber.new(_.round(tActivo / 60, 2))} hrs</div>
                </Col>
              </Row>
              <Row className=" mb-4">
                <Col align="right">
                  <div className="mr-2 ">Tiempo de Actividad</div>
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
                    width="10"
                    height="10"
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
                  animationDuration="5s" // String: Length of animation
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size="14rem" // String: Defines the size of the circle.
                  lineWidth="30" // String: Defines the thickness of the circle's stroke.
                  progress={(
                    (tActivo / (tInactivo + tActivo)) * 100 === Infinity ? 0 :
                    (tActivo / (tInactivo + tActivo)) * 100 > 0 ?
                    (tActivo / (tInactivo + tActivo)) * 100 
                      : 0
                  ).toFixed(0)} // String: Update to change the progress and percentage.
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
                  animationDuration="10s" // String: Length of animation
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size="50" // String: Defines the size of the circle.
                  lineWidth="30" // String: Defines the thickness of the circle's stroke.
                  progress={(
                    (kgacumulados / ((capacidad / 3) * ((tActivo) / 60))) * 100 === Infinity ? 0 :
                    ((kgacumulados / ((capacidad / 3) * ((tActivo) / 60)))) > 0 ?
                      (kgacumulados / ((capacidad / 3) * ((tActivo) / 60))) * 100  //(totalKG/capacidad*tiempo que se demoro)
                      : 0
                  ).toFixed(0)} // String: Update to change the progress and percentage.
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

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(CialWidget);
