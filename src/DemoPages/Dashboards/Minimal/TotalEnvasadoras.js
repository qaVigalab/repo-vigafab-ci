import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";

import { Doughnut } from "react-chartjs-2";

import Circle from "react-circle";


const TotalEnvasadoras = (props) => {

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
    const [hacumuladas, setHacumuladas] = useState(0)
    const [tActivo, setTActivo] = useState(0)
    const [tInactivo, setTInactivo] = useState(0)
    const [kgacumulados, setKgacumulados] = useState(0)
    const [kgsolicitados, setKgsolicitados] = useState(0)
    const [hsolicitadas, setHsolicitadas] = useState(0)
    const [estado, setEstado] = useState(0)
    const [capacidad, setCapacidad] = useState(0)

    const loadResumen = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenenvasadoras", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            "body": false
        })
            .then(response => response.json())
    .then(result => {

        setTActivo(result[0].tiempo_actividad)
        setTInactivo(result[0].tiempo_inactivo)
        setEstado(result[0].estado)
        setHacumuladas(result[0].hamburguesas_acumuladas)
        setKgacumulados(result[0].real_kg)
        setKgsolicitados(result[0].kg_solicitados)
        setHsolicitadas(result[0].hamburguesas_solicitadas)
        setCapacidad(result[0].kg_hora)
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
    }, 60000);
    return () => clearInterval(interval);
}, []);



return (

    <div>

        <div className="blackBorder2" >
            <Row>
                <br />
                <Col align="center" md="4">
                    <div className="text-uppercase font-weight-bold title1orange my-1">TOTAL ENVASADORAS</div>
                </Col>
                <Col md="4">
                    <Row align="right">
                        <div className="font2  my-4">Estado</div>
                        <div className={estado == 0 ? "font2gray ml-1 my-4" : "font2Blue ml-1 my-4"}>{estado+"/4 Env. Produciendo"}</div>
                    </Row>
                </Col>


                <Col md="4">
                    <Row align="right">
                        <div className="font2 ml-3 my-4">Tiempo de Actividad</div>
                        <div className="font2Blue ml-1 my-4">{ Math.round(tActivo / 60 * 100) / 100} hrs</div>
                    </Row>

                </Col>

            </Row>
        </div >
        <Row>
            <Col md="5" className="blackBorderRight">
                <div class="noSpace ">
                    <div className="blackBorderBot">

                        <Row className="mt-4">


                            <div align="center" className="ml-auto indi">{Intl.NumberFormat().format(hacumuladas) }</div>
                            <div align="center" className="font2 mt-3 ml-2 mr-auto">de { Intl.NumberFormat().format(hsolicitadas)} F.Packs</div>

                        </Row>
                        <Row className="mt-1 mb-4">
                            <div align="left" className="ml-auto indi">{Intl.NumberFormat().format(kgacumulados) }</div>
                            <div align="center" className="font2 mt-3 ml-2 mr-auto"> de { Intl.NumberFormat().format(kgsolicitados)} Kgs</div>

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
                                            (tActivo / (tInactivo + tActivo))* 100
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
                                            (kgacumulados/ (capacidad *((tActivo + tInactivo)/60))) * 100 //(totalKG/capacidad*tiempo que se demoro)
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

export default TotalEnvasadoras