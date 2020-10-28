import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Chart from 'react-apexcharts'
import Circle from "react-circle";
import { set } from "date-fns"; 

const Iqf2 = () => {
    const id_vibot = 38058;
    var temperatura = [];
    var fecha = [];
    var velocidad = [];
    var date,newDate;

    const [options, setOptions] = useState(
        {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: "#2264A7"
            },
            xaxis: {
                type: 'datetime',
                categories: fecha,
                labels: {
                    datetimeUTC: false
                }

            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy HH:mm:ss'
                },
                marker: {
                    fillColors: ["#ff6c1c"]
                }
            },
            fill: {
                //colors:"#72cab8",
                type: 'gradient',
                gradient: {
                    enabled: true,
                    gradientToColors: ["#2264A7", "#2264A7"],
                    inverseColors: true,
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            markers: {
                size: 0,
                colors: ["#ff6c1c"],
                strokeColor: "white",
                strokeWidth: 1,

            },
            title: {
                text: "RPM/Velocidad de Giro",
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '16px',
                    fontFamily: "Poppins SemiBold",
                    color: '#606060'
                },
            }
        })

    const [series, setSeries] = useState(
        [{
            name: 'Velocidad',
            data: velocidad,

        },]
    )

    const [options2, setOptions2] = useState(
        {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: "#2264A7"
            },
            xaxis: {
                type: 'datetime',
                categories: fecha,
                labels: {
                    datetimeUTC: false
                }

            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy HH:mm:ss'
                },
                marker: {
                    fillColors: ["#ff6c1c"]
                }
            },
            fill: {
                //colors:"#72cab8",
                type: 'gradient',
                gradient: {
                    enabled: true,
                    gradientToColors: ["#2264A7", "#2264A7"],
                    inverseColors: true,
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100]
                }
            },
            markers: {
                size: 0,
                colors: ["#ff6c1c"],
                strokeColor: "white",
                strokeWidth: 1,

            },
            title: {
                text: "T° de Salida",
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '16px',
                    fontFamily: "Poppins SemiBold",
                    color: '#606060'
                },
            }
        })

    const [series2, setSeries2] = useState(
        [{
            name: 'Temperatura',
            data: temperatura,

        },]
    )

    const [tActivo, setTActivo] = useState(0)
    const [tInactivo, setTInactivo] = useState(0)

    const capacidad=3000;
    const [estado, setEstado] = useState(0)
    const [producto, setProducto] = useState("")
    const [h_acumulado, setH_acumulado] = useState(0)

    const loadKpi = () => {
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
                setTActivo(result[0].tiempo_actividad)
                setTInactivo(result[0].tiempo_inactivo)
                setProducto(result[0].sku + " " + result[0].producto)
                setEstado(result[0].estado)
                setH_acumulado(result[0].hamburguesas_acumuladas)
            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    const loadGraphs = () => {

        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/gettempiqf", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            "body": false
        })
            .then(response => response.json())
            .then(result => {
                result.map(r => (
                    newDate = new Date(r.fecha),
                    newDate.setHours(newDate.getHours() + 3),
                 date =
                    ("00" + (newDate.getMonth() + 1)).slice(-2) + "-" +
                    ("00" + newDate.getDate()).slice(-2) + "-" +
                    newDate.getFullYear() + " " +
                    ("00" + newDate.getHours()).slice(-2) + ":" +
                    ("00" + newDate.getMinutes()).slice(-2) + ":" +
                    ("00" + newDate.getSeconds()).slice(-2),
                    fecha.push(date),
                    temperatura.push(r.temperatura),
                    velocidad.push(r.velocidad)

                ))

            }
            ).then(() => {
                setSeries2([{
                    data: temperatura
                }]);
                setOptions2({ xaxis: { categories: fecha } });
                setSeries([{
                    data: velocidad
                }]);
                setOptions({ xaxis: { categories: fecha } });
            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadGraphs()
        loadKpi()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            loadGraphs()
            loadKpi()
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (

        <div>

            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="text-uppercase font-weight-bold title1orange">IQF</div>
                    </Col>

                    <Col md="6"></Col>


                    <Col md="4">
                        <div align="left" className="font2 mr-1 my-4">{Math.round(tActivo / 60 * 100) / 100} hrs Tiempo de Actividad</div>
                    </Col>

                </Row>
            </div >

            <Row>
                <Col md="2">
                    <div class="noSpace">
                        <div className="ml-4">
                            <Row >
                                <Col md="10">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (tActivo / (tInactivo + tActivo)) * 100
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

                                    </div>
                                </Col>
                                <Col md="12"><div align="center" className="mr-4">Disponibilidad</div></Col>
                            </Row>
                        </div>
                        <div className="ml-4 mt-3">
                            <Row >
                                <Col md="10">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (h_acumulado/(tActivo+tInactivo)/(capacidad/(tActivo+tInactivo)))*100
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

                                    </div>
                                </Col>
                                <Col md="12"><div align="center" className="mr-4">Eficiencia</div></Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="10">
                    <Row>
                        <Col md="6">
                            <div className=" mt-3">
                                <Chart
                                    options={options}
                                    series={series}
                                    type="line"
                                    width="100%"
                                    height="290px"
                                />

                            </div>
                        </Col>
                        <Col md="6">
                            <div className="">
                                <Chart className="pt-3"
                                    options={options2}
                                    series={series2}
                                    type="line"
                                    width="100%"
                                    height="290px"
                                />
                            </div>
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

export default Iqf2