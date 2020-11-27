import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import icono1 from "./images/icono1.png";
import icono2 from "./images/icono2.png";
import icono3 from "./images/icono3.png";
import TimeLine from "./TimeLine";

import Circle from "react-circle";

const Produciendo = (props) => {
    const [calidad, setCalidad] = useState(0)
    const [eficiencia, setEficiencia] = useState(0)
    const [disponibilidad, setDisponibilidad] = useState(0)
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
    const [perdidaEnvasado, setPerdidaEnvasado] = useState(0)
    const [perdidaEmpaquetadora, setPerdidaEmpaquetadora] = useState(0)
    const [perdidaTotal, setPerdidaTotal] = useState(0)
    const [dataTorta, setDataTorta] = useState(
        {
            legend: [
                {
                    display: false,
                    position: "top",
                    fullWidth: true,
                    reverse: true,
                },
            ],

            labels: [
                "Desconectado",
                "Paro sin Justificar",
                "Paro Justificado",
                "Producción",
            ],
            datasets: [
                {
                    data: [],
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
        }
    )



    const loadResumen = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenlinea", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_orden: localStorage.getItem("id_orden")
              }),
        })
            .then(response => response.json())
            .then(result => {
                setEstado(result[0].estado)
                setnOrden(result[0].id_sub_orden)
                setSku(result[0].sku)
                setProducto(result[0].producto)
                setProductividad(result[0].productividad)
                setTiempo(result[0].tiempo)
                setKg_acumulado(result[0].real_kg) 
                setH_acumulado(result[0].hamburguesas_acumuladas) 
                setCajas_acumuladas(result[0].cajas_acumuladas)
                setKg_solicitado(result[0].kg_solicitados)
                setH_solicitado(result[0].hamburguesas_solicitadas)
                setcajas_solicitadas(result[0].cajas)
                setCalidad((result[0].cajas_acumuladas * result[0].kg_caja) / (result[0].real_kg == 0 ? 1 : result[0].real_kg))
                setEficiencia(((result[0].cajas_acumuladas * result[0].kg_caja) / (result[0].kg_hora * ( (result[0].tiempo == 0 ? 1 : result[0].tiempo)) / 60)))
                setDisponibilidad((result[0].tiempo_actividad / ((result[0].tiempo_inactivo == 0 ? 1 : result[0].tiempo_inactivo) + result[0].tiempo_actividad)))
                setPerdidaEnvasado(1-(((result[0].hamburguesas_acumuladas*result[0].g_hamburguesa)/1000)/result[0].real_kg))
                setPerdidaEmpaquetadora(1-((result[0].cajas_acumuladas*result[0].kg_caja)/((result[0].hamburguesas_acumuladas*result[0].g_hamburguesa)/1000)))
                setPerdidaTotal(1-((result[0].cajas_acumuladas*result[0].kg_caja)/result[0].real_kg))

            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    const loadTorta = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getparosgeneral", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_orden: localStorage.getItem("id_orden")
              }),
        })
            .then(response => response.json())
            .then(r => {
                let data = [];
                if (r[0].tiempo_paro == 0 && r[0].tiempo_justificado == 0 && r[0].tiempo_produccion == 0) {
                    data = [1, 0, 0, 0]
                } else {
                    data = [0, Math.round(r[0].tiempo_paro / 60 * 100) / 100, Math.round(r[0].tiempo_justificado / 60 * 100) / 100, Math.round(r[0].tiempo_produccion / 60 * 100) / 100]
                }

                setDataTorta(
                    {
                        datasets: [
                            {
                                data: [Math.round(r[0].tiempo_desconectado / 60 * 100) / 100, Math.round(r[0].tiempo_paro / 60 * 100) / 100, Math.round(r[0].tiempo_justificado / 60 * 100) / 100, Math.round(r[0].tiempo_produccion / 60 * 100) / 100]
                            }
                        ],
                    }
                )
            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadResumen()
        loadTorta()
      }, [props.id_orden]);

    useEffect(() => {
        setTimeout(() => {
            loadResumen()
            loadTorta()
          }, 2000);
        
        const interval = setInterval(() => {
            loadResumen();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (

        <div>

            <div className="title2Orange">
                <Row className= 'sticky-row'>
                    <br />
                    <Col md="2">
                        <div align="left" className="text-uppercase font-weight-bold my-1 ml-4">{estado == 1 ? "Detenida" : "Produciendo"}</div>
                    </Col>
                    <Col md="2">
                        <Row>
                            <div align="center" className="font2 my-1">N° Orden:</div>
                            <div align="left" className="font3 my-1">{nOrden}</div>
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
                            <div align="left" className="font3 my-1">{Math.round(productividad * 10) / 10 + " ham/min"}</div>
                        </Row>
                    </Col>
                    <br />
                </Row>
            </div>

            <div className="titleBlue ">
                <Row>
                    <br />
                    <Col align="left" md="2">
                        <div className="text-uppercase font-weight-bold ml-3 titleBlue">Línea de Producción</div>
                    </Col>
                    <Col>
                        <Row >
                            <Col align="right">
                                <div className="font2  my-1">Estado</div></Col>
                            <div className={estado == 1 ? "font2White  my-1" : "font2White my-1"}>{estado == 1 ? " Detenida" : " Produciendo"}</div>
                            <div className="font2 ml-3 my-1">Tiempo Total</div>
                            <div align="right" className="font2White ml-1 mr-5 my-1">{Math.round(tiempo / 60 * 100) / 100} hrs</div>

                        </Row>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col className="blueRow ml-3" md="3">

                    <div className="whiteBorder">
                        <Row className="mb-2">
                            <Col md="3">
                                <div className=" ml-4 my-3  ">
                                    <img src={icono1} className="rounded float-left mb-2" alt="Balanza" />
                                </div>
                            </Col>
                            <Col md="9">
                                <div align="center" className="bigFont mt-4">{Intl.NumberFormat().format(Math.round(kg_acumulado * 100) / 100)}</div>
                                <div align="center" className="littleFont">de {" " + Intl.NumberFormat().format(Math.round(kg_solicitado * 100) / 100) + " "} Kg</div>
                            </Col>

                        </Row>
                    </div>

                    <div className="whiteBorder">
                        <Row className="mb-2" >
                            <Col md="3">
                                <div className="ml-3 my-3 ">
                                    <img src={icono2} className="rounded float-left mb-2" alt="Empaque" />
                                </div>
                            </Col>
                            <Col md="9">
                                <div align="center" className="bigFont mt-4">{Intl.NumberFormat().format(h_acumulado)}</div>
                                <div align="center" className="littleFont">de {" " + Intl.NumberFormat().format(Math.round(h_solicitado)) + " "} F. Pack</div>
                            </Col>

                        </Row>
                    </div>
                    <div className="">
                        <Row className="mb-2">
                            <Col md="3">
                                <div className="ml-4 my-3 ">
                                    <img src={icono3} className="rounded float-left mb-3" alt="Caja" />
                                </div>
                            </Col>
                            <Col md="9">
                                <div align="center" className="bigFont mt-4">{Intl.NumberFormat().format(Math.round(cajas_acumuladas))}</div>
                                <div align="center" className="littleFont">de {" " + Intl.NumberFormat().format(cajas_solicitadas) + " "} cajas</div>
                            </Col>

                        </Row>
                    </div>

                </Col>
                <Col md="8" className="ml-5">
                    <Row>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="3s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        disponibilidad>1 ? 100 : disponibilidad * 100
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
                                <div align="center" className="mt-4">Disponibilidad</div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="3s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        eficiencia>1 ? 100 : eficiencia * 100 //(totalKG/capacidad*tiempo que se demoro)
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
                                <div align="center" className="mt-4">Eficiencia</div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="3s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                     calidad>1 ? 100 : calidad * 100 
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
                                <div align="center" className="mt-4">Calidad</div>
                            </div>
                        </Col>
                        <Col md="2">
                            <div className="circle">
                                <Circle
                                    animate={true} // Boolean: Animated/Static progress
                                    animationDuration="3s" // String: Length of animation
                                    responsive={true} // Boolean: Make SVG adapt to parent size
                                    size="100" // String: Defines the size of the circle.
                                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                    progress={(
                                        (eficiencia * disponibilidad * calidad) > 1 ? 100 : eficiencia * disponibilidad * calidad *100
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
                                <div align="center" className="mt-4">OEE</div>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="centralbodydetail" style={{ paddingBottom: '15px' }}>
                                <Doughnut
                                    data={dataTorta}
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
            <Row className="blackBorderTop mx-2">
                <Col xs="12" className="my-3 mx-2">
                    <TimeLine />
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(Produciendo)
