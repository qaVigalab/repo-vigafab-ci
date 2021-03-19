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
        setnOrden(props.ordenSelected.id_sub_orden);
        setPerdidaEnvasadoKg((props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc) - (props.ordenSelected.kg_envasados - props.ordenSelected.reproceso_rayos_mezc));
        setPerdidaEmpaquetadoraKg((props.ordenSelected.kg_envasados - props.ordenSelected.reproceso_rayos_mezc) - (props.ordenSelected.real_kg + props.ordenSelected.cajas_fuera_de_linea*props.ordenSelected.kg_caja));
        setPerdidaTotalKg((props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc) - (props.ordenSelected.real_kg + props.ordenSelected.cajas_fuera_de_linea*props.ordenSelected.kg_caja));

        if (props.ordenSelected.id_estado !== 2){
            setTiempoActivo(props.ordenSelected.tiempo_activo);
            setTiempoInactivo(props.ordenSelected.tiempo_inactivo);
            
            setPerdidaEnvasado(((props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc) - (props.ordenSelected.kg_envasados - props.ordenSelected.reproceso_rayos_mezc)) / (props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc));
            setPerdidaEmpaquetadora(((props.ordenSelected.kg_envasados - props.ordenSelected.reproceso_rayos_mezc) - (props.ordenSelected.real_kg + props.ordenSelected.cajas_fuera_de_linea*props.ordenSelected.kg_caja)) / (props.ordenSelected.kg_envasados - props.ordenSelected.reproceso_rayos_mezc));
            setPerdidaTotal(((props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc) - (props.ordenSelected.real_kg + props.ordenSelected.cajas_fuera_de_linea*props.ordenSelected.kg_caja)) / (props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc));

            setDataTorta({
                datasets: [{
                    data: [Math.round(0 / 60 * 100) / 100, Math.round(props.ordenSelected.tiempo_inactivo / 60 * 100) / 100, 
                    Math.round(0 / 60 * 100) / 100, Math.round(props.ordenSelected.tiempo_activo / 60 * 100) / 100]
                }],
            });
        } else{
            setTiempoActivo(0);
            setTiempoInactivo(0);
            
            setPerdidaEnvasado(0);
            setPerdidaEmpaquetadora(0);
            setPerdidaTotal(0);

            setDataTorta({
                datasets: [{
                    data: [0, 0, 0]
                }],
            })
        }
    }, [props.ordenSelected]);

    useEffect(() => {
        /* Se actualizan las métricas globales */
        setEficiencia((props.eficienciaFormadora/*+props.eficienciaEnvasadoras*/+props.eficienciaEmpaquetadora)/2);
        setDisponibilidad((props.disponibilidadFormadora/*+props.disponibilidadEnvasadoras*/+props.disponibilidadEmpaquetadora)/2)

        if (isNaN((props.ordenSelected.real_kg + props.ordenSelected.cajas_fuera_de_linea*props.ordenSelected.kg_caja)/(props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc)))
            setCalidad(0);
        else
            setCalidad((props.ordenSelected.real_kg + props.ordenSelected.cajas_fuera_de_linea*props.ordenSelected.kg_caja)/(props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc) * 100)
    }, [props.disponibilidadFormadora, props.disponibilidadEnvasadoras, props.disponibilidadEmpaquetadora,
        props.eficienciaFormadora, props.eficienciaEnvasadoras, props.eficienciaEmpaquetadora]);

    return (
        <div>
            <div className="title2Orange">
                <Row className='sticky-row my-1'>
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
                            <div align="left" className="font2 my-1">SKU:</div>
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
                        <div className="text-uppercase font-weight-bold mb-3 mt-4">Control de producción</div>
                        <div className="whiteBorder"></div>

                        <div className="">
                            <Row className="my-2">
                                <Col md="1"></Col>
                                <Col md="3">
                                    <div className="ml-4 my-3  ">
                                        <img src={icono1} className="rounded float-left mb-2" alt="Balanza" />
                                    </div>
                                </Col>
                                <Col md="8">
                                    <div align="center" className="bigFont mt-3">{props.formatNumber.new(_.round(props.ordenSelected.kg_formados - props.ordenSelected.reproceso_env_mezc - props.ordenSelected.reproceso_rayos_mezc))}</div>
                                    <div align="center" className="littleFont">de {" " + props.formatNumber.new(_.round(props.ordenSelected.kg_solicitados)) + " "} Kgs</div>
                                </Col>

                            </Row>
                        </div>

                        <div className="">
                            <Row className="my-2" >
                                <Col md="1"></Col>
                                <Col md="3">
                                    <div className="ml-4 my-3 ">
                                        <img src={icono2} className="rounded float-left mb-2" alt="Empaque" />
                                    </div>
                                </Col>
                                <Col md="8">
                                    <div align="center" className="bigFont mt-3">{props.formatNumber.new(_.round(props.ordenSelected.hamb_envasadas - props.ordenSelected.reproceso_rayos_mezc*1000/props.ordenSelected.g_hamburguesa))}</div>
                                    <div align="center" className="littleFont">de {" " + props.formatNumber.new(_.round(props.ordenSelected.hamb_solicitadas)) + " "} Packs</div>
                                </Col>

                            </Row>
                        </div>

                        <div className="">
                            <Row className="my-2">
                                <Col md="1"></Col>
                                <Col md="3">
                                    <div className="ml-4 my-3 ">
                                        <img src={icono3} className="rounded float-left mb-3" alt="Caja" />
                                    </div>
                                </Col>
                                <Col md="8">
                                    <div align="center" className="bigFont mt-3">{props.formatNumber.new(_.round(props.ordenSelected.cajas_acumuladas + props.ordenSelected.cajas_fuera_de_linea))}</div>
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
                                            animationDuration="1s" // String: Length of animation
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
                                            animationDuration="1s" // String: Length of animation
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
                                            animationDuration="1s" // String: Length of animation
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
                                            animationDuration="1s" // String: Length of animation
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
                    <Col md="3" className="mb-3">
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
                            <div className="ml-2 mt-1">Produciendo: {formatHour(TiempoActivo)}</div>
                        </Row>
                        <Row className="ml-5">
                            <Brightness1Icon style={{ color: "#F7431E", marginRight: '1% !important' }} />
                            <div className="ml-2 mt-1">En Paro: {formatHour(TiempoInactivo)}</div>
                        </Row>
                    </Col>
                    {/* Control de pérdida */}
                    <Col className="blueRow" md="3">
                        <div className="text-uppercase font-weight-bold mb-3 mt-4">Control de Pérdida</div>
                        <div className="whiteBorder"></div>

                        <div className="my-3">
                            <Row className="mt-2 ml-2">
                                <Col md="4" className="p-0">
                                    <div className="circle pl-5 mt-1 ">
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
                                        <div align="left" className="ml-4 mt-1 bigFont">{props.formatNumber.new(_.round(perdidaEnvasadoKg))}</div>
                                        <div align="center" className="littleFont mt-4 ml-2 mr-auto">Kgs</div>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <div className="my-4">
                            <Row className="mt-2 ml-2">
                                <Col md="4" className="p-0">
                                    <div className="circle pl-5 mt-1 ">
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
                                        <div align="left" className="ml-4 mt-1 bigFont">{props.formatNumber.new(_.round(perdidaEmpaquetadoraKg))}</div>
                                        <div align="center" className="littleFont mt-4 ml-2 mr-auto">Kgs</div>
                                    </Row>

                                </Col>

                            </Row>
                        </div>

                        <div className="my-3">
                            <Row className="mt-2 ml-2">
                                <Col md="4" className="noSpace">
                                    <div className="circle pl-5 mt-1 ">
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
                                        <div align="left" className="ml-4 mt-1 bigFont">{props.formatNumber.new(_.round(perdidaTotalKg))}</div>
                                        <div align="center" className="littleFont mt-4 ml-2 mr-auto">Kgs</div>
                                    </Row>

                                </Col>

                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row className="blackBorderTop mx-2">
                <Col md="12" className="my-3 mx-2">
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
