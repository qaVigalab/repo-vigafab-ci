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
    /* Configuración inicial - Torta */
    const [dataTorta, setDataTorta] = useState({
        labels: ["Desconectado", "En Paro", "En Producción"],
        legend: [{ display: false, position: "top", fullWidth: true, reverse: true }],
        datasets: [{
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
        }],
    });

    /* Configuración inicial - Gráfico de Tª */
    var temperatura = [], fecha = [];
    const [series3, setSeries3] = useState([{ name: 'Temperatura', data: temperatura }]);
    const [options3, setOptions3] = useState({
        chart: { height: 400, type: 'area' },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2, colors: "#02c39a" },
        xaxis: { type: 'datetime', categories: fecha, labels: {datetimeUTC: true} },
        tooltip: {
            x: {
                format: 'dd MMM yyyy HH:mm:ss'
            },
            marker: {
                fillColors: ["#ff6c1c"]
            }
        },
        fill: {
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
        markers: { size: 0, colors: ["#ff6c1c"], strokeColor: "white", strokeWidth: 1 },
        title: {
            text: "T° de Salida",
            align: 'left', margin: 10, offsetX: 0, offsetY: 0, floating: false,
            style: {
                fontSize: '16px',
                fontFamily: "Poppins SemiBold",
                color: '#606060'
            },
        }
    });

    /* Se carga el gráfico de temperaturas asociado a la orden en curso */
    const loadGraphTemp = () => {
        fetch(global.api.dashboard.gettempformadora, {
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
            result.map(r => {
                fecha.push(r.fecha);
                temperatura.push(r.temperatura);
            })
        })
        .then(() => {
            setSeries3([{
                data: temperatura
            }]);
            setOptions3({ xaxis: { categories: fecha } });
        })
        .catch(err => {
            console.error(err);
        });
    };

    /* Configuración inicial - Timeline */
    const [seriesTimeLine, setSeriesTimeLine] = useState([])
    const [optionsTimeLine] = useState({
        dataLabels: { enabled: false },
        markers: { size: 0 },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: '',
                },
            },
        },
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
            labels: { }
        },
        grid: {
            row: {
                colors: ['#f3f4f5', '#fff'],
                opacity: 1
            }
        }
    });

    /* Se carga el gráfico de timeline asociado a la orden en curso */
    const loadTimeLine = () => {
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
            if (reportes[i].id_tipo === 1) {
                x_ = "Paro";
                color_ = '#F7431E';
            } else if (reportes[i].id_tipo === 2) {
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
        };

        setSeriesTimeLine([{
            data: objetos
        }]);
    };

    /* Configuración inicial - Gráfica de eficiencia */
    const [seriesEficiencia, setSeriesEficiencia] = useState([]);
    const [optionsEficiencia, setOptionsEficiencia] = useState({});

    /* Se carga el gráfico de temperaturas asociado a la orden en curso */
    const loadEfficiency = (id_vb) => {
        var fecha_hora = [], kg_prod = [], kg_esp = [], efi = [], kg_sum = [], kg_est = [];
        fetch(global.api.dashboard.getEficienciaPorMinuto, {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_sub_orden: props.ordenSelected.id_sub_orden,
                id_vibot: id_vb
            }),
        })
        .then(response => response.json())
        .then(result => {
            if (result.length > 0){
                result.map(r => {
                    fecha_hora.push(r.fecha_hora);
                    kg_prod.push(r.kg_prod);
                    kg_esp.push(r.kg_esp);
                    efi.push(r.eficiencia);
                    kg_sum.push(r.kg_sum);
                    kg_est.push(r.kg_est);
                });
            }
        })
        .catch(err => {
            console.error(err);
        });
    };

    /* SE EJECUTA LA TAREA PRINCIPAL DEL WIDGET */
    const [reportes, setReportes] = useState(props.reportesSelected);
    const [tActivo, setTActivo] = useState(0);
    const [disponibilidad, setDisponibilidad] = useState(0);
    const [eficiencia, setEficiencia] = useState(0);
    useEffect(() => {
        if (props.reportesSelected.length > 0){
            var reportesSel = props.reportesSelected.filter(rep => rep.id_tipo !== 4 && !rep.hora_inicio.includes("05:55:"));

            var tiempo_activo = 0, tiempo_inactivo = 0;
            for (var i=0; i<reportesSel.length; i++){
                if (reportesSel[i].id_tipo === 1)
                    tiempo_inactivo += reportesSel[i].minutos;
                else if (reportesSel[i].id_tipo === 2)
                    tiempo_activo += reportesSel[i].minutos;
            }

            setDisponibilidad(
                isNaN(tiempo_activo/(tiempo_activo+tiempo_inactivo)) ? 0 :
                tiempo_activo/(tiempo_activo+tiempo_inactivo) * 100
            );

            setEficiencia(
                isNaN(props.ordenSelected.kg_formados/(props.ordenSelected.kg_hora * ((tiempo_activo+tiempo_inactivo)/60))) ? 0 :
                props.ordenSelected.kg_formados/(props.ordenSelected.kg_hora * ((tiempo_activo+tiempo_inactivo)/60)) * 100
            );

            setTActivo(tiempo_activo);
            setDataTorta(
                {
                datasets: [
                    {
                    data: [0, parseInt(tiempo_inactivo), parseInt(tiempo_activo)]
                    }
                ],
                }
            );
            setReportes(props.reportesSelected);
        } else{
            setDisponibilidad(0);
            setEficiencia(0);
            setTActivo(0);
            setDataTorta(
                {
                datasets: [
                    {
                    data: [0, 0, 0]
                    }
                ],
                }
            );
            setReportes([]);
        }
    }, [props.reportesSelected]);

    useEffect(() => {
        props.updateKPIs(2, disponibilidad, eficiencia);
        if (reportes.length > 0){
            loadGraphTemp();
            loadTimeLine();
            loadEfficiency(reportes[0].id_vibot);
        }
        else{
            setSeriesTimeLine([{
                data: [{
                    x: 'Prod',
                    y: [new Date().getTime(),
                    new Date().getTime()],
                    fillColor: '#2264A7'
                }, {
                    x: 'Paro',
                    y: [new Date().getTime(),
                    new Date().getTime()],
                    fillColor: '#F7431E'
                }, {
                    x: 'Cambio',
                    y: [new Date().getTime(),
                    new Date().getTime()],
                    fillColor: '#02c39a'
                }]
            }]);
        }
    }, [reportes]);

    useEffect(() => {}, seriesEficiencia);

    return (
        <div>
            {/* Barra superior Formadora */}
            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="text-uppercase font-weight-bold title1orange my-1">Formadora</div>
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
                            
                            <div className="font2 ml-4 my-4">Tiempo de Actividad: </div>
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

                            <div className="font2 ml-4 my-4">Productividad: </div>
                            <div className={props.ordenSelected.id_estado !== 1 ? "font2gray ml-2 mr-5 my-4" : "font2Blue ml-2 mr-5 my-4"}>
                                {tActivo === 0 ? 0 : props.formatNumber.new(_.round(props.ordenSelected.hamb_formadas/tActivo))} ham/min
                            </div>
                        </Row>
                    </Col>
                </Row>
            </div >

            {/* Formadora */}
            <Row>
                {/* Resumen Formadora */}
                <Col md="2" className="blackBorderRight">
                    <div className="noSpace">
                        <div className="blackBorderBot">
                            <Row className="my-4">
                                <div align="center" className="ml-auto indi">{props.formatNumber.new(_.round(props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc))}</div>
                                <div align="center" className="font2 mt-3 ml-2 mr-auto">Kg</div>
                            </Row>
                        </div>

                        <div className="blackBorderBot">
                            <Row className="" >
                                <Col md="12" style={{ textAlignLast: 'center' }}>
                                    <div align="center" className="indi mt-3">{props.formatNumber.new(_.round(props.ordenSelected.hamb_formadas - (props.ordenSelected.reproceso_env_mezc + props.ordenSelected.reproceso_rayos_mezc)*1000/props.ordenSelected.g_hamburguesa))}</div>
                                    <div align="left" className="font2 mb-3">Hamburguesas formadas</div>
                                </Col>
                            </Row>
                        </div>
                        <div className="my-3">
                            <Row >
                                <Col md="6">
                                    <div className="circle space5px ml-5">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(disponibilidad).toFixed(0)} // String: Update to change the progress and percentage.
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
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(eficiencia).toFixed(0)} // String: Update to change the progress and percentage.
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
                
                {/* Gráfico de torta y tendencia de Tª - Formadora */}
                <Col md="9">
                    <Row>
                        <Col md="4">
                            <div className="centralbodydetail" style={{ paddingBottom: '10px' }}>
                                <Doughnut
                                    data={dataTorta}
                                    width={12}
                                    height={12}
                                    align="left"
                                    options={{ 
                                        legend: { display: false },
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }}
                                />
                            </div>
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
            
            {/* Línea de tiempo operativa */}
            <Row>
                <Col xs="12">
                    <div id="chartTimeLine" className={/*seriesTimeLine.data !== undefined ? "m-3" : "d-none"*/ "m-3"}>
                        <ReactApexChart options={optionsTimeLine} series={seriesTimeLine} type="rangeBar" height={180} />
                    </div>
                </Col>
            </Row>
            
            {/* Línea de eficiencia operativa */}
            <Row>
                <Col xs="12">
                    <div id="chartEfficiency" className={/*seriesTimeLine.data !== undefined ? "m-3" : "d-none"*/ "m-3"}>
                        <ReactApexChart options={optionsEficiencia} series={seriesEficiencia} type="line" height={250} />
                        {/*<ReactApexChart options={optionsEficiencia} series={seriesEficiencia} type="line" height={250} />*/}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Formadora2);