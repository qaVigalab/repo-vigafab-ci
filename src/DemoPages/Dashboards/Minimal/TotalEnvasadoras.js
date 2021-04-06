import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import _ from "lodash";
import moment from 'moment';

const TotalEnvasadoras = (props) => {
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
    );

    const [optionTorta, setOptionTorta] = useState(
        {
            legend: {
                display: false,
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                   display: false,
                   color: 'white'
                }
            }
        }
    );

    const [cantMaquinas, setCantMaquinas] = useState(0);
    const [disponibilidad, setDisponibilidad] = useState(0);
    const [eficiencia, setEficiencia] = useState(0);
    const [tActivo, setTActivo] = useState(0);

    useEffect(() => {
        if (props.reportesSelected.length > 0){
            var t_activo = 0, t_inactivo = 0;
            for (var j=0; j<props.maquinas.length; j++){
                var reportesSel = props.reportesSelected.filter(rep => rep.id_vibot === props.maquinas[j].id && rep.id_tipo !== 4 && !rep.hora_inicio.includes("04:55:"));
                
                if (props.maquinas[j].recambio !== 1){
                    for (var i=0; i<reportesSel.length; i++){
                        /* Se calculan los tiempos de actividad y paro */
                        if (reportesSel[i].id_tipo === 1 && props.maquinas[j].recambio === 0)
                            t_inactivo += reportesSel[i].minutos;
                        else if (reportesSel[i].id_tipo === 2)
                            t_activo += reportesSel[i].minutos;
                    }
                }
            }
            
            setDisponibilidad(
                isNaN(t_activo/(t_activo+t_inactivo)) ? 0 : 
                t_activo/(t_activo+t_inactivo) * 100
            );

            setEficiencia(
                isNaN(props.ordenSelected.kg_envasados/(props.ordenSelected.kg_hora * (t_activo+t_inactivo)/60/3)) ? 0 :
                props.ordenSelected.kg_envasados/(props.ordenSelected.kg_hora * (t_activo+t_inactivo)/60/3) * 100
            );

            setTActivo(t_activo/3);
    
            var sumMaquinas = 0;
            for (var i=0; i<props.maquinas.length; i++){
                var reportesMaq = props.reportesSelected.filter(rep => rep.id_vibot === props.maquinas[i].id);
                if (reportesMaq[reportesMaq.length-1] != undefined && reportesMaq[reportesMaq.length-1].id_tipo === 2)
                    sumMaquinas += 1
            }
            setCantMaquinas(sumMaquinas);
            setDataTorta(
                {
                datasets: [
                    {
                    data: [0, parseInt(t_inactivo/3), parseInt(t_activo/3)]
                    }
                ],
                }
            );
        } else{
            setDisponibilidad(0);
            setEficiencia(0);
            setTActivo(0);
            setCantMaquinas(0);
            setDataTorta(
                {
                datasets: [
                    {
                    data: [0, 0, 0]
                    }
                ],
                }
            );
        }
    }, [props.reportesSelected]);

    useEffect(() => {
        props.updateKPIs(4, disponibilidad, eficiencia);
    }, [dataTorta]);

    return (
        <div>
            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="4">
                        <div className="text-uppercase font-weight-bold title1orange my-1">ENVASADORAS</div>
                    </Col>
                    <Col md="3">
                        <Row align="right">
                            <div className="font2 my-4">Estado:</div>
                            <div className={cantMaquinas == 0 || props.ordenSelected.id_estado != 1  ? "font2gray ml-1 my-4" : "font2Blue ml-1 my-4"}>
                                {props.ordenSelected.id_estado === 3 ? "Detenidas"
                                : props.ordenSelected.id_estado === 2 ? "En espera"
                                : cantMaquinas  + "/4 Produciendo"}
                            </div>
                        </Row>
                    </Col>

                    <Col md="5">
                        <Row align="right">
                            <div className="font2 ml-4 my-4">Tiempo de Actividad: </div>
                            {parseInt(tActivo/60) == 1 ?
                                <div className={props.ordenSelected.id_estado !== 1 ? "font2gray ml-1 my-4" : "font2Blue ml-1 my-4"}>
                                    {parseInt(tActivo/60)} hr,
                                    {" " + parseInt(tActivo%60)} min
                                </div> :
                                <div className={props.ordenSelected.id_estado !== 1 ? "font2gray ml-1 my-4" : "font2Blue ml-1 my-4"}>
                                    {parseInt(tActivo/60)} hrs,
                                    {" " + parseInt((tActivo)%60)} min
                                </div> 
                            }
                        </Row>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col md="5" className="blackBorderRight">
                    <div className="noSpace ">
                        <div className="blackBorderBot">
                            <Row className="mt-4">
                                <div align="center" className="ml-auto indi">{props.formatNumber.new(_.round(props.ordenSelected.hamb_envasadas - props.ordenSelected.reproceso_rayos_mezc*1000/props.ordenSelected.g_hamburguesa))}</div>
                                <div align="center" className="font2 mt-3 ml-2 mr-auto">de {props.formatNumber.new(_.round(props.ordenSelected.hamb_solicitadas))} Packs</div>
                            </Row>

                            <Row className="mt-1 mb-4">
                                <div align="left" className="ml-auto indi">{props.formatNumber.new(_.round(props.ordenSelected.kg_envasados - props.ordenSelected.reproceso_rayos_mezc))}</div>
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
                                    width={12}
                                    height={12}
                                    align="center"
                                    options={optionTorta}
                                /></div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="blackBorderTop mx-2">
                <Col xs="12" className="my-3 mx-2"></Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(TotalEnvasadoras);
