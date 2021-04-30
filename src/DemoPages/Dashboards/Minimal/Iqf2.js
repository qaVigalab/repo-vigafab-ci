import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Chart from 'react-apexcharts'
import Circle from "react-circle";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";

const Iqf2 = (props) => {
    const id_vibot = 59512;
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
                    datetimeUTC: true
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
                    datetimeUTC: true
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
    );

    const [tActivo, setTActivo] = useState(0);
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

    const loadGraphs = () => {
        fetch(global.api.dashboard.gettempiqf, {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_orden: props.ordenSelected.id_sub_orden
            }),
        })
            .then(response => response.json())
            .then(result => {
                result.map(r => (
                    fecha.push(r.fecha),
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
    };

    useEffect(() => {
        if (Object.keys(props.ordenSelected).length > 0){
            loadGraphs();
            const interval = setInterval(() => {
                loadGraphs();
            }, 300000);
            return () => clearInterval(interval);
        }
    }, [props.ordenSelected]);

    return (
        <div>
            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="text-uppercase font-weight-bold title1orange my-1">Iqf</div>
                    </Col>

                    <Col>
                        <Row>
                            <Col align="right">
                                <div className="font2 my-4">Estado: </div>
                            </Col>
                            <div className={props.ordenSelected.id_estado !== 1 ? "font2gray my-4" : "font2Blue my-4"}>{
                                props.ordenSelected.id_estado === 3 ? "Detenida"
                                : props.ordenSelected.id_estado === 2 ? "En espera"
                                : "Produciendo"
                            }</div>
                            
                            <div className="font2 ml-3 my-4">Tiempo de Actividad: </div>
                            {parseInt(tActivo/60) === 1 ?
                                <div className={props.ordenSelected.id_estado !== 1 ? "font2gray ml-2 my-4" : "font2Blue ml-2 my-4"}>
                                    {parseInt(tActivo/60)} hr,
                                    {" " + parseInt(tActivo%60)} min
                                </div> :
                                <div className={props.ordenSelected.id_estado !== 1 ? "font2gray ml-2 my-4" : "font2Blue ml-2 my-4"}>
                                    {parseInt(tActivo/60)} hrs,
                                    {" " + parseInt(tActivo%60)} min
                                </div> 
                            }

                            <div className="font2 ml-2 my-4"> </div>
                            <div className={props.ordenSelected.id_estado !== 1 ? "font2gray ml-2 mr-5 my-4" : "font2Blue ml-2 mr-5 my-4"}>
                                 
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div >

            <Row>
                <Col md="1"></Col>
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
                <Col md="1"></Col>
            </Row>

            <Row className="blackBorderTop mx-2">
                <Col md="12" className="my-3 mx-2"></Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Iqf2);