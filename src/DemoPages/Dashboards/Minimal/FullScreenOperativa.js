import React, { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button, Col, Card, Table, Row } from "reactstrap";
import _ from "lodash";
import moment from 'moment'
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TimeLineOperativo from "./TimeLineOperativo";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function FullSceen() {
  const handle = useFullScreenHandle();

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

  const [tiempoOrden, setTiempoOrden] = useState(0);
  const [horaTermino, setHoraTermino] = useState("");
  const [reportesSelected, setReportesSelected] = useState([]);
  const loadData = () => {
    fetch(global.api.dashboard.gettimelineoperativo, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(r => {
      var reportesSel = r.filter(rep => !rep.hora_inicio.includes('05:55') && rep.id_sub_orden === ordenSelected.id_sub_orden);
      const startMoment = moment(reportesSel[0].hora_inicio);
      const endMoment = moment(reportesSel[reportesSel.length-1].hora_termino);
      const diff = endMoment.diff(startMoment);
      const diffDuration = moment.duration(diff);
      setTiempoOrden(diffDuration.hours() + diffDuration.minutes()/60);
      setHoraTermino(moment(reportesSel[0].hora_inicio).add(ordenSelected.tiempo_estimado + 3, 'hours').format('HH:MM'));
      setReportesSelected(r);
    })
    .catch(err => {
      console.error(err);
    });
  }

  const [ordenes, setOrdenes] = useState([]); 
  const [ordenSelected, setOrdenSelected] = useState({});
  const [fechaOrdenes, setFechaOrdenes] = useState(moment().format('YYYY-MM-DD'));
  const loadOrdenes = () => {
    const query = fetch(global.api.dashboard.getOrdenesResumen, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        fecha: fechaOrdenes
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      if (result.length >= 1) {
        setOrdenes(result);
        var ord = result.find(e => e.id_estado === 1);
        if (ord != undefined)
          setOrdenSelected(ord);
        else
          setOrdenSelected({});
      } else {
        setOrdenes([]);
        setOrdenSelected({});
      }
    })
    .catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
      console.log("recargando")
    }, 60000);
    return () => clearInterval(interval);
  }, [ordenSelected]);

  useEffect(() => {
    loadOrdenes();
  },[]);

  return (
    <div>
      <Button onClick={handle.enter}>
        Ver Fullscreen
      </Button>

      <FullScreen handle={handle} >
        <div className={handle.active ? "fullscreen-space" : "fullscreen-space d-none"} >
          {/* Cabecera de la vista */}
          <Row className="fullscreen-nav">
            <Col>
              <div className="app-header__logo2">
                <div className="logo-src2" style={{ backgroundImage: `url(${localStorage.getItem("img")})` }}/>
              </div>
            </Col>
            <Col className="bigFont2 mt-4 mr-5" align="right">
              {moment().format('DD-MM-YYYY')} 
              <WatchLaterOutlinedIcon style={{ fontSize: 30 }} className="mb-1 ml-4 mr-1" />
              {moment().format("HH:mm")}
            </Col>
          </Row>

          {/* Cuadro de la izquierda */}
          <Row className="fullscreen-centerSpace-op">
            <Col xl="3" className="fullscreen-center1" >
              <Row className={ordenSelected.real_kg > (ordenSelected.kg_hora*tiempoOrden) ? "fullscreen-center1-head-op" : "fullscreen-center1-head-op2"}>
                <Col className="bigFont5 p-3 ml-3">
                  {ordenSelected.real_kg>(ordenSelected.kg_hora*tiempoOrden) ? _.toUpper("Estado: A tiempo") : _.toUpper("Estado: Atrasado")}
                </Col>
                <Col xs="3" md="3" className="font1 mt-2 ml-2">
                  {ordenSelected.real_kg>(ordenSelected.kg_hora*tiempoOrden) ? (
                  < CheckCircleOutlineIcon style={{ fontSize: 50 }} />
                   ) :(
                    <ErrorOutlineIcon style={{ fontSize: 50 }}/>)}
                </Col>
              </Row>

              <Row className="fullscreen-center1-body1-op">
                <Col xl="4">
                  <div align="left" className="littleFont2 ml-3 mt-3">{_.toUpper("Prioridad")}</div>
                  <div align="left" className="bigFont4 ml-3 mt-0">N° {" "+ordenSelected.prioridad}</div>
                </Col>
                <Col xl="8">
                  <div align="left" className="littleFont2 ml-3 mt-3">{_.toUpper("Hora de Término")}</div>
                  <div align="left" className="bigFont4 ml-5 mt-0">{horaTermino}</div>
                </Col>
              </Row>

              <Row className="fullscreen-center1-body2-op blackBorder2  pt-2 pb-3">
                <pre align="left" className=" text-uppercase littleFont2 pl-2 mt-2">{"Producción \nReal"} </pre>
                <div align="right" className="ml-3 mt-2 bigFont4"> {formatNumber.new(_.round(ordenSelected.real_kg/ordenSelected.kg_solicitados*100))}% - {formatNumber.new(_.round(ordenSelected.real_kg))} Kg</div>
              </Row>

              <Row className="fullscreen-center1-body2-op pt-2 pb-3">
                <pre align="left" className="text-uppercase littleFont2 mt-2 pl-3 ml-2">{"Producción \nEstimada"} </pre>
                <div align="right" className="ml-3 mt-2 bigFont4">{formatNumber.new(_.round((ordenSelected.kg_hora*(tiempoOrden))/ordenSelected.kg_solicitados*100))}% - {formatNumber.new(_.round(ordenSelected.kg_hora*tiempoOrden))} Kg</div>
              </Row>   
            </Col>

            <Col xl="7">
              <Card className="fullscreen-center2-op" >
                <Table className="mt-0 ">
                  <thead className="fullscreen-theadBlue">
                    <tr className="text-center">
                      <th className="border1">N° de Orden</th>
                      <th>SKU</th>
                      <th>Producto</th>
                      <th>Producción Real</th>
                      <th>Tiempo</th>
                      <th> Reales vs Program.</th>
                      <th>% Cumplim.</th>
                      <th>Rechazo Envasado</th>
                      <th className="border2">Rechazo Rayos x</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      ordenes.map((orden, i) =>
                        orden.id_sub_orden ? (
                          <tr key={i}
                            className={orden.id_estado == 1 ? "orangeRow" :
                              "text-center"}
                          >
                            <td>{orden.id_sub_orden}</td>
                            <td>{orden.sku}</td>
                            <td>{orden.producto}</td>
                            <td>{orden.tiempo_total === 0 ? 0 + " Caj/min" : formatNumber.new(_.round(orden.cajas_acumuladas/orden.tiempo_total, 1)) + " Caj/min"}</td>
                            <td>
                              {formatNumber.new(_.round(orden.tiempo_estimado, 2)) + " hrs"}
                            </td>
                            <td>{formatNumber.new(orden.cajas_acumuladas)+" / "+formatNumber.new(orden.cajas)} </td>
                            <td>
                              {orden.kg_porcentual == null
                                ? "0 %"
                                  : formatNumber.new(_.round(orden.kg_porcentual, 2)) + " %"}
                            </td>
                            <td>{formatNumber.new(_.round(orden.hamb_formadas - orden.hamb_envasadas)) + " "} U</td>
                            <td>{formatNumber.new(_.round(orden.hamb_envasadas - (orden.cajas_acumuladas*orden.kg_caja*1000/orden.g_hamburguesa))) + " "} U</td>
                          </tr>
                        ) : (
                          ""
                        )
                      )
                    }
                  </tbody>
                </Table>
              </Card>
            </Col>

            <Col className="fullscreen-center3-op">
              <Card className="p-0 fullscreen-centerMaquina-op">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mr-2 mt-2 mb-2">Iqf</div>
                <div align="center" className="littleFontGreen blackBorderTop pt-3 mb-1">Temp. Entrada</div>
                <div align="center" className="bigFontGreen mb-3">{formatNumber.new(_.round(ordenSelected.temp_entrada, 2))}° C</div>

                <div align="center" className="littleFontGreen blackBorderTop pt-3 mb-1">Tiempo Retencion</div>
                <div align="center" className="bigFontGreen mb-3 ">{/* formatNumber.new(_.round(TiempoRetencion, 2)) */ ordenSelected.tiempo_retencion_iqf} Min</div>

                <div align="center" className="littleFontGreen blackBorderTop pt-3 mb-1">Temp. Salida</div>
                <div align="center" className="bigFontGreen mb-3 ">{/* formatNumber.new(_.round(TiempoRetencion, 2)) */} -18° C </div>

              </Card>
            </Col>
          </Row>
          <Row className="fullscreen-botSpace-op">
            <Col xl="12" className="mt-5">
              <Card >
                <TimeLineOperativo reportesSelected={reportesSelected} />
              </Card>

            </Col>
          </Row>
        </div>
      </FullScreen>
    </div>
  );
}

export default FullSceen;