import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import React, { useState, Fragment, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DatePicker from "react-datepicker";
import moment from 'moment';

import { connect } from "react-redux";
import { 
  Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, Progress, Row, Table, FormGroup, Label
} from "reactstrap";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import TortaParos from "./TortaParos";

const TiempoParo = (props) => {
  let m = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const [tiempoTotal, setTiempoTotal] = useState();
  const [tiempoOperativo, setTiempoOperativo] = useState();
  const [tiempoMantenimiento, setTiempoMantenimiento] = useState();
  const [detalleParos, setDetalleParos] = useState([]);
  const [detalleOperativos, setDetalleOperativos] = useState([]);
  const [detalleMantenimiento, setDetalleMantenimiento] = useState([]);
  const [detalleSelected, setDetalleSelected] = useState([]);
  const [tituloSelected, setTituloSelected] = useState();
  const [tiempoSelected, setTiempoSelected] = useState();
  const [startDate, setStartDate] = useState(new Date(m));
  const [endDate, setEndDate] = useState(new Date(m));
  const [btnSku, setBtnSku] = useState(0);
  const [sku, setSku] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const handleChange = (date) => {
    setStartDate(date)
  };

  const handleChange2 = (date) => {
    setEndDate(date)
  };

  const formatHour = (min) => {
    let horas = min / 60;
    horas = Math.trunc(horas)
    let minutos = min - (60 * horas)
    return horas === 0 ? minutos + " Min" : horas + " Hrs " + minutos + " Min"
  };

  const changeBtnSku = (e) => {
    e.preventDefault();
    btnSku === 1 ? setBtnSku(0) : setBtnSku(1)
    if (btnSku === 1) setSku(0);
  };

  const changeSku = (e) => {
    e.target.value.length === 7 ? setSku(e.target.value) : setSku(0)
  };

  const changeBtnBuscar = (e) => {
    e.preventDefault();
    setRefresh(!refresh);
    setDetalleSelected([]);
  };

  const updateDetalle = (e, titulo, detalle, tiempo) => {
    e.preventDefault();

    setTituloSelected(titulo);
    setDetalleSelected(detalle);
    setTiempoSelected(tiempo);
  };

  const loadDetalleParo = () => {
    let m = moment();
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    m.toISOString();
    m.format();

    fetch(global.api.dashboard.getdetalleparo, {
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
      var paros = [], operativos = [], mantenimiento = [];
      for (var i = 0; i < result.length; i++) {
        /* Se settea la información general de los paros */
        var found = false, pos = -1;
        for (var j = 0; j < paros.length; j++) {
          if (result[i].id_tipo === paros[j].id_tipo) {
              found = true; pos = j;
              break;
          }
        }

        if (found) {
          paros[pos].suma += result[i].suma;
        } else {
          var obj = {
            id_tipo: result[i].id_tipo,
            suma: result[i].suma,
            nombre: result[i].nombre
          }
          paros.push(obj);
        }

        /* Se settea el detalle de los operativos */
        if (result[i].nombre === "Operativo") {
          found = false; pos = -1;
          for (j = 0; j < operativos.length; j++) {
            if (result[i].ambito === operativos[j].ambito) {
                found = true; pos = j;
                break;
            }
          }

          if (found) {
            operativos[pos].suma += result[i].suma;
          } else {
            obj = {
              suma: result[i].suma,
              ambito: result[i].ambito
            }
            operativos.push(obj);
          }
        }

        /* Se settea el detalle de los de mantenimiento */
        if (result[i].nombre === "Mantenimiento") {
          console.log(result[i].nombre);
          found = false; pos = -1;
          for (j = 0; j < mantenimiento.length; j++) {
            if (result[i].ambito === mantenimiento[j].ambito) {
                found = true; pos = j;
                break;
            }
          }

          if (found) {
            mantenimiento[pos].suma += result[i].suma;
          } else {
            obj = {
              suma: result[i].suma,
              ambito: result[i].ambito
            }
            mantenimiento.push(obj);
          }
        }
      }

      paros.sort((a, b) => b.suma - a.suma);
      operativos.sort((a, b) => b.suma - a.suma);
      mantenimiento.sort((a, b) => b.suma - a.suma);

      setDetalleParos(paros);
      setDetalleOperativos(operativos);
      setDetalleMantenimiento(mantenimiento);

      let tiempo_total = 0, tiempo_operativo = 0, tiempo_mantenimiento = 0;
      paros.forEach(paro => {
        tiempo_total += paro.suma;
      });
      operativos.forEach(paro => {
        tiempo_operativo += paro.suma;
      });
      mantenimiento.forEach(paro => {
        tiempo_mantenimiento += paro.suma;
      });

      setTiempoTotal(tiempo_total);
      setTiempoOperativo(tiempo_operativo);
      setTiempoMantenimiento(tiempo_mantenimiento);
    })
    .catch(err => {
      console.error(err);
    });
  };

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

        <Row md="12" xl="12">
          <Col md="4" xl="3">
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
                          dateFormat="dd/MM/yyyy"
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
                          dateFormat="dd/MM/yyyy"
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

                  {detalleParos.length > 0 ?
                    <Col xs="12" >
                      Detalle
                      <Table size="sm" style={{marginTop: '1%'}}>
                        <tbody>
                          {
                            detalleParos.map((paro, i) =>
                              <tr key={i}>
                                <td style={{ width: "33%" }}>
                                  <Brightness1Icon className={paro.id_tipo === 100 ? "blue"
                                    : paro.id_tipo === 99 ? "red"
                                    : paro.nombre !== "Produciendo" && paro.nombre !== "Paro no justificado" && i === 0 ? "paro1"
                                    : i === 1 ? "paro1" : i === 2 ? "paro2"
                                    : i === 3 ? "paro3" : i === 4 ? "paro4"
                                    : i === 5 ? "paro5" : i === 6 ? "paro6"
                                    : i === 7 ? "paro7" : i === 8 ? "paro8"
                                    : i === 9 ? "paro9" : i === 10 ? "paro10"
                                    : i === 11 ? "paro11" : i === 12 ? "paro12"
                                    : i === 13 ? "paro13" : i === 14 ? "paro14"
                                    : i === 15 ? "paro15" : "gray"} style={{marginRight: '2%'}} />
                                  {
                                    paro.nombre === "Operativo" ?
                                      <a style={{color: '#6e767e'}} href="/"
                                          onClick={e => updateDetalle(e, "Operativo", detalleOperativos, tiempoOperativo)} 
                                          className={"active"}>{paro.nombre.slice(0,1).toUpperCase() + paro.nombre.slice(1, paro.nombre.length)}</a>
                                    : paro.nombre === "Mantenimiento" ?
                                      <a style={{color: '#6e767e'}} href="/"
                                          onClick={e => updateDetalle(e, "Mantenimiento", detalleMantenimiento, tiempoMantenimiento)}
                                          className={"active"}>{paro.nombre.slice(0,1).toUpperCase() + paro.nombre.slice(1, paro.nombre.length)}</a>
                                    : paro.nombre.slice(0,1).toUpperCase() + paro.nombre.slice(1, paro.nombre.length)
                                  }
                                </td>

                                <td style={{ width: "33%" }}>
                                  <Progress
                                    value={paro.suma / tiempoTotal * 100}
                                    color={paro.id_tipo === 100 ? "blue"
                                    : paro.id_tipo === 99 ? "red"
                                    : paro.nombre !== "Produciendo" && paro.nombre !== "Paro no justificado" && i === 0  ? "paro1"
                                    : i === 1 ? "paro1" : i === 2 ? "paro2"
                                    : i === 3 ? "paro3" : i === 4 ? "paro4"
                                    : i === 5 ? "paro5" : i === 6 ? "paro6"
                                    : i === 7 ? "paro7" : i === 8 ? "paro8"
                                    : i === 9 ? "paro9" : i === 10 ? "paro10"
                                    : i === 11 ? "paro11" : i === 12 ? "paro12"
                                    : i === 13 ? "paro13" : i === 14 ? "paro14"
                                    : i === 15 ? "paro15" : "gray"}
                                    max={100}
                                  />
                                </td>
                                <td style={{ width: "33%" }}>{formatHour(paro.suma)}</td>
                              </tr>
                            )
                          }
                        </tbody>
                      </Table>
                    </Col>
                    : ""
                  }

                  {detalleSelected.length > 0 ?
                    <Col xs="7" >
                      Detalle de Paros - {tituloSelected}
                      <Table size="sm" style={{marginTop: '1%'}}>
                        <tbody>
                          {
                            detalleSelected.map((paro, i) =>
                              <tr key={i}>
                                <td style={{ width: "33%" }}>
                                  <Brightness1Icon className={
                                      i === 1 ? "paro1" : i === 2 ? "paro2"
                                    : i === 3 ? "paro3" : i === 4 ? "paro4"
                                    : i === 5 ? "paro5" : i === 6 ? "paro6"
                                    : i === 7 ? "paro7" : i === 8 ? "paro8"
                                    : i === 9 ? "paro9" : i === 10 ? "paro10"
                                    : i === 11 ? "paro11" : i === 12 ? "paro12"
                                    : i === 13 ? "paro13" : i === 14 ? "paro14"
                                    : i === 15 ? "paro15" : "blue"} style={{marginRight: '5%'}} />
                                  {paro.ambito.slice(0,1).toUpperCase() + paro.ambito.slice(1, paro.ambito.length)}
                                </td>

                                <td style={{ width: "33%" }}>
                                  <Progress
                                    value={paro.suma / tiempoSelected * 100}
                                    color={
                                      i === 1 ? "paro1" : i === 2 ? "paro2"
                                    : i === 3 ? "paro3" : i === 4 ? "paro4"
                                    : i === 5 ? "paro5" : i === 6 ? "paro6"
                                    : i === 7 ? "paro7" : i === 8 ? "paro8"
                                    : i === 9 ? "paro9" : i === 10 ? "paro10"
                                    : i === 11 ? "paro11" : i === 12 ? "paro12"
                                    : i === 13 ? "paro13" : i === 14 ? "paro14"
                                    : i === 15 ? "paro15" : "blue"}
                                    max={100}
                                  />
                                </td>
                                <td style={{ width: "33%" }}>{formatHour(paro.suma)}</td>
                              </tr>
                            )
                          }
                        </tbody>
                      </Table>
                    </Col>
                    : ""
                  }
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