import React, { useEffect, useState } from "react";
import { Container, Col, Table, Button, Modal, ModalHeader, ModalBody,
          Alert, Row, Input, Form, Label } from "reactstrap";
import { connect } from "react-redux";
import { setIdOrden } from "../../../actions/dashboardActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { FormGroup } from "@material-ui/core";
import _ from "lodash";

const Orden = (props) => {
  const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
  const [ordenes, setOrdenes] = useState([]);
  const [vacio, setVacio] = useState(0);
  const [sku, setSku] = useState("")
  const [cajas, setCajas] = useState("")
  const [producto, setProducto] = useState("")
  const [idSubOrden, setIdSubOrden] = useState("")
  const [prioridad, setPrioridad] = useState("")
  const [select, setSelect] = useState(0)
  const [recarga, setRecarga] = useState()
  let fecha = new Date();
  let date = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate();
  let month = fecha.getMonth() + 1;
  let year = fecha.getFullYear();
  fecha = year + "-" + month + "-" + date;
  const [fechaFinal, setFechaFinal] = useState(
    localStorage.getItem("fechaFinal") || fecha
  );

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

  const deleteOrdenes = async (id_sub, e) => {
    e.preventDefault();

    await fetch(global.api.dashboard.deletesuborden, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        id: id_sub,
      }),
    })
    .then(
      console.log("Borrado ok")
    )
    .catch((err) => {
      console.error(err);
    });

    setModal(!modal)
    loadOrdenes()
  };

  const verOrden = (e, id_orden) => {
    e.preventDefault();
    if (select === id_orden) {
      let id = localStorage.getItem("id_ordenA")
      setSelect(0)
      localStorage.setItem("id_orden", id)
    } else {
      setSelect(id_orden)
      localStorage.setItem("id_orden", id_orden)
    }
    props.setIdOrden(!props.id_orden)
  }

  const cambiarOrden = (opcion,e) => {
    e.preventDefault();
    let api = ""
     if(opcion === 1) api=global.api.dashboard.nextorden
    else if(opcion === 2) api=global.api.dashboard.siguienteordenenvasadoras
    else if(opcion === 3) api=global.api.dashboard.siguienteordenempaque
    fetch(api, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      "body": false
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });

  }

  const [modal, setModal] = useState(false);
  const toggle = (cajas, id_sub_orden, sku, producto) => {
    setCajas(cajas);
    setIdSubOrden(id_sub_orden);
    setSku(sku);
    setProducto(producto);
    setModal(!modal);
  };

  const loadOrdenes = () => {
    fetch(global.api.dashboard.getordenes, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        fecha: localStorage.getItem("fechaFinal"),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setVacio(0);
        result.length === 0 ? setVacio(1) : 
        result[0].id_sub_orden === null ? setVacio(1) : setOrdenes(result);
        if (result[1].id_sub_orden != null) {
          setVacio(2);
          setOrdenes(result);
          if (localStorage.getItem("recarga_orden") === "0") {
            localStorage.setItem("id_orden", result.find(e => e.id_estado === 1).id_sub_orden)
            localStorage.setItem("recarga_orden", 1)
            setSelect(0)
          }
          localStorage.setItem("id_ordenA", result.find(e => e.id_estado === 1).id_sub_orden)
        }
      })
      .catch((err) => {
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

        setTimeout(() => {
          loadOrdenes();
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
    setFechaFinal(e.target.value);
    localStorage.setItem("fechaFinal", e.target.value);

    var date1 = new Date(localStorage.getItem("fechaFinal"));
    var date2 = new Date();

    if(date1.getTime() >= date2.getTime()){
      setEditable(true);
    } else{
      setEditable(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      loadOrdenes();

    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("recarga_orden", 0)
    }, 600000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    loadOrdenes();
  }, [localStorage.getItem("fechaFinal")]);

  useEffect(() => {
    loadOrdenes();
  }, [props.id_orden]);

  useEffect(() => {
    loadProductos();
  }, [])

  return (
    <div>
      <Row>
        <Col align="left" md="4" xl="3">
          <div className="text-uppercase font-weight-bold title1orange ml-3 mt-1">
            Producción en línea
          </div>
        </Col>
        {/*}
        <Col>
          <Button className="buttonOrange" size="lg" onClick={partirOrden}>
            Partir Orden
          </Button>
        </Col>{*/}
       
          <Col align="left">
            <Button className="buttonOrange2 ml-3 mt-3" size="lg" onClick={(e) => cambiarOrden(1, e)}>
              Cambiar Formadora
             </Button>
             <Button className="buttonOrange2 ml-3 mt-3" size="lg" onClick={(e) => cambiarOrden(2, e)}>
              Cambiar Envasadoras
             </Button>
             <Button className="buttonOrange2 ml-3 mt-3" size="lg" onClick={(e) => cambiarOrden(3, e)}>
              Cambiar Empaque
             </Button>
          </Col>
        
        <Row>
          <Col className="mt-4 mr-0 ">
            <div>Seleccione fecha</div>
          </Col>
          <Col className="mt-3 mb-0 ml-0 mr-4">
            <Input
              type="date"
              name="tiempo"
              id="tiempo"
              value={localStorage.getItem("fechaFinal")}
              onChange={fechaChange}
            />
          </Col>
        </Row>
      </Row>
      <br />
      {vacio === 1 ? (
        <Alert color="warning" className="mb-0">
          <a className="alert-link">No existen ordenes para mostrar</a>.
        </Alert>
      ) : (
          ""
        )}
      {confirmEdit === true ? (
        <Alert color="success" className="mb-0">
          <a className="alert-link">¡La orden ha sido editada satisfactoriamente!</a>.
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
            <th>
              <CheckCircleOutlineIcon />
            </th>

            {perfil == 1 || perfil == 2 ? (
              <th>
                {/*
                <IconButton aria-label="edit" style={{ color: 'white' }} disabled>
                    <EditIcon />
                </IconButton>

                <IconButton aria-label="delete" style={{ color: 'white' }} disabled>
                  <DeleteIcon />
                </IconButton>
                */}
              </th>
            ) : (
                ""
              )}
          </tr>
        </thead>
        <tbody>
          {vacio === 1 ? (
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
              {perfil == 1 || perfil == 2 ? (
                <td>---</td>

              ) : (
                  ""
                )}
              <td>
                <RadioButtonUncheckedIcon />
              </td>

              {perfil == 1 || perfil == 2 ? (
                <td>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </td>
              ) : (
                  ""
                )}
            </tr>
          ) : (
              ordenes.map((orden, i) =>
                orden.id_sub_orden ? (
                  <tr key={i} onClick={(e) => verOrden(e, orden.id_sub_orden)}
                    className={orden.id_estado == 1 ? "orangeRow" :
                      select == orden.id_sub_orden ? "grayRow" :
                        "text-center"}
                  >
                    <td>{orden.prioridad}</td>
                    <td>{orden.id_sub_orden}</td>
                    <td>{orden.sku}</td>
                    <td>{orden.producto}</td>
                    <td>{formatNumber.new(orden.cajas)}</td>
                    <td>
                      {formatNumber.new(_.round(orden.productividad, 2)) + " ham/min"}
                    </td>
                    <td>
                      {formatNumber.new(_.round(orden.tiempo_estimado, 2)) + " hrs"}
                    </td>
                    <td>{formatNumber.new(_.round(orden.kg_solicitados)) + " Kg"}</td>
                    <td>{formatNumber.new(_.round(orden.real_kg)) + " Kg"}</td>
                    <td>
                      {orden.kg_porcentual == null
                        ? "0 %"
                        : orden.kg_porcentual > 100
                          ? "100%"
                          : formatNumber.new(_.round(orden.kg_porcentual, 2)) + " %"}
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
                        {editable == true ? (
                        <IconButton
                          aria-label="edit"
                          style={orden.id_estado == 1 ? { color: "#ffebee" } : {}}
                          onClick={() => toggleEdit(
                            orden.prioridad, 
                            orden.id_sub_orden, 
                            orden.sku, 
                            orden.producto, 
                            orden.cajas,
                            orden.kg_solicitados,
                            orden.tiempo_estimado,
                            localStorage.getItem("fechaFinal")
                          )}
                        >
                          <EditIcon />
                        </IconButton>
                        ) : (
                          <IconButton> </IconButton>
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
  setIdOrden: (data) => dispatch(setIdOrden(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orden);
