import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { connect } from "react-redux";
import { setIdOrden } from '../../../actions/dashboardActions'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const Orden = (props) => {

  const [ordenes, setOrdenes] = useState([]);

  const loadOrdenes =  () => {
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
        /*try {
          let ord = result.find(o => o.id_estado == 1);
          console.log(ord.id_sub_orden)
         props.setIdOrden(ord.id_sub_orden)

        } catch (e) { console.log(e)}*/
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
      <Container>
        <div className="title1orange">Produccion en línea</div>
      </Container>
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
                 {orden.id_estado == 3 ? <CheckCircleIcon style={{ color: green[500] }} /> : <RadioButtonUncheckedIcon />}              </td>
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