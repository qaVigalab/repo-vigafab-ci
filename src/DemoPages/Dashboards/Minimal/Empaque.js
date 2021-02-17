import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import Circle from "react-circle";
import _ from "lodash";
import moment from 'moment';

const Empaque = (props) => {
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

    const [reportes, setReportes] = useState(props.reportesSelected.filter(rep => rep.hora_inicio.includes('05:55')));
    useEffect(() => {
        var reportesSel = props.reportesSelected.filter(rep => !rep.hora_inicio.includes('05:55'));
        var tiempo_activo = 0, tiempo_inactivo = 0;
        for (var i=0; i<reportesSel.length; i++){
            /* Se calculan los tiempos de actividad y paro */
            const startDate = moment(reportesSel[i].hora_inicio);
            const timeEnd = moment(reportesSel[i].hora_termino);
            const diff = timeEnd.diff(startDate);
            const diffDuration = moment.duration(diff);

            if (reportesSel[i].id_tipo === 1)
                tiempo_inactivo += diffDuration.hours()*60 + diffDuration.minutes();
            else if (reportesSel[i].id_tipo === 2)
                tiempo_activo += diffDuration.hours()*60 + diffDuration.minutes();
        }

        setTInactivo(tiempo_inactivo);
        setTActivo(tiempo_activo);
        setDataTorta(
            {
            datasets: [
                {
                data: [0, tiempo_inactivo, tiempo_activo]
                }
            ],
            }
        );
        setReportes(reportesSel);
    }, [props.reportesSelected]);

    useEffect(() => {
        loadTimeLine();
    }, [reportes]);

    const loadTimeLine = () => {
        if (reportes.length > 0) {
            var objetos = [{
                x: 'Prod',
                y: [new Date(reportes[0].hora_inicio).getTime(),
                new Date(reportes[0].hora_inicio).getTime()],
                fillColor: '#2264A7'
            }, {
                x: 'Paro',
                y: [new Date(reportes[0].hora_inicio).getTime(),
                new Date(reportes[0].hora_inicio).getTime()],
                fillColor: '#F7431E'
            }, {
                x: 'Cambio',
                y: [new Date(reportes[0].hora_inicio).getTime(),
                new Date(reportes[0].hora_inicio).getTime()],
                fillColor: '#02c39a'
            }];
            
            for (let i = 0; i < reportes.length; i++) {
                var x_ = "", color_ = null;
                if (reportes[i].id_tipo == 1) {
                    x_ = "Paro";
                    color_ = '#F7431E';
                } else if (reportes[i].id_tipo == 2) {
                    x_ = "Prod";
                    color_ = '#2264A7';
                } else {
                    x_ = "Cambio";
                    color_ = '#02c39a';
                }

                var objeto = {
                    x: x_,
                    y: [
                        new Date(reportes[i].hora_inicio).getTime(),
                        new Date(reportes[i].hora_termino).getTime()
                    ],
                    fillColor: color_
                }
                objetos.push(objeto)
            }
            setSeriesTimeLine([{
                data: objetos
            }]);
        }
    }

    return (
        <div>
            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" xl="3" md="3">
                        <div className="text-uppercase ml-2 font-weight-bold title1orange my-1">Empaque</div>
                    </Col>
                    <Col xl="3" md="3">
                        <Row align="right">
                            <div className="my-4">Estado: </div>
                            <div className={props.ordenSelected.id_estado != 1 ? "font2gray ml-1 my-4" : "font2Blue ml-1 my-4"}>{
                                props.ordenSelected.id_estado === 3 ? "Terminada"
                                : props.ordenSelected.id_estado === 2 ? "En espera"
                                : "Produciendo"
                            }</div>
                        </Row>
                    </Col>

                    <Col xl="3" md="3">
                        <Row align="right">
                            <div className="ml-1 my-4">Actividad: </div>
                            {parseInt(tActivo/60) == 1 ?
                                <div className="font2Blue ml-1 my-4">
                                    {parseInt(tActivo/60)} hr,
                                    {" " + parseInt(tActivo%60)} min
                                </div> :
                                <div className="font2Blue ml-1 my-4">
                                    {parseInt(tActivo/60)} hrs,
                                    {" " + parseInt(tActivo%60)} min
                                </div> 
                            }
                        </Row>
                    </Col>

                    <Col xl="3" md="3">
                        <Row align="right">
                            <div className="my-4">Productividad</div>
                            <div className="font2Blue ml-1 my-4">{props.formatNumber.new(_.round(props.ordenSelected.cajas_acumuladas/tActivo)) + " caj/min"}</div>
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
                                    <div align="center" className="ml-auto indi">{props.formatNumber.new(_.round(props.ordenSelected.cajas_acumuladas))}</div>
                                    <div align="center" className="font2 mt-3 ml-2 mr-auto">de {props.formatNumber.new(_.round(props.ordenSelected.cajas))} Cajas </div>
                                </Row>
                                <Row className="mt-1 mb-4">
                                    <div align="left" className="ml-auto indi">{props.formatNumber.new(_.round(props.ordenSelected.real_kg))}</div>
                                    <div align="center" className="font2 mt-3 ml-2 mr-auto"> de {props.formatNumber.new(_.round(props.ordenSelected.kg_solicitados))} Kgs</div>
                                </Row>
                            </div>

                            <div className="my-3">
                                <Row >
                                    <Col md="6 my-auto">
                                        <div className="circle space5px">
                                            <Circle
                                                animate={true} // Boolean: Animated/Static progress
                                                animationDuration="3s" // String: Length of animation
                                                responsive={true} // Boolean: Make SVG adapt to parent size
                                                size="100" // String: Defines the size of the circle.
                                                lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                                progress={(
                                                    (tActivo/(tInactivo+tActivo)) * 100 === Infinity ? 0 :
                                                    (tActivo/(tInactivo+tActivo)) * 100 > 0 ?
                                                    (tActivo/(tInactivo+tActivo)) * 100
                                                    : 0
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
                                                animationDuration="3s" // String: Length of animation
                                                responsive={true} // Boolean: Make SVG adapt to parent size
                                                size="100" // String: Defines the size of the circle.
                                                lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                                progress={(
                                                    props.ordenSelected.real_kg/(props.ordenSelected.kg_hora * ((tActivo+tInactivo)/60)) * 100 === Infinity ? 0 :
                                                    (props.ordenSelected.real_kg/(props.ordenSelected.kg_hora * ((tActivo+tInactivo)/60))) > 0 ?
                                                    props.ordenSelected.real_kg/(props.ordenSelected.kg_hora * ((tActivo+tInactivo)/60)) * 100  //(totalKG/capacidad*tiempo que se demoro)
                                                    : 0
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

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Empaque);