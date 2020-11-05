import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Chart from 'react-apexcharts'
import Circle from "react-circle";
import ReactApexChart from "react-apexcharts";

const Iqf2 = () => {
    const id_vibot = 38058;
    var temperatura = [];
    var fecha = [];
    var velocidad = [];
    var date, newDate;

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
    const [kgacumulados, setKgacumulados] = useState(0)
    const [estado, setEstado] = useState(0)
    const [capacidad, setCapacidad] = useState(0)

    const labels = {
        enabled: false
    };
    const markers = {
        size: 0
    };
    const tooltips = {

        x: {
            format: 'dd/MM/yy HH:mm',

        },
        y: {
            formatter: undefined,
            title: {
                formatter: '',
            },
        },
    };
    const [seriesTimeLine, setSeriesTimeLine] = useState([])
    const [optionsTimeLine, setOptionsTimeLine] = useState(

        {

            dataLabels: labels,
            markers: markers,
            tooltip: tooltips,

            chart: {
                type: 'rangeBar',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    distributed: false,
                    dataLabels: {
                        hideOverflowingLabels: false
                    }
                }
            },

            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false
                }
            },

            grid: {
                row: {
                    colors: ['#f3f4f5', '#fff'],
                    opacity: 1
                }
            }
        }
    )


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
                setTInactivo(result[0].tiempo_inactivo == 0 ? 1 : result[0].tiempo_inactivo)
                setEstado(result[0].estado)
                setKgacumulados(result[0].real_kg)
                setCapacidad(result[0].kg_hora)
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

    const loadTimeLine = () => {

        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/gettimelinemaquina", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_vibot: id_vibot,
            }),
        })
            .then((response) => response.json())
            .then((r) => {
                var objeto = {};
                var objetos = [
                    {
                        x: 'En Producción',
                        y: [new Date(r[0].hora_inicio).getTime() - 2,
                        new Date(r[0].hora_inicio).getTime() - 1],
                        fillColor: '#2264A7'
                    },
                    {
                        x: 'En Paro',
                        y: [new Date(r[0].hora_inicio).getTime() - 1,
                        new Date(r[0].hora_inicio).getTime()],
                        fillColor: '#F7431E'
                    }
                ];
                for (let i = 0; i < r.length; i++) {

                    objeto = {
                        x: r[i].id_tipo == 2 ? 'En Producción' : 'En Paro',
                        y: [
                            new Date(r[i].hora_inicio).getTime(),
                            new Date(r[i].hora_termino).getTime()
                        ],
                        fillColor: r[i].id_tipo == 2 ? '#2264A7' : '#F7431E'

                    }
                    objetos.push(objeto)
                }
                //console.log(objetos)
                setSeriesTimeLine([{
                    data: objetos
                }]);
                //console.log(objetos)
            })

            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadGraphs()
        //loadTimeLine()
        loadKpi()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            loadGraphs()
            loadKpi()
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (

        <div>

            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="text-uppercase font-weight-bold title1orange my-1">Iqf</div>
                    </Col>

                    <Col  >
                        <Row >
                            <Col align="right">
                            <div className="font2  my-4 ">Estado</div></Col>
                            <div className={estado == 1 ? "font2gray  my-4" : "font2Blue my-4"}>{estado == 1 ? " Detenida" : " Produciendo"}</div>
                            <div className="font2 ml-3 my-4">Tiempo de Actividad</div>
                            <div  className="font2Blue ml-2 my-4 mr-5">{Math.round(tActivo / 60 * 100) / 100} hrs</div>

                        </Row>

                    </Col>

                </Row>
            </div >

            <Row>
                <Col md="2" className="blackBorderRight">
                    <div class="noSpace">
                        <div className="ml-5 mt-3">
                            <Row >
                                <Col md="8" align="center">
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
                                <Col md="8"><div align="center" className="">Disponibilidad</div></Col>
                            </Row>
                        </div>
                        <div className="ml-5 my-4">
                            <Row >
                                <Col md="8">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (kgacumulados / (capacidad * ((tActivo + tInactivo) / 60))) * 100 //(totalKG/capacidad*tiempo que se demoro)
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
                                <Col md="8"><div align="center" className="">Eficiencia</div></Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="10">
                    <Row>
                        <Col md="6">
                            <div className=" my-4 mr-3">
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
                            <div className="mr-5 my-4">
                                <Chart 
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
            {/*
            <Row>
                <Col xs="12">
                    <div id="chart">
                        <ReactApexChart options={optionsTimeLine} series={seriesTimeLine} type="rangeBar" height={150} />

                    </div>
                </Col>
            </Row>
            */}
            
            {
                //<div className="bot-description">Receta actual: {" " + producto}</div>
            }
        </div>
    )
}

export default Iqf2