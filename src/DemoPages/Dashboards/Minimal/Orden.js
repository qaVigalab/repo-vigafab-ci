import React, { useEffect, useState } from "react";
import { Container,Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { setIdOrden } from '../../../actions/dashboardActions'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const Orden = (props) => {


const deleteOrdenes = (id_sub,e) => {
  e.preventDefault();

  fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/deletesuborden", {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
  },
      body: JSON.stringify({
        id: id_sub,
      }),
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
    });

    console.log(id_sub)

    setModal(!modal);
    loadOrdenes();
}

  const [modal, setModal] = useState(false);

  const toggle = () => {
      setModal(!modal);

  }

  const [ordenes, setOrdenes] = useState([]);

  const loadOrdenes = () => {
    fetch(
      "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getordenes",
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
        setOrdenes(result)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadOrdenes();

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadOrdenes();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Col align="left">
        <div className="text-uppercase font-weight-bold title1orange ml-3">Producción en línea</div>
      </Col>
      <br />
      <Table striped>
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
          {ordenes.map((orden, i) => (
            <tr className={orden.id_estado == 1 ? "orangeRow" : "text-center"}>
              <th scope="row">{orden.prioridad}</th>
              <td>{orden.id_sub_orden}</td>
              <td>{orden.sku}</td>
              <td>{orden.producto}</td>
              <td>{orden.cajas}</td>
              <td>
                {Math.round(orden.productividad * 100) / 100 + " ham/min"}
              </td>
              <td>{Math.round(orden.tiempo_estimado * 100) / 100 + " hrs"}</td>
              <td>{orden.kg_solicitados + " Kg"}</td>
              <td>{orden.real_kg + " Kg"}</td>
              <td>
                {orden.kg_porcentual == null
                  ? "0 %"
                  : orden.kg_porcentual > 100
                    ? "100%"
                    : orden.kg_porcentual + " %"}
              </td>
              <td>
                {orden.id_estado == 3 ? <CheckCircleIcon style={{ color: green[500] }} /> : <RadioButtonUncheckedIcon />}
              </td>
              <td>
                <IconButton aria-label="delete" style={orden.id_estado == 1 ? { color: "#ffebee" } : {}} onClick={toggle}>
                  <DeleteIcon />
                </IconButton>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>{"Desea eliminar la orden n° " + orden.id_sub_orden}</ModalHeader>
                  <ModalBody>
                    <Container>
                      Sku: {orden.sku} <br />
                      Producto: {orden.producto} <br />
                      Cajas : {orden.cajas} <br />
                    </Container>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={(e) => deleteOrdenes(orden.id_sub_orden,e)}>Eliminar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                  </ModalFooter>
                </Modal>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

//export default MinimalDashboard1;
//export default connect(mapStateToProps,  mapDispatchToProps )(MinimalDashboard1);

const mapDispatchToProps = dispatch => ({

  setIdOrden: data => dispatch(setIdOrden(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Orden);