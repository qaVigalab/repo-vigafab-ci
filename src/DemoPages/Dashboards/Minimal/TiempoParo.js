import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DatePicker from "react-datepicker";
import moment from 'moment'
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
import TortaParos from "./TortaParos";

export default class TiempoParo extends Component {
  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate
    });
  }

  constructor(props) {
    super(props);

    this.togglePop1 = this.togglePop1.bind(this);
    this.verDetalle = this.verDetalle.bind(this);

    this.state = {
      modo: 0,
      id_vibot:6296
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
  verDetalle = (id_vibot,e) =>{
    console.log(id_vibot)
  }
  componentDidMount() {
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
                heading="ANÁLISIS"
                subheading="This is an example dashboard created using build-in elements and components."
                icon="lnr-apartment opacity-6"
                empresa="Agrosuper"
                menues={[]}
                menu_actual="Análisis"
              />
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
</Row>

          <Fragment>

            <Card className="main-card mb-3">
              <CardBody>
                <Container>
                  <Row>
                    <TortaParos
                        id_vibot={6296}
                        ini={this.state.startDate }
                        ter={this.state.endDate }
                      /> 
                      <TortaParos
                        id_vibot={34828}
                        ini={this.state.startDate }
                        ter={this.state.endDate }

                        onClick={this.verDetalle(34828)}
                      />
                      <TortaParos
                        id_vibot={23608}
                        ini={this.state.startDate }
                        ter={this.state.endDate }
                      />
                      <TortaParos
                        id_vibot={30776}
                        ini={this.state.startDate }
                        ter={this.state.endDate }
                        />
                      <TortaParos
                        id_vibot={32818}
                        ini={this.state.startDate }
                        ter={this.state.endDate }
                      /><TortaParos
                      id_vibot={23643}
                      ini={this.state.startDate }
                        ter={this.state.endDate }
                    />

                    <Col xs="12" >
                      
                      Detalle
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
                              <Progress
                                value="70"
                                color="naranjo"
                                max={100}
                              />
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
                    <Col xs="12">
                      Producto
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
                              <Progress
                                value="70"
                                color="naranjo"
                                max={100}
                              />
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
              </CardBody>
            </Card>
          </Fragment>

        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
