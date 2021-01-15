import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";

import { Doughnut } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import Circle from "react-circle";
import _ from "lodash";

const Empaque = (props) => {
    const id_vibot = 23643;
    const [productividad, setProductividad] = useState(0)
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


    const [hacumuladas, setHacumuladas] = useState(0)
    const [tActivo, setTActivo] = useState(0)
    const [tInactivo, setTInactivo] = useState(0)
    const [kgacumulados, setKgacumulados] = useState(0)
    const [estado, setEstado] = useState(0)
    const [kgsolicitados, setKgsolicitados] = useState(0)
    const [hsolicitadas, setHsolicitadas] = useState(0)
    const [capacidad, setCapacidad] = useState(0)

    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear: function (num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft + splitRight;
        },
        new: function (num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    }

    const loadResumen = () => {
        let link
        localStorage.getItem("id_orden") === localStorage.getItem("id_ordenA")
            ? link = global.api.dashboard.getresumenmaquina
            : link = global.api.dashboard.getresumenhistorico
        fetch(link, {
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
                setHsolicitadas(result[0].cajas)
                setKgsolicitados(result[0].kg_solicitados)
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

    const loadTimeLine = () => {

        fetch(global.api.dashboard.gettimelinemaquina, {
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
                if (r.length > 0) {
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
                }
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
        loadResumen()
        loadTimeLine()
    }, [props.id_orden]);

    useEffect(() => {
        setTimeout(() => {
            loadTimeLine()
            loadResumen()
        }, 2000);
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
                    <Col align="left" xl="2" md="6">
                        <div className="text-uppercase font-weight-bold title1orange my-1">Empaque</div>
                    </Col>
                    <Col xl="3" md="6">
                        <Row align="right">
                            <div className="font2 ml-3 my-4">Estado</div>
                            <div className={estado == 1 ? "font2gray ml-1 my-4" : "font2Blue ml-1 my-4"}>
                                {localStorage.getItem("id_orden") !== localStorage.getItem("id_ordenA") ? "Terminada" :
                                    estado == 1 ? " Detenida" : " Produciendo"}
                            </div>
                        </Row>
                    </Col>


                    <Col xl="4" md="6">
                        <Row align="right">
                            <div className="font2 ml-3 my-4">Tiempo de Actividad</div>
                            <div className="font2Blue ml-1 my-4">{formatNumber.new(_.round(tActivo / 60, 2))} hrs</div>
                        </Row>

                    </Col>

                    <Col xl="3" md="6" >
                        <Row align="right">
                            <div className="font2 my-4">Productividad</div>
                            <div className="font2Blue ml-1 my-4">{formatNumber.new(_.round(productividad)) + " caj/min"}</div>
                        </Row>

                    </Col>

                </Row>
            </div >
            <div className="blackBorderBot">
                <Row>
                    <Col md="5" className="blackBorderRight">
                        <div class="noSpace ">
                            <div className="blackBorderBot">

                                <Row className="mt-4">


                                    <div align="center" className="ml-auto indi">{formatNumber.new(_.round(hacumuladas))}</div>
                                    <div align="center" className="font2 mt-3 ml-2 mr-auto">de {formatNumber.new(_.round(hsolicitadas))} Cajas </div>

                                </Row>
                                <Row className="mt-1 mb-4">
                                    <div align="left" className="ml-auto indi">{formatNumber.new(_.round(kgacumulados))}</div>
                                    <div align="center" className="font2 mt-3 ml-2 mr-auto"> de {formatNumber.new(_.round(kgsolicitados))} Kgs</div>

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
                                                    ((kgacumulados / ((capacidad / 3) * ((tActivo) / 60)))) > 0 ?
                                                        (kgacumulados / ((capacidad / 3) * ((tActivo) / 60))) * 100 : //(totalKG/capacidad*tiempo que se demoro)
                                                        0
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
                                        data={dataTorta}
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
            </div>
            <Row>

                <Col xs="12">
                <div id="chart" className={/*seriesTimeLine.data !== undefined ? "m-3" : "d-none"*/ "m-3"}>

                        <ReactApexChart options={optionsTimeLine} series={seriesTimeLine} type="rangeBar" height={150} />

                    </div>
                    
                </Col>

            </Row>
            {
                //<div className="bot-description">Receta actual: {" " + producto}</div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(Empaque);