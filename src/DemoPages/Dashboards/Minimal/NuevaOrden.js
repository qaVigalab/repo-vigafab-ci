import { FormGroup } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Form, Input, Label, Row, Alert } from "reactstrap";
import moment from 'moment';
import CargaExcel from "./CargaExcel";

class NuevaOrden extends Component {
  constructor(props) {
    super(props);

    this.cajasChange = this.cajasChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePrioridad = this.changePrioridad.bind(this);
    this.limpiarForm = this.limpiarForm.bind(this);
    this.fechaChange = this.fechaChange.bind(this);
    this.changeSku = this.changeSku.bind(this);

    this.state = {
      existeSku: true,
      kg: 0,
      tiempo: 0,
      cajas: 0,
      productos: this.props.productos,
      producto: {},
      prioridad: 1,
      nombre: "",
      fecha: moment(new Date()).format('YYYY-MM-DD'),
      message: "",
      messageState: "",
      confirmCreate: false,
      confirmError: false
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
      .then(response => response.json())
      .then((response) => {
        this.limpiarForm();
        if (response[0].code === "AGRO001"){
          this.setState({
            message: response[0].message,
            messageState: "danger",
            confirmError: true
          });
        } else{
          this.setState({
            message: response[0].message,
            messageState: "success",
            confirmCreate: true
          });

          this.props.updateOrden("", false);
        }

        setTimeout(() => {
          this.setState({ confirmError: false, confirmCreate: false })
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      this.setState({ existeSku:false, confirmError: false, confirmCreate: false });
    }
  }

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

  changePrioridad(e) {
    this.setState({ prioridad: e.target.value });
  }

  changeSku(event) {
    this.setState({ productos: this.props.productos });
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
      nombre: "Producto",
      fecha: moment(new Date()).format('YYYY-MM-DD')
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col align="left">
            <div className="ml-3 mt-1 text-uppercase font-weight-bold title1orange">Nueva Orden De Produccion</div>
          </Col>
        </Row>
        <hr />
        <Form className="ml-4 mr-4" onSubmit={this.state.existeSku === false ? "" : this.handleSubmit}>
          <Row>
            <Col md="5">
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label>SKU</Label>
                    <Input
                      type="text"
                      name="sku"
                      id="sku"
                      onChange={this.changeSku}
                      placeholder="SKU"
                      required
                      invalid={!this.state.existeSku}
                    />
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
                      required
                      invalid={!this.state.existeSku}
                      disabled
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
                      required
                      invalid={this.state.confirmError}
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
                      required
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
                      required
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col md="2">
                  <FormGroup>
                    <Label>Tiempo Estim.</Label>
                    <Input
                      type="text"
                      name="tiempo"
                      id="tiempo"
                      placeholder="Hora"
                      value={
                        Math.round(this.state.tiempo * 100) / 100 + " hrs"
                      }
                      required
                      disabled
                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <Label>Fecha de la Orden</Label>
                    <Input
                      type="date"
                      name="tiempo"
                      id="tiempo"
                      value={this.state.fecha}
                      onChange={this.fechaChange}
                      required
                    />
                  </FormGroup>
                </Col>

                <Col md="2">
                  <Button className="buttonOrange" style={{ height: '40%' }} block>
                    Generar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        {this.state.confirmCreate === true || this.state.confirmError === true ? (
          <Alert color={this.state.messageState} className="mb-0">
            <a className="alert-link">{this.state.message}</a>
          </Alert>
        ) : (
          ""
        )}
        <hr />
        <CargaExcel />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(NuevaOrden);
