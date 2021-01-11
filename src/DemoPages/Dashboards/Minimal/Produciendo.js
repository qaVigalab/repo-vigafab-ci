import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Doughnut } from "react-chartjs-2";
import { connect } from "react-redux";
import icono1 from "./images/icono1.png";
import icono2 from "./images/icono2.png";
import icono3 from "./images/icono3.png";
import TimeLine from "./TimeLine";
import _ from "lodash";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Circle from "react-circle";

const Produciendo = (props) => {
    const [calidad, setCalidad] = useState(0)
    const [eficiencia, setEficiencia] = useState(0)
    const [disponibilidad, setDisponibilidad] = useState(0)
    const [estado, setEstado] = useState(0)
    const [nOrden, setnOrden] = useState(0)
    const [sku, setSku] = useState("")
    const [producto, setProducto] = useState("")
    const [productividad, setProductividad] = useState(0)
    const [tiempo, setTiempo] = useState(0)
    const [kg_acumulado, setKg_acumulado] = useState(0)
    const [h_acumulado, setH_acumulado] = useState(0)
    const [cajas_acumuladas, setCajas_acumuladas] = useState(0)
    const [kg_solicitado, setKg_solicitado] = useState(0)
    const [h_solicitado, setH_solicitado] = useState(0)
    const [cajas_solicitadas, setcajas_solicitadas] = useState(0)
    const [perdidaEnvasado, setPerdidaEnvasado] = useState(0)
    const [perdidaEmpaquetadora, setPerdidaEmpaquetadora] = useState(0)
    const [perdidaTotalKg, setPerdidaTotalKg] = useState(0)
    const [perdidaEnvasadoKg, setPerdidaEnvasadoKg] = useState(0)
    const [perdidaEmpaquetadoraKg, setPerdidaEmpaquetadoraKg] = useState(0)
    const [perdidaTotal, setPerdidaTotal] = useState(0)
    const [TiempoActivo, setTiempoActivo] = useState(0)
    const [TiempoInactivo, setTiempoInactivo] = useState(0)
    const [TiempoJustificado, setTiempoJustificado] = useState(0)
    const [TiempoDesconectado, setTiempoDesconectado] = useState(0)
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
                "Paro Justificado",
                "Producción",
            ],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        "#d9d9d9",
                        "#F7431E  ",
                        "#FFB000",
                        "#2264A7",
                    ],
                    hoverBackgroundColor: [
                        "#d9d9d9",
                        "#F7431E  ",
                        "#FFB000",
                        "#2264A7 ",
                    ],
                },
            ],
        }
    )

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

    const formatHour = (min) => {
        let horas = min / 60;
        horas = Math.trunc(horas)
        let minutos = min - (60 * horas)
        return horas === 0 ? minutos + " Min" : horas + " Hrs " + minutos + " Min"
    }

    const loadResumen = () => {
        let link
        localStorage.getItem("id_orden") === localStorage.getItem("id_ordenA")
            ? link = global.api.dashboard.getresumenlinea
            : link = global.api.dashboard.getreportehistoricolinea
        fetch(link, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                id_orden: localStorage.getItem("id_orden")
            }),
        })
            .then(response => response.json())
            .then(result => {
                const real_kg = result[0].real_kg == 0 ? 1 : result[0].real_kg
                const tiempo = result[0].tiempo_actividad == 0 ? 1 : result[0].tiempo_actividad
                const h_acumu = result[0].hamburguesas_acumuladas == 0 ? 1 : result[0].hamburguesas_acumuladas
                const g_ham = result[0].g_hamburguesa == 0 ? 1 : result[0].g_hamburguesa
                const tinac = result[0].tiempo_inactivo == 0 ? 1 : result[0].tiempo_inactivo
                const kg_emp = result[0].cajas_acumuladas * result[0].kg_caja
                const kg_env = h_acumu * g_ham / 1000
                setEstado(result[0].estado)
                setnOrden(result[0].id_sub_orden)
                setSku(result[0].sku)
                setProducto(result[0].producto)
                setProductividad(result[0].productividad)
                setTiempo(result[0].tiempo)
                setKg_acumulado(result[0].real_kg)
                setH_acumulado(result[0].hamburguesas_acumuladas)
                setCajas_acumuladas(result[0].cajas_acumuladas)
                setKg_solicitado(result[0].kg_solicitados)
                setH_solicitado(result[0].hamburguesas_solicitadas)
                setcajas_solicitadas(result[0].cajas)
                setTiempoActivo(result[0].tiempo_actividad)
                setTiempoJustificado(result[0].tiempo_justificado)
                setTiempoInactivo(result[0].tiempo_inactivo)
                setTiempoDesconectado(result[0].tiempo_desconectado)
                setCalidad((result[0].cajas_acumuladas * result[0].kg_caja) / real_kg)
                setEficiencia(((result[0].cajas_acumuladas * result[0].kg_caja) / (result[0].kg_hora * tiempo / 60)))
                setDisponibilidad((result[0].tiempo_actividad / (tinac + result[0].tiempo_actividad)))
                console.log()

                setPerdidaEnvasado((real_kg - kg_env) / real_kg)
                setPerdidaEmpaquetadora((kg_env - kg_emp) / kg_env)
                setPerdidaTotal((real_kg - kg_emp) / real_kg)
                setPerdidaTotalKg(real_kg - kg_emp)
                setPerdidaEnvasadoKg(real_kg - kg_env)
                setPerdidaEmpaquetadoraKg(kg_env - kg_emp)
                if (localStorage.getItem("id_orden") !== localStorage.getItem("id_ordenA")) {
                    setDataTorta(
                        {

                            datasets: [
                                {
                                    data: [Math.round(0 / 60 * 100) / 100, Math.round(result[0].tiempo_inactivo / 60 * 100) / 100, Math.round(0 / 60 * 100) / 100, Math.round(result[0].tiempo_actividad / 60 * 100) / 100]
                                }
                            ],
                        }
                    )
                }
            }
            )


            .catch(err => {
                console.error(err);
            });
    }

    const loadTorta = () => {
        if (localStorage.getItem("id_orden") === localStorage.getItem("id_ordenA")) {
            fetch(global.api.dashboard.getparosgeneral, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json",
                    "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
                },
                body: JSON.stringify({
                    id_orden: localStorage.getItem("id_orden")
                }),
            })
                .then(response => response.json())
                .then(r => {
                    let data = [];
                    if (r[0].t_noJustificado == 0 && r[0].t_justificado == 0 && r[0].t_activo == 0) {
                        data = [1, 0, 0, 0]
                    } else {
                        data = [0, Math.round(r[0].t_noJustificado / 60 * 100) / 100, Math.round(r[0].t_justificado / 60 * 100) / 100, Math.round(r[0].t_activo / 60 * 100) / 100]
                    }

                    setDataTorta(
                        {
                            datasets: [
                                {
                                    data: [Math.round(r[0].tiempo_desconectado / 60 * 100) / 100, Math.round(r[0].tiempo_paro / 60 * 100) / 100, Math.round(r[0].tiempo_justificado / 60 * 100) / 100, Math.round(r[0].tiempo_produccion / 60 * 100) / 100]
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
    }

    useEffect(() => {
        loadResumen()
        loadTorta()
    }, [props.id_orden]);

    useEffect(() => {
        setTimeout(() => {
            loadResumen()
            loadTorta()
        }, 2000);

        const interval = setInterval(() => {
            loadResumen();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (

        <div>

            <div className="title2Orange">
                <Row className='sticky-row'>
                    <br />
                    <Col md="2">
                        <div align="left" className="text-uppercase font-weight-bold my-1 ml-4">{estado == 1 ? "Detenida" : "Produciendo"}</div>
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
                            <div align="left" className="font3 my-1">{sku}</div>
                        </Row>
                    </Col>
                    <Col md="3">
                        <Row>
                            <div align="left" className="font2 my-1">Producto:</div>
                            <div align="left" className="font3 my-1">{producto}</div>
                        </Row>
                    </Col>
                    <Col md="2">
                        <Row>
                            <div align="left" className="font2 my-1">Productividad:</div>
                            <div align="left" className="font3 my-1">{formatNumber.new(_.round(productividad)) + " ham/min"}</div>
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
                                <div className="font2  my-1">Estado</div>
                            </Col>
                            <div className={estado == 1 ? "font2White  my-1" : "font2White my-1"}>
                                {localStorage.getItem("id_orden") !== localStorage.getItem("id_ordenA") ? "Detenida"
                                    : estado == 1 ? " Detenida" : " Produciendo"}
                            </div>
                            <div className="font2 ml-3 my-1">Tiempo Total</div>
                            <div align="right" className="font2White ml-1 mr-5 my-1">{formatNumber.new(_.round(tiempo / 60, 2))} hrs</div>

                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="divP10">
                <Row>
                    <Col className="blueRow " md="3">

                        <div className="whiteBorder">
                            <Row className="mb-2">
                                <Col md="3">
                                    <div className=" ml-4 my-3  ">
                                        <img src={icono1} className="rounded float-left mb-2" alt="Balanza" />
                                    </div>
                                </Col>
                                <Col md="9">
                                    <div align="center" className="bigFont mt-4">{formatNumber.new(_.round(kg_acumulado, 2))}</div>
                                    <div align="center" className="littleFont">de {" " + formatNumber.new(_.round(kg_solicitado, 2)) + " "} Kg</div>
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
                                    <div align="center" className="bigFont mt-4">{formatNumber.new(_.round(h_acumulado))}</div>
                                    <div align="center" className="littleFont">de {" " + formatNumber.new(_.round(h_solicitado)) + " "} F. Pack</div>
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
                                    <div align="center" className="bigFont mt-4">{formatNumber.new(_.round(cajas_acumuladas))}</div>
                                    <div align="center" className="littleFont">de {" " + formatNumber.new(_.round(cajas_solicitadas)) + " "} cajas</div>
                                </Col>

                            </Row>
                        </div>

                    </Col>
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
                                            progress={(
                                                disponibilidad > 1 ? 100 : disponibilidad * 100
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
                                            progress={(
                                                eficiencia > 1 ? 100 : eficiencia * 100 //(totalKG/capacidad*tiempo que se demoro)
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
                                            progress={(
                                                calidad > 1 ? 100 : calidad * 100
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
                                            progress={(
                                                ((eficiencia > 1 ? 1 : eficiencia) * (disponibilidad > 1 ? 1 : disponibilidad) * (calidad > 1 ? 1 : calidad)) * 100
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
                                        <div align="center" className="mt-2">OEE</div>
                                    </div>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col md="3">
                        <div className="centralbodydetail" style={{ paddingBottom: '15px' }}>
                            <Doughnut
                                data={dataTorta}
                                width="12"
                                height="11"
                                align="left"
                                options={{
                                    legend: {
                                        display: false,
                                    },
                                    responsive: true,
                                    maintainAspectRatio: true,
                                }} /></div>
                        <Row className="ml-5 mt-1">
                            <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TiempoActivo)}
                        </Row>
                        {/*                         <Row className="ml-5">
                            <Brightness1Icon style={{ color: "#F7431E" }} />
                  Justificado: {formatHour(TiempoJustificado)}
                        </Row> */}
                        <Row className="ml-5">
                            <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiempoInactivo)}
                        </Row>
                    </Col>
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
                                                perdidaEnvasado * 100
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
                                        <div align="left" className="ml-4 mt-1 bigFont">{formatNumber.new(_.round(perdidaEnvasadoKg))}</div>
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
                                                perdidaEmpaquetadora * 100
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
                                        <div align="left" className="ml-4 mt-1 bigFont">{formatNumber.new(_.round(perdidaEmpaquetadoraKg))}</div>
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
                                                perdidaTotal * 100
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
                                        <div align="left" className="ml-4 mt-1 bigFont">{formatNumber.new(_.round(perdidaTotalKg))}</div>
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
                    <TimeLine />
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => ({
    id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(Produciendo)
