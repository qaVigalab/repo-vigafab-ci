import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";
import Chart from 'react-apexcharts'

import Circle from "react-circle";


const Formadora2 = (props) => {
    var temperatura = [];
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


    const [options2, setOptions2] =useState(
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
                width:2,
                colors:"#9b97d4"
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
                    gradientToColors:["#9b97d4", "#72cab8"],
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
                text: "Ciclo de T° corporal",
                align: 'left',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                  fontSize:  '12px',
                  fontFamily:  "Poppins SemiBold",
                  color:  '#ff6200'
                },
            }
        }) 
        
       const [series2, setSeries2] =useState(
        [{
            name: 'Temperatura',
            data: temperatura,
            
        },]
       )

    const [producto, setProducto] = useState("")
    const [hacumuladas, setHacumuladas] = useState(0)
    const [tiempo, setTiempo] = useState(0)
    const [kgacumulados, setKgacumulados] = useState(0)
    const [estado, setEstado] = useState(0)

    const loadResumen = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenformadora", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            "body": false
        })
            .then(response => response.json())
            .then(result => {
                
                setProducto(result[0].sku + " " + result[0].producto)
                setHacumuladas(result[0].hamburguesas_acumuladas)
                setTiempo(result[0].tiempo_actividad)
                setKgacumulados(result[0].real_kg)
                setEstado(result[0].estado)
            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    const loadGraphTemp = () => {
        
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/gettempformadora", {
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
                    fecha.push(r.fecha),
                    temperatura.push(r.temperatura)
                ))

            }
            ).then(()=>{
                setSeries2([{
                    data:temperatura
                }]);
                setOptions2({xaxis:{categories:fecha}});
            }
            )
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadGraphTemp()
        loadResumen()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            loadGraphTemp();
            loadResumen();
        }, 60000);
        return () => clearInterval(interval);
      }, []);



    return (

        <div>

            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="title1orange">Formadora</div>
                    </Col>

                    <Col md="3"></Col>

                    <Col align="center" md="2">
                        {/*
                        <div className="mt-3">
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
                        </div>{" "} */}
                    </Col>

                    <Col md="3">
                        <div align="center" className="font2 my-4">{Math.round(tiempo / 60 * 100) / 100} hrs Tiempo de Actividad</div>
                    </Col>
                    <Col md="2">
                        <div align="center" className="font2 my-4 pr-3">{estado == 1 ? "Detenida" : "Produciendo"}</div>
                    </Col>

                </Row>
            </div >

            <Row>
                <Col md="3">
                    <div class="noSpace">
                        <div className="blackBorder py-3">
                            <Row >
                                <Col md="5"></Col>
                                <Col md="6">
                                    <Row>
                                        <div align="left" className="indi">{kgacumulados}</div>

                                        <div align="center" className=" mt-3 ml-1">Kg</div>
                                    </Row>
                                </Col>

                            </Row>
                        </div>

                        <div className="blackBorder">
                            <Row >

                                <Col md="12">
                                    <div align="center" className="font3 mt-3 ml-3">{hacumuladas}</div>
                                    <div align="center" className="font2 mb-3 ml-3">Hamburguesas formadas</div>
                                </Col>

                            </Row>
                        </div>
                        <div className=" blackBorder3">
                            <Row >

                                <Col md="6">
                                    <div className="circle space5px">
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
                                            progressColor="#D35400" // String: Color of "progress" portion of circle.
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
                                        <div align="center" className="mt-3">Disponibilidad</div>
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
                                                (0.5) *
                                                100
                                            ).toFixed(0)} // String: Update to change the progress and percentage.
                                            progressColor="#D35400" // String: Color of "progress" portion of circle.
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
                                        <div align="center" className="mt-3">Eficiencia</div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="9">
                    <Row>
                        <Col md="4">
                            <div className="centralbodydetail" style={{ paddingBottom: '10px' }}>
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
                        <Col md="8">
                            <div className="mt-5 mr-3">
                                <Chart
                                    options={options2}
                                    series={series2}
                                    type="line"
                                    width="100%"
                                    height="200px"
                                />
                                
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="bot-description">Receta actual: {" " + producto}</div>
        </div>
    )
}

export default Formadora2