import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import React, { useState, Fragment, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DatePicker from "react-datepicker";
import moment from 'moment'

import { connect } from "react-redux";
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
  FormGroup,
  Label
} from "reactstrap";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import TortaParos from "./TortaParos";

const TiempoParo = (props) => {

  /* applyCallback(startDate, endDate) {
    setStart(startDate)
    setEnd(endDate)
  } */

  const [tiempoTotal, setTiempoTotal] = useState()
  const [detalleParos, setDetalleParos] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [btnSku, setBtnSku] = useState(0)
  const [sku, setSku] = useState(0)
  const [refresh, setRefresh] = useState(true)


  const handleChange = date => {
    setStartDate(date)
  };
  const handleChange2 = date => {
    setEndDate(date)
  };
  const formatHour = (min) => {
    let horas = min / 60;
    horas = Math.trunc(horas)
    let minutos = min - (60 * horas)
    return horas === 0 ? minutos + " Min" : horas + " Hrs " + minutos + " Min"
  }
  /*  const togglePop1 = () => {
     this.setState({
       popoverOpen1: !this.state.popoverOpen1,
     });
 
   }
   const onDismiss= () => {
     this.setState({ visible: false });
   }  */

  const changeBtnSku = (e) => {
    e.preventDefault();
    btnSku === 1 ? setBtnSku(0) : setBtnSku(1)
    if(btnSku===1) setSku(0);
  }

  const changeSku = (e) => {
    e.target.value.length === 7 ? setSku(e.target.value) : setSku(0)
  }
  const changeBtnBuscar = (e) => {
    e.preventDefault();
    console.log(startDate)
    console.log(endDate)
    setRefresh(!refresh)
  }

  const loadDetalleParo = () => {
    let m = moment();
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    m.toISOString()
    m.format()
    fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getdetalleparo", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        id_vibot: props.id_vibot,
        ini: startDate === undefined ? m : startDate,
        ter: endDate === undefined ? m : endDate
      }),
    })
      .then(response => response.json())
      .then(result => {
        setDetalleParos(result)
        let tiempo_total = 0
        result.forEach(paro => {
          tiempo_total += paro.suma
        });
        setTiempoTotal(tiempo_total)
      }
      )
      .catch(err => {
        console.error(err);
      });
  }
  useEffect(() => {
    loadDetalleParo()
  }, []);

  useEffect(() => {
    loadDetalleParo()
  }, [props.id_vibot]);


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
              heading="Control de Tiempo"
              subheading="This is an example dashboard created using build-in elements and components."
              icon="lnr-apartment opacity-6"
              empresa="Agrosuper"
              menues={[]}
              menu_actual="Control de Tiempo"
            />
          </Col>

        </Row>

        <Row>
          <Col>
            <Card className="main-card mb-3">
              <CardBody>
                <Container>
                  <div className="titlecard">Filtrar Por</div>
                  <Row className="mb-1">
                    <Col>
                      <Button block

                        className="mb-3 mr-1"
                        color="primary">
                        Tiempo
                    </Button>
                    </Col>
                    <Col>
                      <Button block

                        onClick={(e) => changeBtnSku(e)}
                        outline={btnSku === 1 ? false : true}
                        className="mb-3 mr-1"
                        color={btnSku === 1 ? "primary" : "secondary"}>
                        Producto
                    </Button>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Col>
          <Col md="8" xl="9">
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
                          selected={startDate}
                          onChange={(e) => handleChange(e)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
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
                          selected={endDate}
                          onChange={(e) => handleChange2(e)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}

                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Buscar por SKU</Label>
                        <Input
                          onChange={(e) => changeSku(e)}
                          size="md"
                          className="mt-2"
                          type="text"
                          name="sku"
                          id="sku"
                          placeholder="SKU"
                          disabled={btnSku === 0 ? true : false}
                        />

                      </FormGroup>
                    </Col>
                    <Col >
                      <Label></Label>
                      <Button className="mt-3" size="lg" block color="primary" onClick={(e) => changeBtnBuscar(e)}> Buscar</Button>
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
                    refresh={refresh}
                    vibot={6296}
                    ini={startDate}
                    ter={endDate}
                    sku={sku}
                  />


                  <TortaParos
                    refresh={refresh}
                    vibot={34828}
                    ini={startDate}
                    ter={endDate}
                    sku={sku}
                  />

                  <TortaParos
                    refresh={refresh}
                    vibot={23608}
                    ini={startDate}
                    ter={endDate}
                    sku={sku}
                  />
                  <TortaParos
                    refresh={refresh}
                    vibot={30776}
                    ini={startDate}
                    ter={endDate}
                    sku={sku}
                  />
                  <TortaParos
                    refresh={refresh}
                    vibot={32818}
                    ini={startDate}
                    ter={endDate}
                    sku={sku}
                  />
                  <TortaParos
                    refresh={refresh}
                    vibot={23643}
                    ini={startDate}
                    ter={endDate}
                    sku={sku}
                  />

                  <Col xs="12" >

                    Detalle

                        <Table size="sm">
                      <tbody>
                        {
                          detalleParos.map((paro, i) =>

                            <tr>
                              <td style={{ width: "33%" }}>
                                <Brightness1Icon className={paro.id_tipo === 100 ? "blue"
                                  : paro.id_tipo === 99 ? "red"
                                    : paro.id_tipo === 1 ? "paro1"
                                      : paro.id_tipo === 2 ? "paro2"
                                        : paro.id_tipo === 3 ? "paro3"
                                          : paro.id_tipo === 4 ? "paro4"
                                            : paro.id_tipo === 5 ? "paro5"
                                              : paro.id_tipo === 6 ? "paro6"
                                                : paro.id_tipo === 7 ? "paro7"
                                                  : paro.id_tipo === 8 ? "paro8"
                                                    : paro.id_tipo === 9 ? "paro9"
                                                      : paro.id_tipo === 10 ? "paro10"
                                                        : paro.id_tipo === 11 ? "paro11"
                                                          : paro.id_tipo === 12 ? "paro12"
                                                            : paro.id_tipo === 13 ? "paro13"
                                                              : paro.id_tipo === 14 ? "paro14"
                                                                : paro.id_tipo === 15 ? "paro15"
                                                                  : "gray"} />
                                {paro.nombre}
                              </td>

                              <td style={{ width: "33%" }}>
                                <Progress
                                  value={paro.suma / tiempoTotal * 100}
                                  color={paro.id_tipo === 100 ? "blue"
                                    : paro.id_tipo === 99 ? "red"
                                      : paro.id_tipo === 1 ? "paro1"
                                        : paro.id_tipo === 2 ? "paro2"
                                          : paro.id_tipo === 3 ? "paro3"
                                            : paro.id_tipo === 4 ? "paro4"
                                              : paro.id_tipo === 5 ? "paro5"
                                                : paro.id_tipo === 6 ? "paro6"
                                                  : paro.id_tipo === 7 ? "paro7"
                                                    : paro.id_tipo === 8 ? "paro8"
                                                      : paro.id_tipo === 9 ? "paro9"
                                                        : paro.id_tipo === 10 ? "paro10"
                                                          : paro.id_tipo === 11 ? "paro11"
                                                            : paro.id_tipo === 12 ? "paro12"
                                                              : paro.id_tipo === 13 ? "paro13"
                                                                : paro.id_tipo === 14 ? "paro14"
                                                                  : paro.id_tipo === 15 ? "paro15"
                                                                    : "gray"}
                                  max={100}
                                />
                              </td>
                              <td style={{ width: "33%" }}>{formatHour(paro.suma)}</td>
                            </tr>
                          )}
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

const mapStateToProps = (state) => ({
  id_vibot: state.dashboardReducers.id_vibot,
});

export default connect(mapStateToProps)(TiempoParo);