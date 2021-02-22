import React, { useEffect, useState } from "react";
import { Container, Col, Table, Button, Modal, ModalHeader, ModalBody,
          Alert, Row, Input, Form, Label } from "reactstrap";
import { connect } from "react-redux";
//import { setIdOrden } from "../../../actions/dashboardActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FormGroup } from "@material-ui/core";
import _ from "lodash";
import moment from 'moment';

const Orden = (props) => {
  const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
  const [sku, setSku] = useState("");
  const [cajas, setCajas] = useState("");
  const [producto, setProducto] = useState("");
  const [ordenes, setOrdenes] = useState([]);
  const [idSubOrden, setIdSubOrden] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [fechaOrdenes, setFechaOrdenes] = useState(props.fechaOrdenes);

  /* Permite borrar una orden seleccionada */
  const deleteOrdenes = (id_sub, e) => {
    e.preventDefault();
    fetch(global.api.dashboard.deletesuborden, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        id: id_sub,
      }),
    })
    .then(response => {})
    .catch((err) => {
      console.error(err);
    });

    setModal(!modal);
    setConfirmDelete(true);
    props.updateOrden("");

    setTimeout(() => {
      setConfirmDelete(false);
    }, 3000);
  };

  /* Permite actualizar la orden actual por una nueva orden seleccionada */
  const verOrden = (e, id_orden) => {
    e.preventDefault();

    //props.setIdOrden(!props.id_orden)
    props.updateOrden(id_orden);
    console.log(id_orden);
  }

  const [modal, setModal] = useState(false);
  const toggle = (cajas, id_sub_orden, sku, producto) => {
    setCajas(cajas);
    setIdSubOrden(id_sub_orden);
    setSku(sku);
    setProducto(producto);
    setModal(!modal);
  };

  const [ordenPassed, setOrdenPassed] = useState(false);
  const [messagePassed, setMessagePassed] = useState("");

  const cambiarOrden = (opcion, e) => {
    e.preventDefault();
    let api = "";
    if (opcion === 1) api = global.api.dashboard.nextorden;
    else if (opcion === 2) api = global.api.dashboard.siguienteordenenvasadoras;
    else if (opcion === 3) api = global.api.dashboard.siguienteordenempaque;
    fetch(api, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      "body": false
    })
      .then(response => {
        if (opcion === 1){
          setMessagePassed("¡Se ha modificado satisfactoriamente la orden productiva en la Formadora!");
        } else if (opcion === 2){
          setMessagePassed("¡Se ha modificado satisfactoriamente la orden productiva en las Envasadoras!");
        } else if (opcion === 3){
          setMessagePassed("¡Se ha modificado satisfactoriamente la orden productiva en la Empaquetadora!");
        }
        setOrdenPassed(true);
        props.updateOrden("");

        setTimeout(() => {
          setOrdenPassed(false);
        }, 3000);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const [modalEdit, setModalEdit] = useState(false);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [kg, setKg] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [existeSku, setExisteSku] = useState(false);
  const [fechaEdit, setFechaEdit] = useState("");
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editable, setEditable] = useState(true);

  const toggleEdit = (prioridad, id_sub_orden, sku, producto, cajas, kg, tiempo, fecha_sub) => {
    changeSku({target: {value: sku}});

    setPrioridad(prioridad);
    setIdSubOrden(id_sub_orden);
    setSku(sku);
    setNombre(producto);
    setCajas(cajas);
    setKg(kg);
    setTiempo(tiempo);
    setFechaEdit(fecha_sub);

    console.log(productos.find((p) => p.sku.includes(sku)));
    setModalEdit(!modalEdit);
  };

  const changeSku = (event) => {
    const sku = event.target.value;
    const prod_sku = productos.find((p) => p.sku.includes(sku));
    if (prod_sku !== undefined) {
      setProducto(prod_sku);
      setNombre(prod_sku.producto);
      setExisteSku(true);
      cajasChange2();
    } else {
      setProducto({});
      setNombre("No Existe SKU");
      setExisteSku(false);
      setKg(0);
      setTiempo(0);
    }
    setSku(sku);
  }

  const cajasChange = (event) => {
    setCajas(event.target.value);
    const caja = event.target.value;
    setKg(caja * producto.kg_caja);
    setTiempo(caja * producto.kg_caja / producto.kg_hora);
  }

  const cajasChange2 = () => {
    var caja = cajas;

    setNombre(producto.producto);
    setKg(caja * producto.kg_caja);
    setTiempo(caja * producto.kg_caja / producto.kg_hora);
  }

  const changePrioridad = (e) => {
    setPrioridad(e.target.value);
  }

  const editOrden = (event) => {
    event.preventDefault();
    if (existeSku === true) {
      fetch(
        global.api.dashboard.editOrden,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
          },
          body: JSON.stringify({
            id: idSubOrden,
            prioridad: prioridad,
            cajas: cajas,
            kg_solicitados: kg,
            id_producto: producto.id,
            tiempo_estimado: tiempo,
            fecha_orden: fechaEdit
          }),
        }
      )
      .then(response => {
        console.log(response);
        setConfirmEdit(true);
        props.updateOrden(idSubOrden);

        setTimeout(() => {
          setConfirmEdit(false);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
      });
  
      setModalEdit(!modalEdit)
    } else {
      setExisteSku(false);
    }
  }

  const fechaEditChange = (e) => {
    setFechaEdit(e.target.value);
  };

  const fechaChange = (e) => {
    var date = new Date(e.target.value);
    props.updateFecha(moment(date).add(1, 'days').format('YYYY-MM-DD'));

    var date1 = new Date(moment(date).add(1, 'days'));
    var date2 = new Date();

    console.log(date1);
    console.log(date2);

    if(date1.getDate() >= date2.getDate()){
      setEditable(true);
    } else{
      setEditable(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      props.updateOrden(idSubOrden);
    }, 300000);
    return () => clearInterval(interval);
  }, [idSubOrden]);

  useEffect(() => {
    setFechaOrdenes(props.fechaOrdenes);
  }, [props.fechaOrdenes]);

  useEffect(() => {
    setOrdenes(props.ordenes);
    setIdSubOrden(props.ordenSelected.id_sub_orden);
  }, [props.ordenSelected]);

  useEffect(() => {
    setProductos(props.productos);
  }, [props.productos]);

  return (
    <div>
      <Row>
        <Col align="left" md="4" xl="3">
          <div className="text-uppercase font-weight-bold title1orange ml-3 mt-1">
            Producción en línea
          </div>
        </Col>
        <Col align="left"></Col>
        {/*<Col align="left">
          <Button className="buttonOrange2 ml-3 mt-3" size="lg" onClick={(e) => cambiarOrden(1, e)}>
              Cambiar Formadora
            </Button>
            <Button className="buttonOrange2 ml-4 mt-3" size="lg" onClick={(e) => cambiarOrden(2, e)}>
              Cambiar Envasadoras
            </Button>
            <Button className="buttonOrange2 ml-4 mt-3" size="lg" onClick={(e) => cambiarOrden(3, e)}>
              Cambiar Empaque
            </Button>
        </Col>*/}
        <Row align="right" style={{ marginRight: '0.5%' }}>
          <Col className="mt-4 mr-0">
            <div>Seleccione fecha</div>
          </Col>
          <Col className="mt-3 mb-0 ml-0 mr-4">
            <Input
              type="date"
              name="tiempo"
              id="tiempo"
              value={fechaOrdenes}
              onChange={fechaChange}
            />
          </Col>
        </Row>
      </Row>
      <br />
      {ordenes.length === 0 ? (
        <Alert color="warning" className="mb-0">
          <a className="alert-link">No existen órdenes para mostrar.</a>
        </Alert>
      ) : (
        ""
      )}
      {ordenPassed === true ? (
        <Alert color="success" className="mb-0">
          <a className="alert-link">{messagePassed}</a>
        </Alert>
      ) : (
        ""
      )}
      {confirmEdit === true ? (
        <Alert color="success" className="mb-0">
          <a className="alert-link">¡La orden ha sido editada satisfactoriamente!</a>
        </Alert>
      ) : (
        ""
      )}
      {confirmDelete === true ? (
        <Alert color="danger" className="mb-0">
          <a className="alert-link">¡La orden ha sido eliminada satisfactoriamente!</a>
        </Alert>
      ) : (
        ""
      )}
      <Table striped className="mt-0">
        <thead className="theadBlue">
          <tr className="text-center">
            <th>Prioridad</th>
            <th>N° de Orden</th>
            <th>SKU</th>
            <th>Producto</th>
            <th>Cajas</th>
            <th>Productividad</th>
            <th>Tiempo</th>
            <th>Kg Solicitados</th>
            <th>Kg Producidos</th>
            <th>Kg %</th>
            <th><CheckCircleOutlineIcon /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length === 0 ? (
            <tr className="text-center">
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td>---</td>
              <td><RadioButtonUncheckedIcon /></td>
              <td></td>
            </tr>
          ) : (
              ordenes.map((orden, i) =>
                orden.id_sub_orden ? (
                  <tr key={i} onClick={(e) => verOrden(e, orden.id_sub_orden)}
                    className={
                        orden.id_estado == 1 ? "orangeRow"
                      : orden.id_sub_orden === idSubOrden ? "grayRow"
                      : "text-center"
                    }
                  >
                    <td>{orden.prioridad}</td>
                    <td>{orden.id_sub_orden}</td>
                    <td>{orden.sku}</td>
                    <td>{orden.producto}</td>
                    <td>{props.formatNumber.new(orden.cajas)}</td>
                    <td>
                      {props.formatNumber.new(_.round(orden.productividad, 2)) + " ham/min"}
                    </td>
                    <td>
                      {props.formatNumber.new(_.round(orden.tiempo_estimado, 2)) + " hrs"}
                    </td>
                    <td>{props.formatNumber.new(parseInt(orden.kg_solicitados)) + " kg"}</td>
                    <td>{props.formatNumber.new(parseInt(orden.real_kg)) + " kg"}</td>
                    <td>
                      {
                        orden.kg_porcentual == null ? "0 %"
                        : orden.kg_porcentual > 100 ? "100 %"
                        : props.formatNumber.new(_.round(orden.kg_porcentual, 2)) + " %"
                      }
                    </td>
                    <td>
                      {orden.id_estado == 3 ? (
                        <CheckCircleIcon style={{ color: green[500] }} />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </td>
                    {perfil == 1 || perfil == 2 ? (
                      <td>
                        {editable == true && orden.id_estado != 3 ? (
                        <IconButton
                          aria-label="edit"
                          style={orden.id_estado === 1 ? { color: "#ffebee" } : {}}
                          onClick={() => toggleEdit(
                            orden.prioridad, 
                            orden.id_sub_orden, 
                            orden.sku, 
                            orden.producto, 
                            orden.cajas,
                            orden.kg_solicitados,
                            orden.tiempo_estimado,
                            fechaOrdenes
                          )}
                        >
                          <EditIcon />
                        </IconButton>
                        ) : (
                          <IconButton aria-label="edit" disabled style={{ opacity: 0 }}> <EditIcon /> </IconButton>
                        )}
                        <IconButton
                          aria-label="delete"
                          style={orden.id_estado == 1 ? { color: "#ffebee" } : {}}
                          onClick={() => toggle(orden.cajas, orden.id_sub_orden, orden.sku, orden.producto)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ) : (
                  ""
                )
              )
            )}
        </tbody>
      </Table>

      <Modal size="lg" isOpen={modalEdit} toggle={() => toggleEdit(0, 0, 0, 0, 0, 0, 0, 0)}>
        <ModalHeader className="orangeRow" >
          <Col md="auto">{"Editando orden N° " + idSubOrden + "."}</Col>
        </ModalHeader>
        <ModalBody>
          <Container align="center">
            <Form onSubmit={existeSku === false ? "" : editOrden}>
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="1"></Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>SKU</Label>
                        {existeSku === "false" ? (
                          <Input invalid
                            type="text"
                            name="sku"
                            id="sku"
                            onChange={changeSku}
                            placeholder="SKU"
                          />
                        ) : <Input
                            type="text"
                            name="sku"
                            id="sku"
                            onChange={changeSku}
                            placeholder="SKU"
                            value={sku}
                          />}
                      </FormGroup>
                    </Col>
                    <Col md="5">
                      <FormGroup>
                        <Label>Producto</Label>
                        <Input
                          type="text"
                          name="prod"
                          id="prod"
                          value={nombre}
                          placeholder="Producto"
                        >
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="2">
                      <FormGroup>
                        <Label>Prioridad</Label>
                        <Input
                          value={prioridad}
                          type="select"
                          name="prio"
                          id="prio"
                          placeholder="with a placeholder"
                          onChange={changePrioridad}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="1"></Col>
                  </Row>
                </Col>
              </Row>
              <div><br></br><br></br></div>
              <Row>
                <Col md="12">
                  <Row>
                    <Col md="1"></Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Cajas</Label>
                        <Input
                          type="number"
                          name="cajas"
                          id="cajas"
                          min="1"
                          placeholder="Numero"
                          value={cajas}
                          onChange={cajasChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Kg Solicitados</Label>
                        <Input
                          type="text"
                          name="kg_sol"
                          id="kg_sol"
                          placeholder="Numero"
                          value={kg + " kg"}
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
                            Math.round(tiempo * 100) / 100 + " hrs"
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md="1"></Col>
                  </Row>
                </Col>
              </Row>
              <div><br></br><br></br></div>
              <Row>
              <Col md="12">
                  <Row>
                    <Col md="1"></Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Fecha de la Orden</Label>
                        <Input
                          type="date"
                          name="tiempo"
                          id="tiempo"
                          value={fechaEdit}
                          onChange={fechaEditChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="7"></Col>
                  </Row>
                </Col>
              </Row>
              <div><br></br></div>
              <Row className="mt-4 pr-0">
                <Col align="right" md={{ size: 4, offset: 2 }} sm="6" >
                  <Button block className="buttonOrange2">
                    Confirmar
                  </Button>
                </Col>
                <Col md="4" sm="6">
                  <Button block className="buttonGray" onClick={() => toggleEdit(0, 0, 0, 0, 0, 0, 0, 0)}>
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal} toggle={() => toggle(0, 0, 0, 0)}>
        <ModalHeader className="orangeRow" >
          <Col className="ml-5">{"¿Desea eliminar la orden n° " + idSubOrden + "?"}</Col>
        </ModalHeader>
        <ModalBody>
          <Container align="center">
            Sku: {sku} <br />
            Producto: {producto} <br />
            Cajas : {cajas} <br />
          </Container>
          <Row className="mt-4 pr-0">
            <Col align="right" md={{ size: 4, offset: 2 }} sm="6" >
              <Button block
                className="buttonOrange2"
                onClick={(e) => deleteOrdenes(idSubOrden, e)}
              >
                Eliminar
                </Button>
            </Col>
            <Col md="4" sm="6">
              <Button block className="buttonGray" onClick={() => toggle(0, 0, 0, 0)}>
                Cancelar
                </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

const mapDispatchToProps = (dispatch) => ({
  //setIdOrden: (data) => dispatch(setIdOrden(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orden);
