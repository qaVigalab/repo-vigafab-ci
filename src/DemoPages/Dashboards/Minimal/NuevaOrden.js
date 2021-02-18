import { FormGroup } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { setIdOrden } from '../../../actions/dashboardActions'
import moment from 'moment';

import CargaExcel from "./CargaExcel";
class NuevaOrden extends Component {
  constructor(props) {
    super(props);

    this.loadProductos = this.loadProductos.bind(this);
    this.cajasChange = this.cajasChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePrioridad = this.changePrioridad.bind(this);
    this.limpiarForm = this.limpiarForm.bind(this);
    this.fechaChange = this.fechaChange.bind(this);
    this.changeSku = this.changeSku.bind(this);

    this.state = {
      existeSku: "",
      kg: 0,
      tiempo: 0,
      cajas: 0,
      productos: [],
      producto: {},
      prioridad: 1,
      nombre: "",
      fecha: new Date()
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.existeSku === true) {
      fetch(
        global.api.dashboard.insertsuborder,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
          },
          body: JSON.stringify({
            prioridad: this.state.prioridad,
            cajas: this.state.cajas,
            kg_solicitados: this.state.kg,
            id_producto: this.state.producto.id,
            tiempo_estimado: this.state.tiempo,
            fecha2: this.state.fecha
          }),
        }
      )
        .then((res) => res.json())
        .then(this.limpiarForm(),
          this.props.setIdOrden(!this.props.id_orden)
        )
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.props.setIdOrden(!this.props.id_orden)
      this.setState({existeSku:false})
    }
  }

  loadProductos() {
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
        this.setState({ productos: result });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* selectProducto(event) {
    const prod_id = event.target.value;
    const prod_sku = this.state.productos.find((p) => p.id == prod_id);
    this.setState(
      {
        producto: prod_sku,
      },
      () => {
        this.cajasChange2();
      }
    );
  } */

  fechaChange(event) {
    this.setState({ fecha: event.target.value })
  }

  cajasChange(event) {
    this.setState({ cajas: event.target.value });
    const caja = event.target.value;
    this.setState({ kg: caja * this.state.producto.kg_caja });
    this.setState({
      tiempo: (caja * this.state.producto.kg_caja / this.state.producto.kg_hora),
    });
  }
  cajasChange2() {

    var caja = this.state.cajas;
    this.setState({ nombre: this.state.producto.producto })
    this.setState({ kg: caja * this.state.producto.kg_caja });
    this.setState({
      tiempo: (caja * this.state.producto.kg_caja / this.state.producto.kg_hora)
    });
  }

  componentDidMount() {
    this.loadProductos();
    localStorage.setItem("refresh", "NO")
  }

  changePrioridad(e) {
    this.setState({ prioridad: e.target.value });
  }

  changeSku(event) {
    if (event.target.value.length === 0) {
      this.limpiarForm()
    } else {
      const sku = event.target.value;
      const prod_sku = this.state.productos.find((p) => p.sku.includes(sku)
      );
      if (prod_sku !== undefined) {
        this.setState(
          {
            producto: prod_sku,
            existeSku: true
          },
          () => {
            this.cajasChange2();
          }
        );
      } else {
        this.limpiarForm()
        this.setState({ producto: [] })
        this.setState({ nombre: "No Existe SKU", existeSku: false })
      }
    }
  }

  limpiarForm() {
    this.setState({
      cajas: 0,
      kg: 0,
      tiempo: 0,
      nombre: "Producto"
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col align="left">
            <div className="ml-3 mt-1 text-uppercase font-weight-bold title1orange">Nueva Orden De Produccion</div>
          </Col>
          {/* <Col align="right">
            <div className="mr-4 cerrarO ">Cerrar</div>
          </Col> */}
          {/* <Col align="right">
            <Button className="mt-3 mr-4" size="">
              <Row>
                <GridOnIcon className="ml-3 mt-1" fontSize="small" />
                <div className="ml-2 mr-4 mt-1">Importar ordenes desde excel</div>
              </Row>
            </Button>
          </Col> */}
        </Row>
        <hr />
        <Form className="ml-4 mr-4" onSubmit={this.state.existeSku === false ? "" : this.handleSubmit}>
          <Row>
            <Col md="5">
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label>SKU</Label>
                    {this.state.existeSku === false ? (
                      <Input invalid
                        type="text"
                        name="sku"
                        id="sku"
                        onChange={this.changeSku}
                        placeholder="SKU"
                      />
                    ) : <Input
                        type="text"
                        name="sku"
                        id="sku"
                        onChange={this.changeSku}
                        placeholder="SKU"
                      />}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Producto</Label>
                    <Input
                      type="text"
                      name="prod"
                      id="prod"
                      value={this.state.nombre}
                      placeholder="Producto"
                    >
                    </Input>
                  </FormGroup>
                </Col>

                <Col md="2">
                  <FormGroup>
                    <Label>Prioridad</Label>
                    <Input
                      value={this.state.prioridad}
                      type="select"
                      name="prio"
                      id="prio"
                      placeholder="with a placeholder"
                      onChange={this.changePrioridad}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="7">
              <Row>
                <Col md="2">
                  <FormGroup>
                    <Label>Cajas</Label>
                    <Input
                      type="number"
                      name="cajas"
                      id="cajas"
                      min="1"
                      placeholder="Numero"
                      value={this.state.cajas}
                      onChange={this.cajasChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <Label>Kg Solicitados</Label>
                    <Input
                      type="text"
                      name="kg_sol"
                      id="kg_sol"
                      placeholder="Numero"
                      value={this.state.kg + " kg"}
                    />
                  </FormGroup>
                </Col>
                <Col md="2">
                  <FormGroup>
                    <Label>Tiempo Estimado</Label>
                    <Input
                      type="text"
                      name="tiempo"
                      id="tiempo"
                      placeholder="Hora"
                      value={
                        Math.round(this.state.tiempo * 100) / 100 + " hrs"
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Fecha de la Orden</Label>
                    <Input
                      type="date"
                      name="tiempo"
                      id="tiempo"
                      value={this.state.fecha}
                      onChange={this.fechaChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <Button className="buttonOrange" size="lg" block>
                    Generar Orden
                  </Button>


                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <hr />
        <CargaExcel />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});
const mapDispatchToProps = dispatch => ({
  setIdOrden: data => dispatch(setIdOrden(data)),
});

//export default MinimalDashboard1;
export default connect(mapStateToProps, mapDispatchToProps)(NuevaOrden);
//export default connect(mapStateToProps)(NuevaOrden);
