import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row, Progress } from "reactstrap";
import Chart from 'react-apexcharts'

export default class Iqf extends Component {
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
        "Inactivo",
        "Naranjo",
        "Morado",
        "Azul",
        "Amarillo",
        "Rojo",
        "Producción",
      ],
      datasets: [
        {
          data: this.props.data,
          backgroundColor: [
            "#d9d9d9",
            "#feb018",
            "#775dd0",
            "#25a0fc",
            "#ffef45",
            "#ff4560",
            "#31cc54",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#feb018",
            "#775dd0",
            "#25a0fc",
            "#ffef45",
            "#ff4560",
            "#31cc54",
          ],
        },
      ],
    };

    this.state = {
      options2: {
          stroke:{
              show: true,
              width: 2,
              curve:'smooth'
          },
          
          chart: {
              id: 'DetalleAvanzadoPorKilo'
          },
          dataLabels: {
              enabled: false,
              
          },
          plotOptions: {
              bar: {
                  columnWidth: '95%',
                  horizontal: false,
                  
              }
          },
          xaxis: {
              categories: [
              '07:00 - 07:05', 
              '07:05 - 07:10', 
              '07:10 - 07:15', 
              '07:15 - 07:20', 
              '07:20 - 07:25', 
              '07:25 - 07:30', 
              '07:30 - 07:35', 
              '07:35 - 07:40',
              '07:40 - 07:45', 
              '07:45 - 07:50', 
              '07:50 - 07:55', 
              '07:55 - 08:00'
              ],
              labels:{
                  show:true,
                  rotate:-45
              }
          },
          
      },
      
      series2: [{
         
          name: 'Kg',
          type: 'line',
          data: [
              50, 
              505, 
              414, 
              671, 
              227, 
              413, 
              201, 
              352, 
              752, 
              320, 
              257, 
              160]
        }, ],
  }

    
      return (
        <Col xs="12">
          <Card className="main-card mb-3">
            {/* header */}
            
             
            <Container
                className={
                  this.props.modo === 1 || this.props.modo === 2
                    ? ""
                    : "darkbackground"
                }
              >
                <Row>
                  <Col xs={4}>
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
                      
                    </div>
                  </Col>
                  {/* <Col xs={2}>
                  <div>
                        <div
                          className={
                            this.props.modo === 1 || this.props.modo === 2
                              ? "indi tizq"
                              : "indi text-white tizq"
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
                  </Col>
                  <Col xs={6}>
                    <div className="tde">
                     
                      <div>
                        <font color="gray">Productividad / 3.8 hrs Tiempo de Activida / Produciendo</font>
                      </div>
                    
                    </div>

                    <div />
                  </Col> */}
                </Row>
                {this.props.modo === 3 || this.props.modo === 4 ? (
                  <div style={{ padding: "10px" }} />
                ) : (
                  <hr />
                )}
                <Row >
                  
                  <Col xs={6}>
                  <Chart 
                  options={this.state.options2} 
                  series={this.state.series2} 
                  type="line" 
                  width="100%"
                  height="200px"
                  />

                </Col>
               
                <Col xs={6}>
                  
                  <Chart 
                  options={this.state.options2} 
                  series={this.state.series2} 
                  type="line" 
                  width="100%"
                  height="200px"
                  />

                </Col>
                </Row>
              </Container>
            
              <div className="bot-description">{this.props.descripcion}</div>
          </Card>
        </Col>
      );
  }
}
