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
import UpdateIcon from '@material-ui/icons/Update';
import { FormGroup } from "@material-ui/core";
import _ from "lodash";
import moment from 'moment';

const Orden = (props) => {
  const [perfil] = useState(localStorage.getItem("perfil"));
  const [sku, setSku] = useState("");
  const [cajas, setCajas] = useState("");
  const [producto, setProducto] = useState("");
  const [ordenes, setOrdenes] = useState([]);
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
  }

  /* Permite actualizar la orden seleccionada en este componente visual */
  const [modal, setModal] = useState(false);
  const toggle = (cajas, sku, producto) => {
    setCajas(cajas);
    setSku(sku);
    setProducto(producto);
    setModal(!modal);
  };

  /* Permite editar una orden seleccionada del listado */
  const [modalEdit, setModalEdit] = useState(false);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [kg, setKg] = useState(0);
  const [tiempo, setTiempo] = useState(0);
  const [existeSku, setExisteSku] = useState(false);
  const [fechaEdit, setFechaEdit] = useState("");
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggleEdit = (prioridad, sku, producto, cajas, kg, tiempo, fecha_sub) => {
    changeSku({target: {value: sku}});

    setPrioridad(prioridad);
    setSku(sku);
    setNombre(producto);
    setCajas(cajas);
    setKg(kg);
    setTiempo(tiempo);
    setFechaEdit(fecha_sub);

    console.log(productos.find((p) => p.sku.includes(sku)));
    setModalEdit(!modalEdit);
  };

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
            id: props.ordenSelected.id_sub_orden,
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
        props.updateOrden(props.ordenSelected.id_sub_orden);

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

  const fechaEditChange = (e) => {
    setFechaEdit(e.target.value);
  };

  /* Otras funciones de utilidad para el componente visual */
  const fechaChange = (e) => {
    var date = new Date(e.target.value);
    props.updateFecha(moment(date).add(1, 'days').format('YYYY-MM-DD'));
    setChangeHours(false);
  };

  /* Actualizaciones de estado */
  useEffect(() => {
    setFechaOrdenes(props.fechaOrdenes);
  }, [props.fechaOrdenes]);

  useEffect(() => {
    setOrdenes(props.ordenes);
    const interval = setInterval(() => {
      props.updateOrden(props.ordenSelected.id_sub_orden);
    }, 300000);
    return () => clearInterval(interval);
  }, [props.ordenSelected]);

  useEffect(() => {
    setProductos(props.productos);
  }, [props.productos]);

  /* Permite modificar el horario de inicio y término de una orden, de acuerdo al tipo de máquina */
  const [changeHours, setChangeHours] = useState(false);
  const [changeDone, setChangeDone] = useState(false);
  const [horasInicio, setHorasInicio] = useState({
    "Formadora": "",
    "Envasadoras": "",
    "Empaquetadora": ""
  });
  const [horasTermino, setHorasTermino] = useState({
    "Formadora": "",
    "Envasadoras": "",
    "Empaquetadora": ""
  });

  const changeStart = (e, maquina) => {
    if (maquina === "Formadora")
      setHorasInicio({
        "Formadora": e.target.value,
        "Envasadoras": horasInicio["Envasadoras"],
        "Empaquetadora": horasInicio["Empaquetadora"]
      });
    else if (maquina === "Envasadoras")
      setHorasInicio({
        "Formadora": horasInicio["Formadora"],
        "Envasadoras": e.target.value,
        "Empaquetadora": horasInicio["Empaquetadora"]
      });
    else if (maquina === "Empaquetadora")
      setHorasInicio({
        "Formadora": horasInicio["Formadora"],
        "Envasadoras": horasInicio["Envasadoras"],
        "Empaquetadora": e.target.value
      });
  };

  const changeEnd = (e, maquina) => {
    if (maquina === "Formadora")
      setHorasTermino({
        "Formadora": e.target.value,
        "Envasadoras": horasTermino["Envasadoras"],
        "Empaquetadora": horasTermino["Empaquetadora"]
      });
    else if (maquina === "Envasadoras")
      setHorasTermino({
        "Formadora": horasTermino["Formadora"],
        "Envasadoras": e.target.value,
        "Empaquetadora": horasTermino["Empaquetadora"]
      });
    else if (maquina === "Empaquetadora")
      setHorasTermino({
        "Formadora": horasTermino["Formadora"],
        "Envasadoras": horasTermino["Envasadoras"],
        "Empaquetadora": e.target.value
      });
  };

  const updateHours = () => {
    fetch(
      global.api.dashboard.actualizarHorarios,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
        },
        body: JSON.stringify({
          id_so: props.ordenSelected.id_sub_orden,
          inicio_form: horasInicio["Formadora"],
          inicio_env: horasInicio["Envasadoras"],
          inicio_emp: horasInicio["Empaquetadora"],
          cierre_form: horasTermino["Formadora"],
          cierre_env: horasTermino["Envasadoras"],
          cierre_emp: horasTermino["Empaquetadora"]
        }),
      }
    )
    .then(response => {
      setChangeDone(true);
      setHorasInicio({
        "Formadora": "",
        "Envasadoras": "",
        "Empaquetadora": ""
      });
      setHorasTermino({
        "Formadora": "",
        "Envasadoras": "",
        "Empaquetadora": ""
      });
      props.updateOrden(props.ordenSelected.id_sub_orden);
      setTimeout(() => {
        setChangeHours(false);
        setChangeDone(false);
      }, 3000);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    console.log(changeHours);
  }, [changeHours]);

  useEffect(() => {}, [horasInicio, horasTermino]);

  return (
    <div>
      <Row>
        <Col align="left" md="4" xl="3">
          <div className="text-uppercase font-weight-bold title1orange ml-3 mt-1">
            Producción en línea
          </div>
        </Col>
        <Col align="left"></Col>

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
      {confirmEdit === true ? (
        <Alert color="success" className="mb-0">
          <a className="alert-link">¡La orden ha sido editada satisfactoriamente!</a>
        </Alert>
      ) : (
        ""
      )}
      {confirmDelete === true ? (
        <Alert color="success" className="mb-0">
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
                      : orden.id_sub_orden === props.ordenSelected.id_sub_orden ? "grayRow"
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
                        {orden.id_estado !== 3 ? (
                          <IconButton
                            aria-label="edit"
                            style={orden.id_sub_orden === props.ordenSelected.id_sub_orden || orden.id_estado === 1 ? { color: "#ffebee" } : {}}
                            onClick={() => toggleEdit(
                              orden.prioridad,
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
                        ) : (orden.horarios_existen === 0 ?
                            <IconButton 
                              aria-label="edit"
                              style={orden.id_sub_orden === props.ordenSelected.id_sub_orden || orden.id_estado === 1 ? { color: "#ffebee" } : {}}
                              onClick={() => setChangeHours(true)}
                            >
                              <UpdateIcon />
                            </IconButton>
                          : <IconButton disabled></IconButton>
                        )}
                        <IconButton
                          aria-label="delete"
                          style={orden.id_sub_orden === props.ordenSelected.id_sub_orden || orden.id_estado === 1 ? { color: "#ffebee" } : {}}
                          onClick={() => toggle(orden.cajas, orden.sku, orden.producto)}
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
      <hr></hr>
      {changeHours === true ?
        <Col>
          <Row>
            <Col align="left" md="1"></Col>
            <Col align="left" md="4">
              <div className="text-uppercase font-weight-bold title1orange ml-3">
                Orden seleccionada: {props.ordenSelected.id_sub_orden}<br></br>
                SKU: {props.ordenSelected.sku}
              </div>
            </Col>
          </Row>

          <Row className="mx-2 mb-3">
            <Col md="1"></Col>
            <Col md="10" className="my-3 mx-2">
              <Form>
                  <Row>
                    <Col align="left" md="5">
                      <div className="font-weight-bold ml-1 mt-2">Hora de Inicio:</div>
                    </Col>
                    <Col md="1"></Col>

                    <Col align="left" md="5">
                      <div className="font-weight-bold ml-1 mt-2">Hora de Término:</div>
                    </Col>

                    <Col align="left" md="1">
                      <Button className="buttonOrange" style={{ marginTop: '0px', marginBottom: '0px' }} onClick={updateHours}>Confirmar</Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col align="left" md="5">
                      <hr></hr>
                    </Col>
                    <Col md="1"></Col>

                    <Col align="left" md="5">
                      <hr></hr>
                    </Col>
                    <Col md="1"></Col>
                  </Row>

                  <Row>
                    <Col md="5">
                      <Row>
                        <Col md="3" className="ml-1">
                          <FormGroup>
                            <Label for="formStart">Formadora</Label>
                            <Input
                              style={{ textAlignLast: 'center', width: '105%' }}
                              type="time"
                              id="formStart"
                              placeholder="--:--"
                              defaultValue={horasInicio["Formadora"]}
                              onChange={(e) => changeStart(e, "Formadora")}
                            />
                          </FormGroup>
                        </Col>

                        <Col md="3" className="ml-1">
                          <FormGroup>
                            <Label for="envStart">Envasadoras</Label>
                            <Input
                              style={{ textAlignLast: 'center', width: '105%' }}
                              type="time"
                              id="envStart"
                              placeholder="--:--"
                              defaultValue={horasInicio["Envasadoras"]}
                              onChange={(e) => changeStart(e, "Envasadoras")}
                            />
                          </FormGroup>
                        </Col>

                        <Col md="3" className="ml-1">
                          <FormGroup>
                            <Label for="empStart">Empaquetadora</Label>
                            <Input
                              style={{ textAlignLast: 'center', width: '105%' }}
                              type="time"
                              id="empStart"
                              placeholder="--:--"
                              defaultValue={horasInicio["Empaquetadora"]}
                              onChange={(e) => changeStart(e, "Empaquetadora")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>

                    <Col md="1"></Col>
                    
                    <Col md="5">
                      <Row>
                        <Col md="3" className="ml-1">
                          <FormGroup>
                            <Label for="formEnd">Formadora</Label>
                            <Input
                              style={{ textAlignLast: 'center', width: '105%' }}
                              type="time"
                              id="formEnd"
                              placeholder="--:--"
                              defaultValue={horasTermino["Formadora"]}
                              onChange={(e) => changeEnd(e, "Formadora")}
                            />
                          </FormGroup>
                        </Col>

                        <Col md="3" className="ml-1">
                          <FormGroup>
                            <Label for="envEnd">Envasadoras</Label>
                            <Input
                              style={{ textAlignLast: 'center', width: '105%' }}
                              type="time"
                              id="envEnd"
                              placeholder="--:--"
                              defaultValue={horasTermino["Envasadoras"]}
                              onChange={(e) => changeEnd(e, "Envasadoras")}
                            />
                          </FormGroup>
                        </Col>

                        <Col md="3" className="ml-1">
                          <FormGroup>
                            <Label for="empEnd">Empaquetadora</Label>
                            <Input
                              style={{ textAlignLast: 'center', width: '105%' }}
                              type="time"
                              id="empEnd"
                              placeholder="--:--"
                              defaultValue={horasTermino["Empaquetadora"]}
                              onChange={(e) => changeEnd(e, "Empaquetadora")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              </Form>
            </Col>
            <Col md="1"></Col>
          </Row>
          <hr></hr>
        </Col>
      :
        ""
      }

      <Row>
        <Col>
          {changeDone === true ? (
            <Alert color="success">
              <a className="alert-link">¡Se han ingresado correctamente las horas de arranque y cierre para el SKU {props.ordenSelected.sku}!</a>
            </Alert>
          ) : (
            ""
          )}
        </Col>
      </Row>
      
      <Modal size="lg" isOpen={modalEdit} toggle={() => toggleEdit(0, 0, 0, 0, 0, 0, 0)}>
        <ModalHeader className="orangeRow" >
          <Col md="auto">{"Editando orden N° " + props.ordenSelected.id_sub_orden + "."}</Col>
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
                  <Button block className="buttonGray" onClick={() => toggleEdit(0, 0, 0, 0, 0, 0, 0)}>
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal} toggle={() => toggle(0, 0, 0)}>
        <ModalHeader className="orangeRow" >
          <Col className="ml-5">{"¿Desea eliminar la orden n° " + props.ordenSelected.id_sub_orden + "?"}</Col>
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
                onClick={(e) => deleteOrdenes(props.ordenSelected.id_sub_orden, e)}
              >
                Eliminar
                </Button>
            </Col>
            <Col md="4" sm="6">
              <Button block className="buttonGray" onClick={() => toggle(0, 0, 0)}>
                Cancelar
                </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Orden);
