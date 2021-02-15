import React, { Component, Fragment, useState, useEffect } from "react";
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
import Iqf2 from "./Iqf2";
import CialWidget from "./CialWidget";
import TotalEnvasadoras from "./TotalEnvasadoras";
import Empaque from "./Empaque";

const MinimalDashboard1 = (props) => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const applyCallback = (startDate, endDate) => {
    setStart(startDate);
    setEnd(endDate);
  }

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (date) => {
    setStartDate(date);
  };

  const handleChange2 = (date) => {
    setEndDate(date);
  };

  const [modo, setModo] = useState(0);
  const [maquinas, setMaquinas] = useState([{ id: "", nombre: "" }]);
  const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
  const [popoverOpen1, setPopoverOpen1] = useState();
  const [visible, setVisible] = useState();

  const onDismiss = () => {
    setVisible(false);
  }

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

  /* ESTO ES PARA PROBAR LO QUE DIJO EL EDUARDO */
  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [ordenSelected, setOrdenSelected] = useState({});
  const [fechaOrdenes, setFechaOrdenes] = useState(moment().format('YYYY-MM-DD'));

  /* Se consulta a la API para obtener, sólo una vez, el listado de productos */
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

  /* Se consulta a la API para obtener la información de las órdenes diarias */
  const loadOrdenes = (id_orden) => {
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
      console.log(result);
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
  }

  /* Se cargan las órdenes del día, actualizando la variable que define a la orden seleccionada */
  const updateOrden = (orden) => {
    loadOrdenes(orden);
  }

  /* Se actualiza la fecha de las órdenes a cargar desde el componente Orden */
  const updateFecha = (fecha) => {
    setFechaOrdenes(fecha);
  }

  /* Debug: Se imprime el listado de órdenes del día en curso y la orden seleccionada en el listado */
  useEffect(() => {
    console.log(ordenes);
    console.log(ordenSelected);
  }, [ordenSelected]);

  useEffect(() => {
    var date = new Date(fechaOrdenes);
    if (moment(new Date(date.setHours(date.getHours() + 3))).format('YYYY-MM-DD') != moment().format('YYYY-MM-DD'))
      loadOrdenes(-1);
    else
      loadOrdenes("");
  }, [fechaOrdenes])

  /* Se cargan las órdenes al recargar la página */
  useEffect(() => {
    loadOrdenes("");
    loadProductos();
  }, []);

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
                <GenerarExcel />
              </Card>
            </Col>
          </Row>

          {perfil == 1 || perfil == 2 ? (
            <Row>
              <Col md="12" xl="12">
                <Card className="main-card mb-3">
                  <NuevaOrden />
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
                  ordenes={ordenes}
                  ordenSelected={ordenSelected}
                />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <Formadora2
                  ordenSelected={ordenSelected}
                />
              </Card>
            </Col>
          </Row>

          {/*
          <div class="columns-parent">
            <Row>
              <Col xs="12" xl="12">
                <Card className="main-card mb-3">
                  <Iqf2 estado={1} />
                </Card>
              </Col>
            </Row>
          */}

          <div class="columns-parent"> {/* sacar al agregar iqf */}
            {modo === 2 || modo === 0 ? (
              <Row>
                {maquinas.map((maquina) => (
                  <CialWidget
                    nombre={maquina.maquina}
                    id_vibot={maquina.id}
                    ordenSelected={ordenSelected}
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
                  ordenSelected={ordenSelected}
                />
              </Card>
            </Col>

            <Col md="6" xl="6">
              <Card className="main-card mb-3">
                <Empaque
                  ordenSelected={ordenSelected}
                />
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(MinimalDashboard1);
