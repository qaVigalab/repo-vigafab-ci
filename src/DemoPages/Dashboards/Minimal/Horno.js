import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DatePicker from "react-datepicker";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from "reactstrap";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import CialWidget from "./CialWidget";
import DetalleHorno from './DetalleHorno'
import FormDateRangePicker from "./DateRangePicker";

const data = {
  legend: [
    {
      display: false,
      position: "top",
      fullWidth: true,
      reverse: true,
    },
  ],

  labels: ["Inactivo", "Inactivo", "Parada", "Parada", "Producción"],
  datasets: [
    {
      data: [300, 50, 100, 50, 300],
      backgroundColor: ["#d9d9d9", "#25a0fc", "#ffef45", "#ff4560", "#31cc54"],
      hoverBackgroundColor: [
        "#d9d9d9",
        "#25a0fc",
        "#ffef45",
        "#ff4560",
        "#31cc54",
      ],
    },
  ],
};

export default class Horno extends Component {
  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate,
    });
  }

  constructor(props) {
    super(props);

    this.togglePop1 = this.togglePop1.bind(this);

    this.state = {
      modo: 0,
    };
    this.onDismiss = this.onDismiss.bind(this);
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  handleChange2 = date => {
    this.setState({
      endDate: date
    });
  };
  togglePop1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Row>
            <Col>
            <PageTitleAlt3
                heading="HORNO 1"
                subheading="This is an example dashboard created using build-in elements and components."
                icon="lnr-apartment opacity-6"
                empresa="Agrosuper"
                menues={["Hornos"]}
                menu_actual="Horno 1"
              />
            </Col>
            <Col>
              <div align="right">
                <Button className="mb-2 mr-2" color="primary">
                  Descargar como Reporte
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            
            <Col md="12" xl="12">
            <Card className="main-card mb-3">
                <CardBody>
                  <Container>
                    <Row>
                      <Col>
                        <div className="titlecard">Desde</div>

                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <div className="input-group-text">
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                          </InputGroupAddon>
                          <DatePicker
                            className="form-control"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                          />
                        </InputGroup>
                      </Col>
                      <Col>
                        <div className="titlecard">Turno</div>

                        <Input type="select" name="select" id="exampleSelect">
                          <option>Turno 1</option>
                          <option>Turno 2</option>
                          <option>Turno 3</option>
                        </Input>
                      </Col>

                      <Col>
                        <div className="titlecard">Hasta</div>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <div className="input-group-text">
                              <FontAwesomeIcon icon={faCalendarAlt} />
                            </div>
                          </InputGroupAddon>
                          <DatePicker
                            className="form-control"
                            selected={this.state.endDate}
                            onChange={this.handleChange2}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            minDate={this.state.startDate}
                            
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>

            <Col md="12" xl="12">
              <Card className="main-card mb-1">
                <Row>
                  <Col>
                    <div className="flechas">
                      <div align="left">&lt;</div>
                    </div>
                  </Col>
                  <Col>
                    <div className="navegator">
                      <div align="center">
                        7:00 - 14:30 | TURNO 1 | 08 Ene 2020
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="flechas">
                      <div align="right">&gt;</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <div class="columns-parent">
                <Card className="main-card mb-1">
                    <Container>
                        <Row>
                        <Col xs='2'>
                            Hora
                        </Col>
                        <Col xs='2'>
                            Producción
                        </Col>
                        <Col xs='2'>
                            Tiempo de actividad
                        </Col>
                        <Col xs='2'>
                            Tipo
                        </Col>
                        <Col xs='2'>
                            Tiempo
                        </Col>
                        <Col xs='2'>
                            Razón / comentario
                        </Col>
                    </Row>
                    </Container>
                </Card>
            {this.state.modo === 1 || this.state.modo === 0 ? (
              <Row>
                {/* Carta 3  black header*/}
                <DetalleHorno
                  modo={1}
                  estado={1}
                  OE={2090}
                  OET={2500}
                  TA={3}
                  TAT={5}
                  hora={"7:00 - 8:00"}
                  nombre="Horno 1"
                  data={[2.2, 3, 4, 0.8, 0.3, 0.2, 1]}
                  producto={true}
                />
               <DetalleHorno
                  modo={1}
                  estado={1}
                  OE={2090}
                  OET={2500}
                  TA={1}
                  TAT={2}
                  hora={"8:00 - 9:00"}
                  nombre="Horno 1"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                  producto={false}
                />
                <DetalleHorno
                  modo={1}
                  estado={2}
                  OE={2090}
                  OET={2500}
                  TA={2}
                  TAT={8}
                  hora={"9:00 - 10:00"}
                  nombre="Horno 1"
                  data={[2.2, 1, 1, 0.8, 0.3, 0.2, 5]}
                  producto={false}
                />
              </Row>
            ) : (
              ""
            )}

          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
