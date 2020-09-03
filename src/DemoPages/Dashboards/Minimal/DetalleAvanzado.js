import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Brightness1Icon from "@material-ui/icons/Brightness1";
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
  Progress,
  Row,
  Table,
} from "reactstrap";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import Bar from "./Bar";
import FormDateRangePicker from "./DateRangePicker";
import "./style.css";
import TimeLine from "./TimeLine";
export default class DetalleAvanzado extends Component {
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

  togglePop1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1,
    });
  }

  onDismiss() {
    this.setState({ visible: false });
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
        "Inactivo",
        "Naranjo",
        "Microparo",
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
                menues={["Hornos", "Horno 1"]}
                menu_actual="Detalle"
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
                        <div className="titlecard">Ver Fecha</div>

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
                        <div className="titlecard">Ver Rango Especifico</div>
                        <InputGroup>
                          <FormDateRangePicker />
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
            <Card className="main-card mb-3" style={{ height: "auto" }}>
              <div className="centralbody2">
                <Container>
                  <Row>
                    <Col xs="12">
                      <Progress multi>
                        <Progress bar value="15" max={100} />
                        <Progress bar color="success" value="30" max={100} />
                        <Progress bar color="info" value="25" max={100} />
                        <Progress bar color="warning" value="10" max={100} />
                        <Progress bar color="success" value="10" max={100} />
                        <Progress bar color="danger" value="15" max={100} />
                      </Progress>
                    </Col>
                    <Col xs={12}>
                      <TimeLine />
                    </Col>
                    <Col xs="12">
                      <Bar />
                    </Col>
                    <Col xs="12">
                      <Table size="sm">
                        <tbody>
                          <tr>
                            <td style={{ width: "33%" }}>
                              <Brightness1Icon style={{ color: "#31cc54" }} />
                              Produciendo
                            </td>

                            <td style={{ width: "33%" }}>
                              <Progress
                                value="90"
                                color="produccion"
                                max={100}
                              />
                            </td>
                            <td style={{ width: "33%" }}>00:01 hras</td>
                          </tr>
                          <tr>
                            <td>
                              <Brightness1Icon style={{ color: "#ff4560" }} />
                              Paro
                            </td>

                            <td>
                              <Progress value="15" color="rojo" max={100} />
                            </td>
                            <td>00:01 hras</td>
                          </tr>
                          <tr>
                            <td>
                              <Brightness1Icon style={{ color: "#feb018" }} />
                              Paro
                            </td>
                            <td>
                              <Progress value="70" color="naranjo" max={100} />
                            </td>
                            <td>00:01 hras</td>
                          </tr>
                          <tr>
                            <td>
                              <Brightness1Icon style={{ color: "#25a0fc" }} />
                              Paro
                            </td>
                            <td>
                              <Progress value="30" color="azul" max={100} />
                            </td>
                            <td>00:01 hras</td>
                          </tr>
                          <tr>
                            <td>
                              <Brightness1Icon style={{ color: "#775dd0" }} />
                              Microparo
                            </td>
                            <td>
                              <Progress value="50" color="morado" max={100} />
                            </td>
                            <td>00:01 hras</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Container>
              </div>

              <div style={{ padding: "11px" }} />

              {this.props.modo === 2 || this.props.modo === 4 ? (
                <div className="bot-description">{this.props.descripcion}</div>
              ) : this.props.modo === 1 || this.props.modo === 3 ? (
                <div style={{ padding: "10px" }} />
              ) : (
                ""
              )}
            </Card>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
