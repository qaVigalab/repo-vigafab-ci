import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row } from "reactstrap";

export default class CialWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {paros: 0, produciendo:0};
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m");
    myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"id_vibot":this.props.id_vibot});

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
    .then( result => {
          this.setState({
            paros:result[0].paros,
            produciendo:result[0].produciendo,
            total:result[0].total
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
      stroke:{
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

    if (
      this.props.modo === 2 ||
      this.props.modo === 1 ||
      this.props.modo === 3 ||
      this.props.modo === 4 ||
      this.props.modo === 5
    )
      return (
        <Col md="6" xl="3" lg="6" xs="12">
          <Card className="main-card mb-3">
            {/* header */}
            {this.props.modo === 5 ? (
              <div>
                <Container
                  style={{
                    color: "#ffffff",
                    background: this.props.color,
                    padding: "15px",
                    textAlign: "center",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  {this.props.nombre}
                </Container>
                <Container>
                  <Row>
                    <Col>
                      <div className="Kgi">
                        {this.props.estado === 1 ? (
                          <span className="opacity-10 text-success pr-2">
                            <FontAwesomeIcon icon={faAngleUp} />
                          </span>
                        ) : (
                          <span className="opacity-10 text-danger pr-2">
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        )}
                        {this.props.OE} Kg
                      </div>
                    </Col>

                    <Col>
                      <div style={{ paddingTop: "15px" }} />
                      <div className="tde">
                        <div>
                          <font color="#aaaaaa">Tiempo de Actividad</font>
                        </div>
                        <div>
                          <font color="gray">
                            {this.props.data[6]} hrs /{" "}
                            {this.props.data
                              .reduce((a, b) => a + b, 0)
                              .toFixed(1)}{" "}
                            hrs
                          </font>{" "}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            ) : (
              <Container
                className={
                  this.props.modo === 1 || this.props.modo === 2
                    ? ""
                    : "darkbackground"
                }
              >
                <Row>
                  <Col>
                    <div className="tizq">
                      <div
                        className={
                          this.props.modo === 1 || this.props.modo === 2
                            ? "title1"
                            : "title1dark"
                        }
                      >
                        {this.props.nombre}
                      </div>
                      <div>
                        <div
                          className={
                            this.props.modo === 1 || this.props.modo === 2
                              ? "indi"
                              : "indi text-white"
                          }
                        >
                          {this.props.estado === 1 ? (
                            <span className="opacity-10 text-success pr-2">
                              <FontAwesomeIcon icon={faAngleUp} />
                            </span>
                          ) : (
                            <span className="opacity-10 text-danger pr-2">
                              <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                          )}
                          {(
                            (this.props.data[6] /
                              this.props.data.reduce((a, b) => a + b, 0)) *
                            100
                          ).toFixed(0)}

                          <small className="opacity-5 pl-1">%</small>
                        </div>
                      </div>{" "}
                    </div>
                  </Col>
                  <Col>
                    <div className="tde">
                      {this.props.estado === 1 ? (
                        <div className="title2">Produciendo</div>
                      ) : (
                        <div className="title2rojo">Parada</div>
                      )}
                      <div>
                        <font color="#aaaaaa">Tiempo de Actividad</font>
                      </div>
                      <div>
                        <font color="gray">
                          {this.props.data[6]} hrs /{" "}
                          {this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toFixed(1)}{" "}
                          hrs
                        </font>{" "}
                      </div>
                    </div>

                    <div />
                  </Col>
                </Row>
                {this.props.modo === 3 || this.props.modo === 4 ? (
                  <div style={{ padding: "10px" }} />
                ) : (
                  <hr />
                )}
              </Container>
            )}
            {this.props.modo === 4 ? (
              <div style={{ padding: "10px" }} />
            ) : this.props.modo === 3 ? (
              <div style={{ padding: "8px" }} />
            ) : (
              ""
            )}

            {this.props.modo === 1 ||
            this.props.modo === 3 ||
            this.props.modo === 5 ? (
              <div className="centralbody2">
                <Doughnut
                  data={data}
                  options={{
                    legend: {
                      display: false,
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio:90
                  }}
                />
              </div>
            ) : (
              <div className="centralbody">
                <Container>
                  <Row>
                    <Col xs="8">
                      <div className="centralbodydetail">
                        <Doughnut
                          data={data}
                          width="10"
                          height="10"
                          align="left"
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
                    <Col xs="4">
                      <div className="Kg">{this.props.OE + "Kg"}</div>
                      <div className="circle">
                        <Circle
                          animate={true} // Boolean: Animated/Static progress
                          animationDuration="10s" // String: Length of animation
                          responsive={true} // Boolean: Make SVG adapt to parent size
                          size="100" // String: Defines the size of the circle.
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
                      <div className="OE">OEE</div>
                      <div className="kgpor">
                        {this.props.OE}/{this.props.OET} Kg
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
            {this.props.modo === 1 ||
            this.props.modo === 3 ||
            this.props.modo === 5 ? (
              <div style={{ padding: "11px" }} />
            ) : (
              ""
            )}
            {this.props.modo !== 5 ? (
              <div className="barrainferior">
                <div className="progress">
                  <div
                    className="progress-bar bg-produciendo"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[6] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={15}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                  <div
                    className="progress-bar rojo"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[5] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={30}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                  <div
                    className="progress-bar amarillo"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[4] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />

                  <div
                    className="progress-bar azul"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[3] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />

                  <div
                    className="progress-bar morado"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[2] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />

                  <div
                    className="progress-bar naranjo"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[1] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />

                  <div
                    className="progress-bar inactivo"
                    role="progressbar"
                    style={{
                      width:
                        (this.props.data[0] * 100) /
                          this.props.data
                            .reduce((a, b) => a + b, 0)
                            .toString() +
                        "%",
                    }}
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            {this.props.modo === 2 || this.props.modo === 4 ? (
              <div className="bot-description">{this.props.descripcion}</div>
            ) : this.props.modo === 1 || this.props.modo === 3 ? (
              <div style={{ padding: "10px" }} />
            ) : (
              ""
            )}
          </Card>
        </Col>
      );
  }
}
