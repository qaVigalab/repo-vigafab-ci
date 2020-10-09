import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import DatePicker from "react-datepicker";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
    Form,
    Label,
    Table,
} from "reactstrap";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import CialWidget from "./CialWidget";
import DetalleHorno from './DetalleHorno'
import FormDateRangePicker from "./DateRangePicker";
import { FormGroup } from "@material-ui/core";

export default class Orden extends Component {
    constructor(props) {
        super(props);

        this.loadOrdenes = this.loadOrdenes.bind(this);

        this.state = {
            ordenes: [],


        };
    }

    loadOrdenes() {
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
                this.setState({ ordenes: result })
                console.log(result)
            }
            )
            .catch(err => {
                console.error(err);
            });
    }
    componentDidMount() {

        this.loadOrdenes()
    }

    render() {
        return <div>
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
                        this.state.ordenes.map((orden, i) => (
                            
                                <tr className={orden.prioridad == 2 ? "orangeRow" : "text-center"}>
                                <th scope="row">{orden.prioridad}</th>
                                <td>{orden.id}</td>
                                <td>{orden.sku}</td>
                                <td>{orden.producto}</td>
                                <td>{orden.cajas}</td>
                                <td> asdasd</td>
                                <td>{orden.tiempo_estimado+" hrs"}</td>
                                <td>{orden.kg_solicitados+" Kg"}</td>
                                <td>Otto</td>
                                <td>@mdo</td>
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
    }



}