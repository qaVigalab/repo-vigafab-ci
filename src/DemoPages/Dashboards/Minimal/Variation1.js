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
import Formadora from './Formadora';
import Iqf from './Iqf';
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

export default class MinimalDashboard1 extends Component {
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
          id:"",
          nombre:""
        }
      ],
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.getMaquinas = this.getMaquinas.bind(this);
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
async getMaquinas(tipo){
  var myHeaders = new Headers();
myHeaders.append("x-api-key", "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"maquina":tipo});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getmaquinas", requestOptions)
.then(response => response.json())
.then( result => {
      
      this.setState({
        maquinas: [...this.state.maquinas, {
          id:result[0].id,
          nombre:result[0].maquina,
        }]
      })
    }
)
  .catch(error => console.log('error', error));
}
componentDidMount() {
  this.setState({
    maquinas:[]
  })
  this.getMaquinas('envasadora')
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
                menu_actual="Vista general"
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
            <Col md="6" xl="4">
              <Card className="main-card mb-3">
                <CardBody>
                  <div className="titlecard">Filtrar Por</div>
                  {/* modo 0 */}

                  <Button
                    outline={this.state.modo === 0 ? false : true}
                    className="mb-2 mr-2"
                    color={this.state.modo === 0 ? "primary" : "secondary"}
                    onClick={() => {
                      this.setState({
                        modo: 0,
                      });
                    }}
                  >
                    Desde
                  </Button>
                  {/* modo 1 */}

                  <Button
                    outline={this.state.modo === 1 ? false : true}
                    className="mb-2 mr-2 btn-transition"
                    color={this.state.modo === 1 ? "primary" : "secondary"}
                    onClick={() => {
                      this.setState({
                        modo: 1,
                      });
                    }}
                  >
                    Hornos
                  </Button>
                  {/* modo 2 */}

                  <Button
                    outline={this.state.modo === 2 ? false : true}
                    className="mb-2 mr-2 btn-transition"
                    color={this.state.modo === 2 ? "primary" : "secondary"}
                    onClick={() => {
                      this.setState({
                        modo: 2,
                      });
                    }}
                  >
                    Envasadoras
                  </Button>
                  {/* modo 5 */}

                  <Button
                    outline={this.state.modo === 5 ? false : true}
                    className="mb-2 mr-2 btn-transition"
                    color={this.state.modo === 5 ? "primary" : "secondary"}
                    onClick={() => {
                      this.setState({
                        modo: 5,
                      });
                    }}
                  >
                    Por Producto
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col md="6" xl="8">
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
              <Card className="main-card mb-3">
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
            <Row>
              <Formadora 
              modo={1}
              estado={1}
              nombre="Formadora"
              data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
              descripcion="Receta actual: Hamburguesa de Vacuno 100 Grs La Crianza"
              />
            </Row>
            <Row>
              <Iqf 
              modo={1}
              estado={1}
              nombre="IQF"
              data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
              descripcion="Receta actual: Hamburguesa de Vacuno 100 Grs La Crianza"
              />
            </Row>
            {/*this.state.modo === 1 || this.state.modo === 0 ? (
              <Row>
               
                <CialWidget
                  modo={1}
                  estado={1}
                  nombre="Horno 1"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={1}
                  estado={2}
                  nombre="Horno 2"
                  data={[3, 2.3, 1.2, 2.4, 1.5, 0.2, 4.8]}
                />
                <CialWidget
                  modo={1}
                  estado={1}
                  nombre="Horno 3"
                  data={[1.2, 2.3, 3.4, 5.5, 2, 5, 3]}
                />
              </Row>
            ) : (
              ""
            )*/}

            {this.state.modo === 2 || this.state.modo === 0 ? (
              <Row>

              {this.state.maquinas.map( maquina =>
                
                <CialWidget
                  modo={2}
                  descripcion="009 - Vienesa Vacío 4 x 1 KG SJ"
                  OE={2090}
                  OET={2500}
                  estado={1}
                  nombre={maquina.nombre}
                  data={[4, 2, 0.11, 1.4, 1, 0.2, 3.8]}
                  id_vibot={maquina.id}
                />
              )}
                
               
              </Row>
            ) : (
              ""
            )}
            {/* {this.state.modo === 5 || this.state.modo === 0 ? (
              <Row>
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="1009 - Vienesa Vacío 4 x 1 KG SJ"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="1018 - Vienesa Pavo 8 x 1 KG SJ"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="1019 - Vienesa Pollo 8 x 1 KG SJ"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="910 - Vienesa Unimarc 1 KG"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="8772 - Salchicha tradicional 900 x 4 WN"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="1032 - Vienesa Vacío 8 x 1 KG SJ"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="1059- Vienesa Merkat 8x1 KG"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
                <CialWidget
                  modo={5}
                  estado={1}
                  color="#444054"
                  OE="1980"
                  nombre="2380- Vienesas Tradicional Tottus"
                  data={[2.2, 3, 2, 0.8, 0.3, 0.2, 5]}
                />
              </Row>
            ) : (
              ""
            )} */}
            <Row alignItems="stretch">
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
            </Row>
           
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
