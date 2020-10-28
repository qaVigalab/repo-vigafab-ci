import { FormGroup } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";

class NuevaOrden extends Component {
  constructor(props) {
    super(props);

    this.loadProductos = this.loadProductos.bind(this);
    this.selectProducto = this.selectProducto.bind(this);
    this.cajasChange = this.cajasChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePrioridad = this.changePrioridad.bind(this);
    this.limpiarForm = this.limpiarForm.bind(this);

    this.state = {
      kg: 0,
      tiempo: 0,
      cajas: 0,
      productos: [],
      producto: {},
      prioridad: 5,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(
      "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/insertsuborder",
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
        }),
      }
    )
      .then((res) => res.json())
      .then(this.limpiarForm())
      .catch((err) => {
        console.error(err);
      });
  }

  loadProductos() {
    fetch(
      "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getproducto",
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

  selectProducto(event) {
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
  }

  cajasChange(event) {
    this.setState({ cajas: event.target.value });
    const caja = event.target.value;
    this.setState({ kg: caja * this.state.producto.kg_caja });
    this.setState({
      tiempo: (caja * this.state.producto.tiempo_produccion) / 60,
    });
  }
  cajasChange2() {
    var caja = this.state.cajas;
    this.setState({ kg: caja * this.state.producto.kg_caja });
    this.setState({
      tiempo: (caja * this.state.producto.tiempo_produccion) / 60,
    });
  }

  componentDidMount() {
    this.loadProductos();
  }

  changePrioridad(e) {
    this.setState({ prioridad: e.target.value });
  }

  limpiarForm() {
    this.setState({
      cajas: 0,
      kg: 0,
      tiempo: 0,
    });
  }

  render() {
    return (
      <div>
        <Container>
          <div className="text-uppercase font-weight-bold title1orange">Nueva Orden De Produccion</div>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col md="7">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Producto</Label>
                      <Input
                        type="select"
                        name="select"
                        id="prod_select"
                        onChange={this.selectProducto}
                      >
                        {this.state.productos.map((producto, i) => (
                          <option key={i} value={producto.id}>
                            {producto.producto}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>SKU</Label>
                      <Input
                        type="text"
                        name="sku"
                        id="sku"
                        value={this.state.producto.sku}
                      />
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
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md="5">
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Cajas</Label>
                      <Input
                        type="number"
                        name="cajas"
                        id="cajas"
                        placeholder="Numero"
                        value={this.state.cajas}
                        onChange={this.cajasChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
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
                  <Col md="4">
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
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <div align="right">
                  <Button className="buttonOrange" size="lg">
                    Generar nueva orden de Producción
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

//export default MinimalDashboard1;
//export default connect(mapStateToProps,  mapDispatchToProps )(MinimalDashboard1);
export default connect(mapStateToProps)(NuevaOrden);
