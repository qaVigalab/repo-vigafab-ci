
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row,Button } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import moment from 'moment'
import Brightness1Icon from "@material-ui/icons/Brightness1";
import { setIdVibot } from "../../../actions/dashboardActions";

const TortaParos = (props) => {

  const id = props.vibot

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
        "Paro Justificado",
        "Producción",
      ],
      datasets: [
        {
          data: [4, 2, 1, 1],
          backgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#FFB000",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#F7431E  ",
            "#FFB000",
            "#2264A7 ",
          ],
        },
      ],

    }
  )

  const [nombre, setNombre] = useState()
  const [tActivo, setTActivo] = useState()
  const [tNoJustificado, setTNoJustificado] = useState()
  const [tJustificado, setTJustificado] = useState()
  
  const formatHour = (min) =>{
    let horas = min/60;
    horas= Math.trunc(horas)
    let minutos = min-(60*horas) 
    return horas===0 ? minutos + " Min" : horas+" Hrs " + minutos + " Min"
  }

  const loadData = () => {
    fetch(global.api.dashboard.getparosmaquina, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        id_vibot: id,
        ini: props.ini,
        ter: props.ter,
        pro: props.sku
      }),
    })
      .then(response => response.json())
      .then(result => {
        setTActivo(result[0].t_activo)
        setTNoJustificado(result[0].t_noJustificado)
        setTJustificado(result[0].t_justificado)
        setNombre(result[0].maquina)
        setNombre(result[0].maquina)
        let data = [];
        /*  if (result[0].tiempo_inactivo == 0 && result[0].tiempo_actividad == 0) {
             data = [1, 0, 0]
         } else {
             data = [0, Math.round(result[0].tiempo_inactivo / 60 * 100) / 100, Math.round(result[0].tiempo_actividad / 60 * 100) / 100]
         } */
        data = [0, result[0].t_noJustificado, result[0].t_justificado, result[0].t_activo]
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
  const verDetalle = (e) => {
    e.preventDefault();
    props.setIdVibot(id)
  }

  useEffect(() => {
    loadData()
  }, []);
  
  useEffect(() => {
    loadData()
  }, [props.refresh]);

  return (
    <Col md="6" xl="4" lg="6" xs="12">
      <Card className="main-card mb-3">
        {/* header */}

        <div className="blackBorder2" >
          <Row>
            <br />
            <Col align="left" md="7">
              
              <div className="text-uppercase font-weight-bold title1orange mb-3 ml-3">{nombre}</div></Col>
              <Col>
              <Button className="mt-3 mr-2 outlineOrange" outline color="danger" size="sm" onClick={(e) => verDetalle(e)}>Ver detalle</Button>
              
            </Col>
          </Row>
        </div >

        <div className="space5px ">
          <Row >
            <Col xs="8" className="">
              <div className="">
                <Container>
                  <Doughnut
                    id="1"
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
            <Col xs="4">
              <div className="mt-5 mr-3">
                <Circle
                  animate={true} // Boolean: Animated/Static progress
                  animationDuration="3s" // String: Length of animation
                  responsive={true} // Boolean: Make SVG adapt to parent size
                  size="100" // String: Defines the size of the circle.
                  lineWidth="30" // String: Defines the thickness of the circle's stroke.
                  progress={(
                    (tActivo / (tActivo + tNoJustificado + tJustificado)) * 100
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
                <div align="center" className="mt-2">Disponibilidad</div>
              </div>
            </Col>
          </Row>
          <Row className="ml-3 mt-3">
            <Brightness1Icon style={{ color: "#2264A7" }} />
            Tiempo Activo: {formatHour(tActivo)}
          </Row>
          <Row className="ml-3">
            <Brightness1Icon style={{ color: "#FFB000" }} />
            Tiempo Justificado: {formatHour(tJustificado) }
          </Row>
          <Row className="ml-3">
            <Brightness1Icon style={{ color: "#F7431E" }} />
            Tiempo sin Justificar: {formatHour(tNoJustificado) }
            
          </Row>
          <Row className="ml-3">
            <Brightness1Icon style={{ color: "#555" }} />
            Tiempo Total: {formatHour(tActivo+tJustificado+tNoJustificado) }
            
          </Row>
        </div>



      </Card>
    </Col>
  );
}

const mapStateToProps = (state) => ({
  id_vibot: state.dashboardReducers.id_vibot,
});

const mapDispatchToProps = (dispatch) => ({
  setIdVibot: (data) => dispatch(setIdVibot(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TortaParos);
