import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import icono1 from "./images/icono1.png";
import icono2 from "./images/icono2.png";
import icono3 from "./images/icono3.png";

import Circle from "react-circle";
let data = {
    legend: [
        {
            display: false,
            position: "top",
            fullWidth: true,
            reverse: true,
        },
    ],

    labels: [
        "Inactivo",
        //  "Naranjo",
        //  "Morado",
        "Azul",
        "Amarillo",
        "Rojo",
        "Producción",
    ],
    datasets: [
        {
            data: [2.2, 3, 2, 0.8, 5],
            backgroundColor: [
                "#d9d9d9",
                // "#feb018",
                // "#775dd0",
                "#25a0fc",
                "#ffef45",
                "#ff4560",
                "#2B74BC",
            ],
            hoverBackgroundColor: [
                "#d9d9d9",
                //"#feb018",
                // "#775dd0",
                "#25a0fc",
                "#ffef45",
                "#ff4560",
                "#2B74BC",
            ],
        },
    ],
};

const Produciendo = (props) => {

    const [estado, setEstado] = useState(0)
    const [nOrden, setnOrden] = useState(0)
    const [sku, setSku] = useState("")
    const [producto, setProducto] = useState("")
    const [productividad, setProductividad] = useState(0)
    const [tiempo, setTiempo] = useState(0)
    const [kg_acumulado, setKg_acumulado] = useState(0)
    const [h_acumulado, setH_acumulado] = useState(0)
    const [cajas_acumuladas, setCajas_acumuladas] = useState(0)
    const [kg_solicitado, setKg_solicitado] = useState(0)
    const [h_solicitado, setH_solicitado] = useState(0)
    const [cajas_solicitadas, setcajas_solicitadas] = useState(0)




    const loadResumen = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenempaquetadora2", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
 
                id : props.id_orden                             
              })
        })
            .then(response => response.json())
            .then(result => {
                 setEstado(result[0].estado)
                 setnOrden(result[0].id_sub_orden)
                 setSku(result[0].sku)
                 setProducto(result[0].producto)
                 setProductividad(result[0].productividad)
                 setTiempo(result[0].tiempo_actividad)
                 setKg_acumulado(result[0].real_kg)
                 setH_acumulado(result[0].hamburguesas_acumuladas)
                 setCajas_acumuladas(result[0].cajas_acumuladas)
                 setKg_solicitado(result[0].kg_solicitados)
                 setH_solicitado(result[0].hamburguesas_solicitadas)
                 setcajas_solicitadas(result[0].cajas)
            }
            )
            .catch(err => {
                console.error(err);
            });
    }
    useEffect(() => {
        loadResumen()
      
    }, [])

    useEffect(() => {
        loadResumen()
        
    }, [props.id_orden])

    useEffect(() => {
        const interval = setInterval(() => {
          loadResumen();
        }, 6000);
        return () => clearInterval(interval);
      }, []);

    return (

        <div>

            <div className="title2Orange">
                <Row>
                    <br />
                    <Col md="2">
                        <div align="center" className="font1">{estado == 1 ? "Detenida" : "Produciendo"}</div>
                    </Col>
                    <Col md="2">
                        <Row>
                            <div align="center" className="font2 my-1">N° Orden:</div>
                            <div align="left" className="font3 my-1">{nOrden }</div>
                        </Row>
                    </Col>
                    <Col md="2">
                        <Row>
                            <div align="left" className="font2 my-1">Sku:</div>
                            <div align="left" className="font3 my-1">{sku}</div>
                        </Row>
                    </Col>
                    <Col md="3">
                        <Row>
                            <div align="left" className="font2 my-1">Producto:</div>
                            <div align="left" className="font3 my-1">{producto}</div>
                        </Row>
                    </Col>
                    <Col md="2">
                        <Row>
                            <div align="left" className="font2 my-1">Productividad:</div>
                            <div align="left" className="font3 my-1">{Math.round(productividad*10)/10 + " ham/min"}</div>
                        </Row>
                    </Col>
                    <br />
                </Row>
            </div>

            <div className="titleBlue p-1">
                <Row>
                    <br />
                    <Col align="left" md="5">
                        <div className="font1 my-2 pl-2">Linea de Producción</div>
                    </Col>
                    <Col align="right" md="2">
                        <div className="ml-1">
                            <div className={"indi"} >
                                {props.estado === 1 ? (
                                    <span className="opacity-10 text-success pr-2">
                                        <FontAwesomeIcon icon={faAngleUp} />
                                    </span>
                                ) : (
                                        <span className="opacity-10 text-danger pr-2">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </span>
                                    )}{"65"}
                                <small className="opacity-5 pl-1">%</small>
                            </div>
                        </div>{" "}
                    </Col>

                    <Col md="3">
                        <div align="center" className="font2 my-2">{Math.round(tiempo/60*100)/100 + " "} hrs Tiempo de Actividad</div>
                    </Col>
                    <Col md="2">
                        <div align="center" className="font2 my-2 pr-3">{estado == 1 ? "Detenida" : "Produciendo"}</div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col md="3">
                    <div class="blueRow">
                        <div className="whiteBorder">
                            <Row >
                                <Col md="3">
                                    <div className=" ml-4 mt-2  ">
                                        <img src={icono1} className="rounded float-left mb-2" alt="Balanza" />
                                    </div>
                                </Col>
                                <Col md="9">
                                    <div align="center" className="bigFont mt-3">{kg_acumulado}</div>
                                    <div align="center" className="littleFont">de {" " + kg_solicitado + " "} Kg</div>
                                </Col>

                            </Row>
                        </div>

                        <div className="whiteBorder">
                            <Row >
                                <Col md="3">
                                    <div className="ml-4 mt-2 ">
                                        <img src={icono2} className="rounded float-left mb-2" alt="Empaque" />
                                    </div>
                                </Col>
                                <Col md="9">
                                    <div align="center" className="bigFont mt-3">{h_acumulado}</div>
                                    <div align="center" className="littleFont">de {" " + h_solicitado + " "} F. Pack</div>
                                </Col>

                            </Row>
                        </div>
                        <div className="">
                            <Row >
                                <Col md="3">
                                    <div className="ml-4 mt-2 ">
                                        <img src={icono3} className="rounded float-left mb-2" alt="Caja" />
                                    </div>
                                </Col>
                                <Col md="9">
                                    <div align="center" className="bigFont mt-3">{Math.round(cajas_acumuladas)}</div>
                                    <div align="center" className="littleFont">de {" " + cajas_solicitadas + " "} cajas</div>
                                </Col>

                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="9">
                    <Row>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="10s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        (0.5) *
                                        100
                                    ).toFixed(0)} // String: Update to change the progress and percentage.
                                    progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                                    bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                    textColor="#6b778c" // String: Color of percentage text color.
                                    textStyle={{
                                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                                    }}
                                    percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                                <div align="center" className="mt-4">Disponibilidad</div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="10s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        (0.5) *
                                        100
                                    ).toFixed(0)} // String: Update to change the progress and percentage.
                                    progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                                    bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                    textColor="#6b778c" // String: Color of percentage text color.
                                    textStyle={{
                                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                                    }}
                                    percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                                <div align="center" className="mt-4">Eficiencia</div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="10s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        (0.5) *
                                        100
                                    ).toFixed(0)} // String: Update to change the progress and percentage.
                                    progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                                    bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                    textColor="#6b778c" // String: Color of percentage text color.
                                    textStyle={{
                                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                                    }}
                                    percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                                <div align="center" className="mt-4">Calidad</div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="10s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        (0.5) *
                                        100
                                    ).toFixed(0)} // String: Update to change the progress and percentage.
                                    progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                                    bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                    textColor="#6b778c" // String: Color of percentage text color.
                                    textStyle={{
                                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                                    }}
                                    percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                    roundedStroke={true} // Boolean: Rounded/Flat line ends
                                    showPercentage={true} // Boolean: Show/hide percentage.
                                    showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                />
                                <div align="center" className="mt-4">OEE</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="centralbodydetail" style={{ paddingBottom: '15px' }}>
                                <Doughnut
                                    data={data}
                                    width="12"
                                    height="12"
                                    align="left"
                                    options={{
                                        legend: {
                                            display: false,
                                        },
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }} /></div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    id_orden: state.dashboardReducers.id_orden,
  });

export default connect(mapStateToProps)(Produciendo)
