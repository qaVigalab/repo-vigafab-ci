import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";
import Chart from 'react-apexcharts'
import { connect } from "react-redux";
import Circle from "react-circle";
import ReactApexChart from "react-apexcharts";
import "moment/locale/es";
import _ from "lodash";



const Formadora2 = (props) => {
    const id_vibot = 6296;
    var temperatura = [];
    var fecha = [];
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
                "Producción",
            ],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        "#d9d9d9",
                        "#F7431E  ",
                        "#2264A7",
                    ],
                    hoverBackgroundColor: [
                        "#d9d9d9",
                        "#F7431E  ",
                        "#2264A7 ",
                    ],
                },
            ],
        }
    )

    const [options3, setOptions3] = useState(
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
                colors: "#02c39a"
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
                    gradientToColors: ["#02c39a", "#02c39a"],
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
    const [series3, setSeries3] = useState(
        [{
            name: 'Temperatura',
            data: temperatura,

        },]
    )
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
    const [productividad, setProductividad] = useState(0)
    const [hacumuladas, setHacumuladas] = useState(0)
    const [tActivo, setTActivo] = useState(0)
    const [tInactivo, setTInactivo] = useState(0)
    const [kgacumulados, setKgacumulados] = useState(0)
    const [estado, setEstado] = useState(0)
    const [capacidad, setCapacidad] = useState(0)

    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear:function (num){
        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
        var regx = /(\d+)(\d{3})/;
        while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }
        return this.simbol + splitLeft +splitRight;
        },
        new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num);
        }
       }

    const loadResumen = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenmaquina", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },

            body: JSON.stringify({
                id_vibot: id_vibot,
                id_orden: localStorage.getItem("id_orden")
            }),
        })
            .then(response => response.json())
            .then(result => {
                let data = [];
                if (result[0].tiempo_inactivo == 0 && result[0].tiempo_actividad == 0) {
                    data = [1, 0, 0]
                } else {
                    data = [0, Math.round(result[0].tiempo_inactivo / 60 * 100) / 100, Math.round(result[0].tiempo_actividad / 60 * 100) / 100]
                }
                setTActivo(result[0].tiempo_actividad)
                setProductividad(result[0].productividad)
                setTInactivo(result[0].tiempo_inactivo == 0 ? 1 : result[0].tiempo_inactivo)
                setEstado(result[0].estado)
                setHacumuladas(result[0].hamburguesas_acumuladas)
                setKgacumulados(result[0].real_kg)
                setCapacidad(result[0].kg_hora)
                setDataTorta(
                    {
                        datasets: [
                            {
                                data: data
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

    const loadGraphTemp = () => {
        fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/gettempformadora", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_orden: localStorage.getItem("id_orden")
            }),
        })
            .then(response => response.json())
            .then(result => {
                result.map(r => (
                    fecha.push(r.fecha),
                    temperatura.push(r.temperatura)
                ))
            }
            ).then(() => {

                setSeries3([{

                    data: temperatura
                }]);
                setOptions3({ xaxis: { categories: fecha } });

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
                id_orden: localStorage.getItem("id_orden")
            }),
        })
            .then((response) => response.json())
            .then((r) => {
                var objeto = {};
                var objetos = [
                    {
                        x: 'Prod',
                        y: [new Date(r[0].hora_inicio).getTime(),
                        new Date(r[0].hora_inicio).getTime()],
                        fillColor: '#2264A7'
                    },
                    {
                        x: 'Paro',
                        y: [new Date(r[0].hora_inicio).getTime(),
                        new Date(r[0].hora_inicio).getTime()],
                        fillColor: '#F7431E'
                    }
                ];
                for (let i = 0; i < r.length; i++) {

                    objeto = {
                        x: r[i].id_tipo == 2 ? 'Prod' : 'Paro',
                        y: [
                            new Date(r[i].hora_inicio).getTime(),
                            new Date(r[i].hora_termino).getTime()
                        ],
                        fillColor: r[i].id_tipo == 2 ? '#2264A7' : '#F7431E'

                    }
                    objetos.push(objeto)
                }
                setSeriesTimeLine([{
                    data: objetos
                }]);
            })

            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        loadResumen()
        loadGraphTemp()
        loadTimeLine()
    }, [props.id_orden]);

    useEffect(() => {
        setTimeout(() => {
            loadGraphTemp()
            loadResumen()
            loadTimeLine()
        }, 3000);
        const interval = setInterval(() => {
            loadResumen();
        }, 30000);
        return () => clearInterval(interval);
    }, []);



    return (

        <div>

            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="text-uppercase font-weight-bold title1orange my-1">Formadora</div>
                    </Col>

                    <Col >
                        <Row >
                            <Col align="right">
                                <div className="font2  my-4 ">Estado</div></Col>
                            <div className={estado == 1 ? "font2gray  my-4" : "font2Blue my-4"}>{estado == 1 ? " Detenida" : " Produciendo"}</div>
                            <div className="font2 ml-3 my-4">Tiempo de Actividad</div>
                            <div className="font2Blue ml-1 mr-5 my-4">{formatNumber.new(_.round(tActivo/60,2))} hrs</div>
                            <div className="font2 ml-3 my-4">Productividad</div>
                            <div className="font2Blue ml-1 mr-5 my-4">{formatNumber.new(_.round(productividad))+ " ham/min"}</div>

                        </Row>

                    </Col>

                </Row>
            </div >



            <Row>
                <Col md="2" className="blackBorderRight">
                    <div class="noSpace">
                        <div className="blackBorderBot">
                            <Row className="my-4">


                                <div align="center" className="ml-auto indi">{formatNumber.new(_.round(kgacumulados))}</div>
                                <div align="center" className="font2 mt-3 ml-2 mr-auto">     Kg </div>

                            </Row>
                        </div>

                        <div className="blackBorderBot">
                            <Row className="" >

                                <Col md="12">
                                    <div align="center" className="indi mt-3 ">{formatNumber.new(_.round(hacumuladas))}</div>
                                    <div align="left" className="font2 mb-3 ">Hamburguesas formadas</div>
                                </Col>

                            </Row>
                        </div>
                        <div className="my-3">
                            <Row >

                                <Col md="6">
                                    <div className="circle space5px ml-5">
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
                                    <div align="left" className="mt-2 ml-2">Disponibilidad</div>
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
                                    <div align="center" className="mt-2">Eficiencia</div>
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
                        <Col md="8">
                            <div className="mt-5 mr-3">
                                <Chart
                                    options={options3}
                                    series={series3}
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
            <Row>
                <Col xs="12">
                    <div id="chart" className="m-3">
                        <ReactApexChart options={optionsTimeLine} series={seriesTimeLine} type="rangeBar" height={150} />

                    </div>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(Formadora2);
