import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";

import { Doughnut } from "react-chartjs-2";

import Circle from "react-circle";


const Empaque = (props) => {
    const id_vibot = 6296;
    var temperatura = [];
    var date;
    var newDate;
    var fecha = [];
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
            "Paro sin Justificar",
            "Paro Justificado",
            "Producción",
        ],
        datasets: [
            {
                data: [3, 2, 0.8, 5],
                backgroundColor: [
                    "#d9d9d9",
                    "#F7431E  ",
                    "#FFB000",
                    "#2264A7",
                ],
                hoverBackgroundColor: [
                    "#d9d9d9",
                    "#F7431E  ",
                    "#FFB000",
                    "#2264A7 ",
                ],
            },
        ],
    };


    const [producto, setProducto] = useState("")
    const [hacumuladas, setHacumuladas] = useState(0)
    const [tActivo, setTActivo] = useState(0)
    const [tInactivo, setTInactivo] = useState(0)
    const [kgacumulados, setKgacumulados] = useState(0)
    const [estado, setEstado] = useState(0)
    const capacidad = 3000;

    const loadResumen = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenmaquina", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },

            body: JSON.stringify({
                id_vibot: id_vibot,
            }),
        })
            .then(response => response.json())
            .then(result => {

                console.log(result)
                setTActivo(result[0].tiempo_actividad)
                setTInactivo(result[0].tiempo_inactivo)
                setProducto(result[0].sku + " " + result[0].producto)
                setEstado(result[0].estado)
                setHacumuladas(result[0].hamburguesas_acumuladas)
                setKgacumulados(result[0].real_kg)
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
        const interval = setInterval(() => {

            loadResumen();
        }, 6000);
        return () => clearInterval(interval);
    }, []);



    return (

        <div>

            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="left" md="4">
                        <div className="text-uppercase font-weight-bold title1orange my-1 ml-3">Empaque</div>
                    </Col>
                    <Col md="4">
                        <Row align="right">
                            <div className="font2 ml-3 my-4">Estado</div>
                            <div className={estado == 1 ? "font2Red ml-1 my-4" : "font2Blue ml-1 my-4"}>{estado == 1 ? " Detenida" : " Produciendo"}</div>
                        </Row>
                    </Col>


                    <Col md="4">
                        <Row align="right">
                            <div className="font2 ml-3 my-4">Tiempo de Actividad</div>
                            <div className="font2Blue ml-1 my-4">{" 1" + Math.round(tActivo / 60 * 100) / 100} hrs</div>
                        </Row>
                        
                    </Col>

                </Row>
            </div >
            <Row>
                <Col md="5" className="blackBorderRight">
                    <div class="noSpace ">
                        <div className="blackBorderBot">

                            <Row className="mt-4">


                                <div align="center" className="ml-auto indi">{kgacumulados + 188}</div>
                                <div align="center" className="font2 mt-3 ml-2 mr-auto">de 300 F.Packs</div>

                            </Row>
                            <Row className="mt-1 mb-4">
                                <div align="left" className="ml-auto indi">{kgacumulados + 1656}</div>
                                <div align="center" className="font2 mt-3 ml-2 mr-auto"> de 1800 Kgs</div>

                            </Row>

                        </div>
                        <div className="my-3">
                            <Row >

                                <Col md="6 my-auto">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (tActivo / (tInactivo + tActivo)) + 1 * 100
                                            ).toFixed(0)} // String: Update to change the progress and percentage.
                                            progressColor="#02c39a" // String: Color of "progress" portion of circle.
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
                                        <div align="center" className="font2 mt-3">Disponibilidad</div>
                                    </div>
                                </Col>

                                <Col md="6">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (hacumuladas / (tActivo + tInactivo) / (capacidad / (tActivo + tInactivo))) * 100
                                            ).toFixed(0)} // String: Update to change the progress and percentage.
                                            progressColor="#02c39a" // String: Color of "progress" portion of circle.
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
                                        <div align="center" className="font2 mt-3">Eficiencia</div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="7">
                    <Row>
                        <Col md="10" xs="12" className="mx-auto">
                            <div className="centralbodydetail">
                                <Doughnut
                                    data={data}
                                    width="12"
                                    height="12"
                                    align="center"
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
            {
                //<div className="bot-description">Receta actual: {" " + producto}</div>
            }
        </div>
    )
}

export default Empaque