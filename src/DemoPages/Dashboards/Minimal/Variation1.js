import React, { Fragment, useState, useEffect } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import moment from 'moment';
import { connect } from "react-redux";
import { Card, Col, Row } from "reactstrap";

import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import GenerarExcel from "./GenerarExcel";
import NuevaOrden from "./NuevaOrden";
import Orden from "./Orden";
import Produciendo from "./Produciendo";
import Formadora2 from "./Formadora2";
//import Iqf2 from "./Iqf2";
import CialWidget from "./CialWidget";
import TotalEnvasadoras from "./TotalEnvasadoras";
import Empaque from "./Empaque";

const MinimalDashboard1 = () => {
  /* Se declaran variables que no serán modificadas durante el uso de la vista */
  const [modo, setModo] = useState(0);
  const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));

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

  /* Se consulta a la API para obtener el listado de Envasadoras */
  const [maquinas, setMaquinas] = useState([]);
  const getMaquinas = (tipo) => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ maquina: tipo });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      global.api.dashboard.getmaquinas,
      requestOptions
    )
    .then((response) => response.json())
    .then((result) => {
      setMaquinas(result);
    })
    .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    setMaquinas([]);
    getMaquinas("Envasadora");
  }, []);

  /* Se consulta a la API para obtener, sólo una vez, el listado de productos */
  const [productos, setProductos] = useState([]);
  const loadProductos = () => {
    fetch(
      global.api.dashboard.getproducto,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
        },
        body: false,
      }
    )
    .then((response) => response.json())
    .then((result) => {
      setProductos(result);
    })
    .catch((err) => {
      console.error(err);
    });
  }

  /* Se consulta por el listado de productos sólo al arrancar la vista */
  useEffect(() => {
    loadProductos();
  }, []);

  /* Se consulta a la API para obtener la información de las órdenes diarias */
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSelected, setOrdenSelected] = useState({});
  const [fechaOrdenes, setFechaOrdenes] = useState(moment().format('YYYY-MM-DD'));
  const loadOrdenes = (id_orden) => {
    fetch(global.api.dashboard.getOrdenesResumen, {
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
        if (id_orden === "") {
          if (result.find(e => e.id_estado === 1))
            setOrdenSelected(result.find(e => e.id_estado === 1));
          else
            setOrdenSelected(result[0]);
        }
        else if (id_orden === -1)
          setOrdenSelected(result[0]);
        else
          setOrdenSelected(result.find(e => e.id_sub_orden === id_orden));
      } else {
        setOrdenes([]);
        setOrdenSelected({});
      }
    })
    .catch((err) => {
      console.error(err);
    });
  };

  /* Se cargan las órdenes del día, actualizando la variable que define a la orden seleccionada */
  const updateOrden = (orden) => {
    loadOrdenes(orden);
  }

  /* Se actualiza la fecha de las órdenes a cargar desde el componente Orden */
  const updateFecha = (fecha) => {
    setFechaOrdenes(fecha);
  }

  /* Se obtiene el listado de órdenes correspondiente a la fecha seleccionada */
  useEffect(() => {
    var date = new Date(fechaOrdenes);
    if (moment(new Date(date.setHours(date.getHours() + 3))).format('YYYY-MM-DD') != moment().format('YYYY-MM-DD'))
      loadOrdenes(-1);
    else
      loadOrdenes("");
  }, [fechaOrdenes]);

  /* Se consulta a la API el detalle de los reportes por máquina de la orden en curso */
  const [reportesSelected, setReportesSelected] = useState([]);
  const loadReportes = () => {
    const query = fetch(global.api.dashboard.getReportesByOrden, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        id_orden: ordenSelected.id_sub_orden
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      setReportesSelected(result);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  /* Debug: Se imprime el listado de órdenes del día en curso y la orden seleccionada en el listado */
  /* Se actualiza el detalle de los reportes asociados a la orden seleccionada */
  useEffect(() => {
    if (ordenSelected != {})
      loadReportes();
  }, [ordenSelected]);

  /* Se crean las variables de estado que almacenarán la disponibildad y eficiencia de cada máquina */
  const [disponibilidadFormadora, setDisponibilidadFormadora] = useState(0);
  const [disponibilidadEnvasadoras, setDisponibilidadEnvasadoras] = useState(0);
  const [disponibilidadEmpaquetadora, setDisponibilidadEmpaquetadora] = useState(0);

  const [eficienciaFormadora, setEficienciaFormadora] = useState(0);
  const [eficienciaEnvasadoras, setEficienciaEnvasadoras] = useState(0);
  const [eficienciaEmpaquetadora, setEficienciaEmpaquetadora] = useState(0);

  const updateKPIs = (tipo, disp, efi) => {
    if (tipo === 2){
      setDisponibilidadFormadora(disp);
      setEficienciaFormadora(efi);
    } else if (tipo === 4){
      setDisponibilidadEnvasadoras(disp);
      setEficienciaEnvasadoras(efi);
    } else if (tipo === 5){
      setDisponibilidadEmpaquetadora(disp);
      setEficienciaEmpaquetadora(efi);
    }
  };

  return (
    <div>
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
                heading="VISTA GENERAL"
                subheading="This is an example dashboard created using build-in elements and components."
                icon="lnr-apartment opacity-6"
                empresa="Agrosuper"
                menues={[]}
                menu_actual="Vista General"
              />
            </Col>
          </Row>

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <GenerarExcel 
                  formatNumber={formatNumber}
                />
              </Card>
            </Col>
          </Row>

          {perfil == 1 || perfil == 2 ? (
            <Row>
              <Col md="12" xl="12">
                <Card className="main-card mb-3">
                  <NuevaOrden
                    productos={productos}
                  />
                </Card>
              </Col>
            </Row>
          ) : (
            ""
          )}

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <Orden
                  formatNumber={formatNumber}
                  productos={productos}
                  ordenes={ordenes}
                  ordenSelected={ordenSelected}
                  fechaOrdenes={fechaOrdenes}
                  updateOrden={id_orden => updateOrden(id_orden)}
                  updateFecha={fecha => updateFecha(fecha)}
                />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <Produciendo 
                  formatNumber={formatNumber}
                  maquinas={maquinas}
                  ordenes={ordenes}
                  ordenSelected={ordenSelected}
                  reportesSelected={reportesSelected}
                  disponibilidadFormadora={disponibilidadFormadora}
                  disponibilidadEnvasadoras={disponibilidadEnvasadoras}
                  disponibilidadEmpaquetadora={disponibilidadEmpaquetadora}
                  eficienciaFormadora={eficienciaFormadora}
                  eficienciaEnvasadoras={eficienciaEnvasadoras}
                  eficienciaEmpaquetadora={eficienciaEmpaquetadora}
                />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <Formadora2
                  formatNumber={formatNumber}
                  ordenSelected={ordenSelected}
                  reportesSelected={reportesSelected.filter(reporte => reporte.id_tipo_vibot === 2)}
                  updateKPIs={(tipo, disp, efi) => updateKPIs(tipo, disp, efi)}
                />
              </Card>
            </Col>
          </Row>

          {/*
          <div className="columns-parent">
            <Row>
              <Col xs="12" xl="12">
                <Card className="main-card mb-3">
                  <Iqf2 estado={1} />
                </Card>
              </Col>
            </Row>
          */}

          <div className="columns-parent"> {/* sacar al agregar iqf */}
            {modo === 2 || modo === 0 ? (
              <Row>
                {maquinas.map((maquina) => (
                  <CialWidget
                    formatNumber={formatNumber}
                    nombre={maquina.maquina}
                    id_vibot={maquina.id}
                    ordenSelected={ordenSelected}
                    reportesSelected={reportesSelected.filter(reporte => reporte.id_vibot === maquina.id)}
                  />
                ))}
              </Row>
            ) : (
              ""
            )}

            {/*    <Row alignItems="stretch">
              {modo === 1 || modo === 0 ? (
                <CialWidget
                  modo={3}
                  nombre="Total Hornos"
                  data={[6, 0.5, 1.2, 0.5, 1, 1.2, 5]}
                />
              ) : (
                ""
              )}
              {modo === 2 || modo === 0 ? (
                <CialWidget
                  modo={4}
                  nombre="Total Envasadoras"
                  OE="11324"
                  OET="24521"
                  descripcion="Tipos de productos envasados: 5"
                  data={[5, 0.2, 1, 0.4, 0.5, 1.2, 7]}
                />
              ) : (
                ""
              )}
            </Row> */}
          </div>

          <Row>
            <Col md="6" xl="6">
              <Card className="main-card mb-3">
                <TotalEnvasadoras
                  maquinas={maquinas}
                  formatNumber={formatNumber}
                  ordenSelected={ordenSelected}
                  reportesSelected={reportesSelected.filter(reporte => reporte.id_tipo_vibot === 4)}
                  updateKPIs={(tipo, disp, efi) => updateKPIs(tipo, disp, efi)}
                />
              </Card>
            </Col>

            <Col md="6" xl="6">
              <Card className="main-card mb-3">
                <Empaque
                  formatNumber={formatNumber}
                  ordenSelected={ordenSelected}
                  reportesSelected={reportesSelected.filter(reporte => reporte.id_tipo_vibot === 5)}
                  updateKPIs={(tipo, disp, efi) => updateKPIs(tipo, disp, efi)}
                />
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(MinimalDashboard1);
