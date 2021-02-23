import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import icono1 from "./images/icono1.png";
import icono2 from "./images/icono2.png";
import icono3 from "./images/icono3.png";
//import TimeLine from "./TimeLine";
import _ from "lodash";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Circle from "react-circle";
import moment from 'moment';

const Produciendo = (props) => {
    const [calidad, setCalidad] = useState(0)
    const [eficiencia, setEficiencia] = useState(0)
    const [disponibilidad, setDisponibilidad] = useState(0)
    const [nOrden, setnOrden] = useState(props.ordenSelected.id_sub_orden)

    const [perdidaEnvasado, setPerdidaEnvasado] = useState(0)
    const [perdidaEmpaquetadora, setPerdidaEmpaquetadora] = useState(0)
    const [perdidaTotalKg, setPerdidaTotalKg] = useState(0)
    const [perdidaEnvasadoKg, setPerdidaEnvasadoKg] = useState(0)
    const [perdidaEmpaquetadoraKg, setPerdidaEmpaquetadoraKg] = useState(0)
    const [perdidaTotal, setPerdidaTotal] = useState(0)
    const [TiempoActivo, setTiempoActivo] = useState(0)
    const [TiempoInactivo, setTiempoInactivo] = useState(0)
    const [dataTorta, setDataTorta] = useState({
        legend: [{display: false, position: "top", fullWidth: true, reverse: true}],
        labels: ["Desconectado", "Paro sin Justificar", "Paro Justificado", "Producción",],
        datasets: [{
            data: [],
            backgroundColor: ["#d9d9d9", "#F7431E ", "#FFB000", "#2264A7"],
            hoverBackgroundColor: ["#d9d9d9", "#F7431E  ", "#FFB000", "#2264A7 "],
        }],
    });

    const formatHour = (min) => {
        let horas = min / 60;
        horas = Math.trunc(horas)
        let minutos = min - (60 * horas)
        return horas === 0 ? minutos + " Min" : horas + " Hrs " + minutos + " Min"
    }

    useEffect(() => {
        setnOrden(props.ordenSelected.id_sub_orden)
        setTiempoActivo(props.ordenSelected.tiempo_activo)
        setTiempoInactivo(props.ordenSelected.tiempo_inactivo)
        
        setPerdidaEnvasado((props.ordenSelected.kg_formados - props.ordenSelected.kg_envasados) / props.ordenSelected.kg_formados)
        setPerdidaEmpaquetadora((props.ordenSelected.kg_envasados - props.ordenSelected.real_kg) / props.ordenSelected.kg_envasados)
        setPerdidaTotal((props.ordenSelected.kg_formados - props.ordenSelected.real_kg) / props.ordenSelected.kg_formados)

        setPerdidaEnvasadoKg(props.ordenSelected.kg_formados - props.ordenSelected.kg_envasados)
        setPerdidaEmpaquetadoraKg(props.ordenSelected.kg_envasados - props.ordenSelected.real_kg)
        setPerdidaTotalKg(props.ordenSelected.kg_formados - props.ordenSelected.real_kg)

        setDataTorta(
            {
                datasets: [
                    {
                        data: [Math.round(0 / 60 * 100) / 100, Math.round(props.ordenSelected.tiempo_inactivo / 60 * 100) / 100, 
                                Math.round(0 / 60 * 100) / 100, Math.round(props.ordenSelected.tiempo_activo / 60 * 100) / 100]
                    }
                ],
            }
        )
    }, [props.ordenSelected]);

    /* Se crean las variables para cálculo de Disponibilidad, Eficiencia, Calidad y OEE */
    const [disponibilidadFormadora, setDisponibilidadFormadora] = useState(0);
    const [disponibilidadEnvasadoras, setDisponibilidadEnvasadoras] = useState(0);
    const [disponibilidadEmpaquetadora, setDisponibilidadEmpaquetadora] = useState(0);

    const [eficienciaFormadora, setEficienciaFormadora] = useState(0);
    const [eficienciaEnvasadoras, setEficienciaEnvasadoras] = useState(0);
    const [eficienciaEmpaquetadora, setEficienciaEmpaquetadora] = useState(0);

    useEffect(() => {
        var tActivoFormadora = 0, tActivoEnvasadoras = 0, tActivoEmpaquetadora = 0;
        var tInactivoFormadora = 0, tInactivoEnvasadoras = 0, tInactivoEmpaquetadora = 0;

        var reportesSel = props.reportesSelected.filter(rep => !rep.hora_inicio.includes('05:55'));
        for (var i=0; i<reportesSel.length; i++){
            const startDate = moment(reportesSel[i].hora_inicio);
            const timeEnd = moment(reportesSel[i].hora_termino);
            const diff = timeEnd.diff(startDate);
            const diffDuration = moment.duration(diff);

            if (reportesSel[i].id_tipo === 1){
                if (reportesSel[i].id_tipo_vibot === 2)
                    tInactivoFormadora += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_tipo_vibot === 4 && reportesSel[i].id_vibot != 34828)
                    tInactivoEnvasadoras += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_tipo_vibot === 5)
                    tInactivoEmpaquetadora += diffDuration.hours()*60 + diffDuration.minutes();
            }
            else if (reportesSel[i].id_tipo === 2)
                if (reportesSel[i].id_tipo_vibot === 2)
                    tActivoFormadora += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_tipo_vibot === 4)
                    tActivoEnvasadoras += diffDuration.hours()*60 + diffDuration.minutes();
                else if (reportesSel[i].id_tipo_vibot === 5)
                    tActivoEmpaquetadora += diffDuration.hours()*60 + diffDuration.minutes();
        }

        /* Se actualiza las métricas de la Formadora */
        setDisponibilidadFormadora(
            isNaN(tActivoFormadora/(tActivoFormadora+tInactivoFormadora)) ? 0 :
            tActivoFormadora/(tActivoFormadora+tInactivoFormadora) * 100
        );

        setEficienciaFormadora(
            isNaN(props.ordenSelected.kg_formados/(props.ordenSelected.kg_hora * ((tActivoFormadora+tInactivoFormadora)/60))) ? 0 :
            props.ordenSelected.kg_formados/(props.ordenSelected.kg_hora * ((tActivoFormadora+tInactivoFormadora)/60)) * 100
        );

        /* Se actualiza las métricas de las Envasadoras */
        setDisponibilidadEnvasadoras(
            isNaN(tActivoEnvasadoras/(tActivoEnvasadoras+tInactivoEnvasadoras)) ? 0 :
            tActivoEnvasadoras/(tActivoEnvasadoras+tInactivoEnvasadoras) * 100
        );

        setEficienciaEnvasadoras(
            isNaN(props.ordenSelected.kg_envasados/(props.ordenSelected.kg_hora * ((tActivoEnvasadoras+tInactivoEnvasadoras)/60/3))) ? 0 :
            props.ordenSelected.kg_envasados/(props.ordenSelected.kg_hora * ((tActivoEnvasadoras+tInactivoEnvasadoras)/60/3)) * 100
        );

        /* Se actualiza las métricas de la Empaquetadora */
        setDisponibilidadEmpaquetadora(
            isNaN(tActivoEmpaquetadora/(tActivoEmpaquetadora+tInactivoEmpaquetadora)) ? 0 :
            tActivoEmpaquetadora/(tActivoEmpaquetadora+tInactivoEmpaquetadora) * 100
        );

        setEficienciaEmpaquetadora(
            isNaN(props.ordenSelected.real_kg/(props.ordenSelected.kg_hora * ((tActivoEmpaquetadora+tInactivoEmpaquetadora)/60))) ? 0 :
            props.ordenSelected.real_kg/(props.ordenSelected.kg_hora * ((tActivoEmpaquetadora+tInactivoEmpaquetadora)/60)) * 100
        );
    }, [props.reportesSelected]);

    useEffect(() => {
        /* Se actualizan las métricas globales */
        console.log(disponibilidadFormadora + " - " + disponibilidadEnvasadoras + " - " + disponibilidadEmpaquetadora);
        setCalidad(props.ordenSelected.real_kg/props.ordenSelected.kg_formados * 100)
        setEficiencia((eficienciaFormadora+eficienciaEnvasadoras+eficienciaEmpaquetadora)/3);
        setDisponibilidad((disponibilidadFormadora+disponibilidadEnvasadoras+disponibilidadEmpaquetadora)/3)
    }, [eficienciaEmpaquetadora]);

    return (
        <div>
            <div className="title2Orange">
                <Row className='sticky-row'>
                    <br />
                    <Col md="2">
                        <div align="left" className="text-uppercase font-weight-bold my-1 ml-4">{
                            props.ordenSelected.id_estado === 3 ? "Terminada"
                            : props.ordenSelected.id_estado === 2 ? "En espera"
                            : "Produciendo"
                        }</div>
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
                            <div align="left" className="font3 my-1">{props.ordenSelected.sku}</div>
                        </Row>
                    </Col>
                    <Col md="3">
                        <Row>
                            <div align="left" className="font2 my-1">Producto:</div>
                            <div align="left" className="font3 my-1">{props.ordenSelected.producto}</div>
                        </Row>
                    </Col>
                    <Col md="2">
                        <Row>
                            <div align="left" className="font2 my-1">Productividad:</div>
                            <div align="left" className="font3 my-1">{props.formatNumber.new(_.round(props.ordenSelected.productividad, 2)) + " ham/min"}</div>
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
                                <div className="font2 my-1">Estado</div>
                            </Col>
                            <div className={props.ordenSelected.id_estado === 1 ? "font2White  my-1" : "font2White my-1"}>
                                {
                                    props.ordenSelected.id_estado === 3 ? "Terminada"
                                    : props.ordenSelected.id_estado == 2 ? "En espera"
                                    : "Produciendo"
                                }
                            </div>
                            <div className="font2 ml-3 my-1">Tiempo Total</div>
                            {parseInt(props.ordenSelected.tiempo_total/60) == 1 ?
                                <div align="right" className="font2White ml-1 mr-5 my-1">
                                    {parseInt(props.ordenSelected.tiempo_total/60)} hr,
                                    {" " + parseInt(props.ordenSelected.tiempo_total%60)} min
                                </div> :
                                <div align="right" className="font2White ml-1 mr-5 my-1">
                                    {parseInt(props.ordenSelected.tiempo_total/60)} hrs,
                                    {" " + parseInt(props.ordenSelected.tiempo_total%60)} min
                                </div> 
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
            
            <div className="divP10">
                <Row>
                    {/* Producción en cada máquina */}
                    <Col className="blueRow " md="3">
                        <div className="whiteBorder">
                            <Row className="mb-2">
                                <Col md="3">
                                    <div className=" ml-4 my-3  ">
                                        <img src={icono1} className="rounded float-left mb-2" alt="Balanza" />
                                    </div>
                                </Col>
                                <Col md="9">
                                    <div align="center" className="bigFont mt-4">{props.formatNumber.new(_.round(props.ordenSelected.kg_formados))}</div>
                                    <div align="center" className="littleFont">de {" " + props.formatNumber.new(_.round(props.ordenSelected.kg_solicitados)) + " "} Kgs</div>
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
                                    <div align="center" className="bigFont mt-4">{props.formatNumber.new(_.round(props.ordenSelected.hamb_envasadas))}</div>
                                    <div align="center" className="littleFont">de {" " + props.formatNumber.new(_.round(props.ordenSelected.hamb_solicitadas)) + " "} Packs</div>
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
                                    <div align="center" className="bigFont mt-4">{props.formatNumber.new(_.round(props.ordenSelected.cajas_acumuladas))}</div>
                                    <div align="center" className="littleFont">de {" " + props.formatNumber.new(_.round(props.ordenSelected.cajas)) + " "} Cajas</div>
                                </Col>

                            </Row>
                        </div>

                    </Col>
                    
                    {/* Gráficos de donas */}
                    <Col md="3" className="">
                        <Row className="ml-3 mt-4">
                            <Row>
                                <Col md="5">
                                    <div className="circle">
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
                                        <div align="center" className="mt-2">Disponibilidad</div>
                                    </div>
                                </Col>
                                <Col md="5">
                                    <div className="circle">
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
                                        <div align="center" className="mt-2">Eficiencia</div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col md="5">
                                    <div className="circle">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(calidad).toFixed(0)} // String: Update to change the progress and percentage.
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
                                        <div align="center" className="mt-2">Calidad</div>
                                    </div>
                                </Col>
                                <Col md="5">
                                    <div className="circle">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={((calidad/100*eficiencia/100*disponibilidad/100) * 100).toFixed(0)} // String: Update to change the progress and percentage.
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
                                        <div align="center" className="mt-2">OEE</div>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    
                    {/* Gráfico de torta */}
                    <Col md="3">
                        <div className="centralbodydetail" style={{ paddingBottom: '15px' }}>
                            <Doughnut
                                data={dataTorta}
                                width={12}
                                height={11}
                                align="left"
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }} /></div>
                        <Row className="ml-5 mt-1">
                            <Brightness1Icon style={{ color: "#2264A7", marginRight: '1% !important' }} />
                            Produciendo: {formatHour(TiempoActivo)}
                        </Row>
                        <Row className="ml-5">
                            <Brightness1Icon style={{ color: "#F7431E", marginRight: '1% !important' }} />
                            En Paro: {formatHour(TiempoInactivo)}
                        </Row>
                    </Col>
                    {/* Control de pérdida */}
                    <Col className="blueRow" md="3">
                        <div className="text-uppercase font-weight-bold my-3">Control de Pérdida</div>
                        <div className="">
                            <Row className="mt-2 ml-2">
                                <Col md="4" className="p-0">
                                    <div className="circle pl-3 mt-1 ">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                perdidaEnvasado<0 ? 0 :
                                                perdidaEnvasado>100 ? 99.9 :
                                                perdidaEnvasado*100
                                            ).toFixed(1)} // String: Update to change the progress and percentage.
                                            progressColor="#F7431E" // String: Color of "progress" portion of circle.
                                            bgColor="#6b778c" // String: Color of "empty" portion of circle.
                                            textColor="#ecedf0" // String: Color of percentage text color.
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
                                <Col md="6">
                                    <div align="left" className=" mt-2 ml-2 text-uppercase littleFont font-weight-bold">Envasado</div>
                                    <Row className="">
                                        <div align="left" className="ml-4 mt-1 bigFont">{/*perdidaEnvasadoKg<0 ? "---" : */props.formatNumber.new(_.round(perdidaEnvasadoKg))}</div>
                                        <div align="center" className="littleFont mt-4 ml-2 mr-auto">Kgs</div>
                                    </Row>

                                </Col>

                            </Row>
                        </div>
                        <div className="">
                            <Row className="mt-2 ml-2">
                                <Col md="4" className="p-0">
                                    <div className="circle pl-3 mt-1 ">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                perdidaEmpaquetadora<0 ? 0 :
                                                perdidaEmpaquetadora>100 ? 99.9 :
                                                perdidaEmpaquetadora*100
                                            ).toFixed(1)} // String: Update to change the progress and percentage.
                                            progressColor="#F7431E" // String: Color of "progress" portion of circle.
                                            bgColor="#6b778c" // String: Color of "empty" portion of circle.
                                            textColor="#ecedf0" // String: Color of percentage text color.
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
                                <Col md="6">
                                    <div align="left" className=" mt-2 ml-2 text-uppercase littleFont font-weight-bold">Empaque</div>
                                    <Row className="">
                                        <div align="left" className="ml-4 mt-1 bigFont">{/*perdidaEmpaquetadoraKg<0 ? "---" : */props.formatNumber.new(_.round(perdidaEmpaquetadoraKg))}</div>
                                        <div align="center" className="littleFont mt-4 ml-2 mr-auto">Kgs</div>
                                    </Row>

                                </Col>

                            </Row>
                        </div>
                        <div className="">
                            <Row className="mt-2 ml-2">
                                <Col md="4" className="noSpace">
                                    <div className="circle pl-3 mt-1 ">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="3s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                perdidaTotal<0 ? 0 :
                                                perdidaTotal>100 ? 99.9 :
                                                perdidaTotal*100
                                            ).toFixed(1)} // String: Update to change the progress and percentage.
                                            progressColor="#F7431E" // String: Color of "progress" portion of circle.
                                            bgColor="#6b778c" // String: Color of "empty" portion of circle.
                                            textColor="#ecedf0" // String: Color of percentage text color.
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
                                <Col md="6">
                                    <div align="left" className=" mt-2 ml-2 text-uppercase littleFont font-weight-bold">Total</div>
                                    <Row className="">
                                        <div align="left" className="ml-4 mt-1 bigFont">{/*perdidaTotalKg<0 ? "---" : */props.formatNumber.new(_.round(perdidaTotalKg))}</div>
                                        <div align="center" className="littleFont mt-4 ml-2 mr-auto">Kgs</div>
                                    </Row>

                                </Col>

                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className="blackBorderTop mx-2">
                <Col xs="12" className="my-3 mx-2">
                    {/*
                    <TimeLine />
                    */}
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Produciendo)
