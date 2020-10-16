import React, { useEffect,useState } from "react";
import {
    Container,
    Table
} from "reactstrap";

const Orden = () => {

    const [ordenes, setOrdenes] = useState([])

    const loadOrdenes = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getordenes", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            "body": false
        })
            .then(response => response.json())
            .then(result => {
                setOrdenes(result)
            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadOrdenes()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            loadOrdenes();
        }, 60000);
        return () => clearInterval(interval);
      }, []);

        return( <div>
            <Container><div className="title1orange">Produccion en línea</div></Container><br />
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
                        <th>     <div className="check">
                            <i className="lnr-checkmark-circle"> </i>
                        </div>

                        </th>
                    </tr>

                </thead>
                <tbody>
                    {

                        ordenes.map((orden, i) => (

                            <tr className={orden.prioridad == 1 ? "orangeRow" : "text-center"}>
                                <th scope="row">{orden.prioridad}</th>
                                <td>{orden.id_sub_orden}</td>
                                <td>{orden.sku}</td>
                                <td>{orden.producto}</td>
                                <td>{orden.cajas}</td>
                                <td>{Math.round(orden.productividad*100)/100 + " ham/min"}</td>
                                <td>{Math.round(orden.tiempo_estimado*100)/100 + " hrs"}</td>
                                <td>{orden.kg_solicitados + " Kg"}</td>
                                <td>{orden.real_kg +  " Kg"}</td>
                                <td>{orden.kg_porcentual == null ? "0 %" : orden.kg_porcentual + " %"}</td>
                                <td><div className="container">
                                    <div className="round">
                                        <input type="checkbox" id="checkbox" />
                                        <label for="checkbox"></label>
                                    </div>
                                </div></td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>

            </div>
        )
    

}

export default Orden