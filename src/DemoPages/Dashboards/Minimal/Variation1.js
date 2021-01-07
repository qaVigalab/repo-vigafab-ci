
import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { connect } from "react-redux";
import {
  Card,
  Col,
  Row,
} from "reactstrap";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import CialWidget from "./CialWidget";
import Formadora2 from "./Formadora2";
import Iqf2 from "./Iqf2";
import GenerarExcel from "./GenerarExcel";
import NuevaOrden from "./NuevaOrden";
import Orden from "./Orden";
import Produciendo from "./Produciendo";
import TotalEnvasadoras from "./TotalEnvasadoras";
import Empaque from "./Empaque";

import moment from 'moment'


class MinimalDashboard1 extends Component {
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
      maquinas: [
        {
          id: "",
          nombre: "",
        },
      ],
      perfil: localStorage.getItem("perfil")

    };
    this.onDismiss = this.onDismiss.bind(this);
    this.getMaquinas = this.getMaquinas.bind(this);
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };
  handleChange2 = (date) => {
    this.setState({
      endDate: date,
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

  getMaquinas(tipo) {
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
        this.setState({
          maquinas: result /*[
            ...this.state.maquinas,
            {
              id: result[0].id,
              nombre: result[0].maquina,
            },
          ]*/,
        });
      })
      .catch((error) => console.log("error", error));
  }
  componentDidMount() {
    this.setState({
      maquinas: [],
    });
    this.getMaquinas("envasadora");
    localStorage.setItem("fechaFinal", moment().format('YYYY-MM-DD'))
    localStorage.setItem("recarga_orden", 0)


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
                heading="VISTA GENERAL"
                subheading="This is an example dashboard created using build-in elements and components."
                icon="lnr-apartment opacity-6"
                empresa="Agrosuper"
                menues={[]}
                menu_actual="Vista General"
              />
            </Col>
            {/* <Col>
              <div align="right">
                <Button className="buttonOrange2 mr-2" size="">
                  <Row>
                  <AddIcon className="ml-3 mt-1" /> 
                  <div className="ml-2 mr-4 mt-1">Nueva orden de Producción</div>
                  </Row>
                </Button>
              </div>
            </Col>
            
            <div align="right">
              <Button className=" buttonBlue mr-4" size="">
                <Row>
                  <GetAppIcon className="ml-3 mt-1"/>
                  <div className="ml-2 mr-4 mt-1">Descargar como Reporte</div>
                </Row>
              </Button>
            </div> */}

          </Row>
          <Row>
          <Col md="12" xl="12">
                <Card className="main-card mb-3">
                  <GenerarExcel />
                </Card>
              </Col>

          </Row>

          {this.state.perfil == 1 || this.state.perfil == 2 ? (
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

                <Orden id_orden={this.props.id_orden} />

              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <Produciendo estado={1} />
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12" xl="12">
              <Card className="main-card mb-3">
                <Formadora2 estado={1} />
              </Card>
            </Col>
          </Row>

          {/*<div class="columns-parent">
            <Row>
              <Col xs="12" xl="12">
                <Card className="main-card mb-3">
                  <Iqf2 estado={1} />
                </Card>
              </Col>
            </Row>*/}


          <div class="columns-parent"> {/* sacar al agregar iqf */}
            {this.state.modo === 2 || this.state.modo === 0 ? (
              <Row>
                {this.state.maquinas.map((maquina) => (
                  <CialWidget
                    nombre={maquina.maquina}
                    id_vibot={maquina.id}
                  />
                ))}
              </Row>
            ) : (
                ""
              )}

            {/*    <Row alignItems="stretch">
              {this.state.modo === 1 || this.state.modo === 0 ? (
                <CialWidget
                  modo={3}
                  nombre="Total Hornos"
                  data={[6, 0.5, 1.2, 0.5, 1, 1.2, 5]}
                />
              ) : (
                ""
              )}
              {this.state.modo === 2 || this.state.modo === 0 ? (
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
                <TotalEnvasadoras estado={1} />
              </Card>
            </Col>

            <Col md="6" xl="6">
              <Card className="main-card mb-3">
                <Empaque estado={1} />
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(MinimalDashboard1);
