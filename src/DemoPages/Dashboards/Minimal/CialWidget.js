import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row } from "reactstrap";

export default class CialWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { paros: 0, produciendo: 0 };
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "id_vibot": this.props.id_vibot });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getenvasadora",
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        this.setState({
          paros: result[0].paros,
          produciendo: result[0].produciendo,
          total: result[0].total
        })
      }
      )
      .catch((error) => console.log("error", error));
  }
  render() {
    let data = {
      legend: [
        {
          display: false,
          position: "top",
          fullWidth: true,
          reverse: true,
        },
      ],

      labels: [
        //"Inactivo",
        "Paro sin Justificar",
        //"Paro Justificado",
        "Producción",
      ],
      stroke: {
        width: 2,
      },
      datasets: [
        {
          data: [this.state.paros, this.state.produciendo],
          backgroundColor: [
            // "#d9d9d9",
            "#F7431E  ",
            //"#FFB000",
            "#2264A7",
          ],
          hoverBackgroundColor: [
            //"#d9d9d9",
            "#F7431E  ",
            // "#FFB000",
            "#2264A7 ",
          ],
        },
      ],
    };

    return (
      <Col md="6" xl="3" lg="6" xs="12">
        <Card className="main-card mb-3">
          {/* header */}

          <div className="blackBorder2" >
            <Row>
              <br />
              <Col align="left" md="12">
                <div className="text-uppercase font-weight-bold title1orange mb-3 ml-3">{this.props.nombre}</div>
              </Col>
            </Row>
          </div >

          <div className="space5px ">
            <Row>
              <br />
              <Col md="6">
                <Row className="mt-4">


                  <div align="center" className="ml-auto font2gray">{Intl.NumberFormat().format(194)}</div>
                  <div align="center" className="  ml-2 mr-auto">de {Intl.NumberFormat().format(300)} F.Packs </div>

                </Row>
                <Row className="mb-4">
                  <div align="left" className="ml-auto font2gray">{Intl.NumberFormat().format(1.234)}</div>
                  <div align="center" className=" ml-2 mr-auto"> de {Intl.NumberFormat().format(1800)} Kgs</div>

                </Row>
              </Col>
              <Col md="6">
                <Row >
                  <Col align="right">
                    <div className={this.props.estado == 1 ? "font2gray mr-2 " : "font2Blue mr-2"}>{this.props.estado == 1 ? " Detenida" : " Produciendo"}</div>
                  </Col>
                </Row>
                <Row >
                  <Col align="right">
                    <div className="font2Blue mr-2 ">{Math.round(/*tActivo¨*/1 / 60 * 100) / 100} hrs</div></Col>
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
                  <Doughnut
                    data={data}
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
                </div>
              </Col>
            </Row>


            <Container>
              <Row className="blackBorderTop ">

                <Col xs="5" className="ml-4">
                  <div className="circle space5px ">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="10s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="50" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(
                        (this.state.produciendo / this.state.total) *
                        100
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
                  <div align="center" className="font2 mt-3">Disponibilidad</div>

                </Col>
                <Col xs="5">
                  <div className="circle space5px">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="10s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="50" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(
                        (this.state.produciendo / this.state.total) *
                        100
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
            </Container>
          </div>



        </Card>
      </Col>
    );
  }
}
