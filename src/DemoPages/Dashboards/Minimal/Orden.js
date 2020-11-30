import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Row,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { setIdOrden } from "../../../actions/dashboardActions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import _ from "lodash";

const Orden = (props) => {
  const [ordenes, setOrdenes] = useState([]);
  const [vacio, setVacio] = useState(0);
  const [sku, setSku] = useState("")
  const [cajas, setCajas] = useState("")
  const [producto, setProducto] = useState("")
  const [idSubOrden, setIdSubOrden] = useState("")
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
    formatear:function (num){
    num +='';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }
    return this.simbol + splitLeft +splitRight;
    },
    new:function(num, simbol){
    this.simbol = simbol ||'';
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

  const partirOrden = () => {
    fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/nextorden", {
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
  };

  const fechaChange = (e) => {
    setFechaFinal(e.target.value);
    localStorage.setItem("fechaFinal", e.target.value);
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

  return (
    <div>
      <Row>
        <Col align="left">
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
            <th>
              <DeleteIcon />
            </th>
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
              <td>---</td>
              <td>
                <RadioButtonUncheckedIcon />
              </td>
              <td>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ) : (
              ordenes.map((orden, i) =>
                orden.id_sub_orden ? (
                  <tr onClick={(e) => verOrden(e, orden.id_sub_orden)}
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
                      {formatNumber.new(_.round(orden.productividad,2)) + " ham/min"}
                    </td>
                    <td>
                      {formatNumber.new(_.round(orden.tiempo_estimado,2))+ " hrs"}
                    </td>
                    <td>{formatNumber.new(_.round(orden.kg_solicitados)) + " Kg"}</td>
                    <td>{formatNumber.new(_.round(orden.real_kg ))+ " Kg"}</td>
                    <td>
                      {orden.kg_porcentual == null
                        ? "0 %"
                        : orden.kg_porcentual > 100
                          ? "100%"
                          : formatNumber.new(_.round(orden.kg_porcentual,2))+ " %"}
                    </td>
                    <td>
                      {orden.id_estado == 3 ? (
                        <CheckCircleIcon style={{ color: green[500] }} />
                      ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                    </td>
                    <td>
                      <IconButton
                        aria-label="delete"
                        style={orden.id_estado == 1 ? { color: "#ffebee" } : {}}
                        onClick={() => toggle(orden.cajas, orden.id_sub_orden, orden.sku, orden.producto)}
                      >
                        <DeleteIcon />
                      </IconButton>

                    </td>
                  </tr>
                ) : (
                    ""
                  )
              )
            )}
        </tbody>
      </Table>
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
