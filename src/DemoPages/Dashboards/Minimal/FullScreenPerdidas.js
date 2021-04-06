import React, { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { 
    Card, CardBody, Col, Container, InputGroup, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Progress
} from "reactstrap";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';
import formadora from './images/formadora.png';
import envasadoras from './images/envasadoras.png';
import empaquetadora from './images/empaquetadora.png';

import _ from "lodash";
import moment from 'moment';

const FullScreenPerdidas = (props) => {
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

    const [totalEnvasado, setTotalEnvasado] = useState(0.0);
    const [totalRayosX, setTotalRayosX] = useState(0.0);
    const [dataRechazos, setDataRechazos] = useState({});
    const [chartsMaxY, setChartsMaxY] = useState(0);
    const [query, setQuery] = useState([]);
    const [kgPerdida, setKgPerdida] = useState(0);
    const [kgFormados, setKgFormados] = useState(0);
    const [kgEmpacados, setKgEmpacados] = useState(0);

    const getRechazos = () => {
        fetch(global.api.dashboard.getRechazosDia, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
            },
            body: JSON.stringify({
                fecha: props.date
            }),
        })
        .then(response => response.json())
        .then(result => {
            var labels = [], dataEnvasado = [], dataRayosX = [];
            var rechazoEnv = 0, rechazoRayosX = 0, rechazoGlobal = 0, maxLimit = 0, perdidas = 0, kgFormados = 0, kgEmpacados = 0;

            result.map(r => {
                labels.push(r.producto.split("@"));
                if (r.rechazo_global >= r.rechazo_envasado && r.rechazo_global >= r.rechazo_rayos_x){
                    dataEnvasado.push(r.rechazo_envasado);
                    dataRayosX.push(r.rechazo_rayos_x);
                    
                    rechazoEnv += r.rechazo_envasado;
                    rechazoRayosX += r.rechazo_rayos_x;
                } else{
                    dataEnvasado.push(0);
                    dataRayosX.push(0);
                }

                if (r.rechazo_global > maxLimit)
                    maxLimit = r.rechazo_global;

                perdidas += r.rechazo_global;
                kgFormados += r.kg_formados;
                kgEmpacados += r.kg_empacados;
            });

            setQuery(result);
            setTotalEnvasado(_.round(rechazoEnv, 0));
            setTotalRayosX(_.round(rechazoRayosX, 0));
            setChartsMaxY(Math.ceil(maxLimit/50)*50);

            setKgPerdida(perdidas);
            setKgFormados(kgFormados);
            setKgEmpacados(kgEmpacados);

            setDataRechazos({
                labels: labels,
                datasets: [
                    {
                        label: ' Envasado',
                        backgroundColor: '#f7b924',
                        data: dataEnvasado
                    },
                    {
                        label: ' Rayos X',
                        backgroundColor: '#d92550',
                        data: dataRayosX
                    }
                ]
            });
        })
        .catch(err => {
            console.error(err);
        });
    };
    
    useEffect(() => {
        if (props.confirmar !== 0)
            getRechazos();
    }, [props.confirmar]);

    return (
        <FullScreen handle={props.handle} >
            <div className={props.handle.active ? "fullscreen-space" : "fullscreen-space d-none"} >
                {/* Cabecera de la vista */}
                <Row className="fullscreen-nav">
                    <Col style={{ alignSelf: 'center' }}>
                        <div className="app-header__logo2">
                            <div className="logo-src2" style={{ backgroundImage: `url(${localStorage.getItem("img")})`, marginTop: '0' }}/>
                        </div>
                    </Col>

                    <Col className="bigFont2" align="center" style={{ fontSize: '1.5rem', alignSelf: 'center' }}>
                        Rechazos para el día {moment(props.date).format('DD-MM-YYYY')} 
                    </Col>


                    <Col className="ml-4" style={{ alignSelf: 'center' }} align="right">
                        <div className="app-header__logo2">
                            <div className="logo-src2" style={{ 
                                backgroundImage: `url(https://vigalab.com/wp-content/uploads/2019/08/VIGAlab3-768x256.png)`, 
                                marginTop: '-2.5%', 
                                marginLeft: '10%',
                                backgroundPositionX: 'center',
                                height: '100%'
                            }}/>
                        </div>
                    </Col>
                </Row>

                {/* Selector de máquinas */}
                <br></br>
                <Row md="12" xl="12" className="mb-2">
                    <Col md="7" xl="7" className="ml-5">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="">
                                                Pérdidas del día
                                                <hr></hr>
                                                <br></br>
                                            </div>
                                            <Row>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={formadora} alt="formadora"
                                                        style={{ width: '102.5%' }}
                                                    />
                                                </Col>
                                                <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange">Envasado</div>
                                                    <hr style={{ borderTop: '2px solid #2264a7' }}></hr>
                                                    <div align="center" className="font2Blue" style={{ color: 'darkslategrey' }}>
                                                        {totalEnvasado} Kg
                                                    </div>
                                                </Col>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={envasadoras} alt="envasadoras"
                                                        style={{ width: '102.5%' }}
                                                    />
                                                </Col>
                                                <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange">Rayos X</div>
                                                    <hr style={{ borderTop: '2px solid #2264a7' }}></hr>
                                                    <div align="center" className="font2Blue" style={{ color: 'darkslategrey' }}>
                                                        {totalRayosX} Kg
                                                    </div>
                                                </Col>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={empaquetadora} alt="empaquetadora"
                                                        style={{ width: '102.5%' }}
                                                    />
                                                </Col>
                                            </Row>
                                            <br></br>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md="4" xl="4" className="ml-4 mr-4">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="">
                                                Indicador de calidad
                                                <hr></hr>
                                            </div>
                                            <Row>
                                                <Col md="12" xl="12">
                                                    <Table size="sm">
                                                        <thead className="theadBlue">
                                                            <tr className="text-center">
                                                                <th>Producto</th>
                                                                <th>Calidad</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                        {
                                                            query.map((sku, i) =>
                                                            <tr key={i}>
                                                                <td style={{ width: "60%", height: '2.5rem' }}>
                                                                    { sku.producto }
                                                                </td>
                                                                <td style={{ width: "40%", fontWeight: 'bold' }} className="text-center">
                                                                    {isNaN(sku.kg_empacados/sku.kg_formados) ? 
                                                                        "-"
                                                                        : formatNumber.new(_.round(sku.kg_empacados/sku.kg_formados*100, 2)) + " %"
                                                                    }
                                                                </td>
                                                            </tr>
                                                            )
                                                        }
                                                            <tr style={{ backgroundColor: '#e9ecefbf' }}>
                                                                <td style={{ width: "60%", height: '2.5rem', fontWeight: 'bold' }} align="center">
                                                                    Producción del día
                                                                </td>
                                                                <td style={{ width: "40%", fontWeight: 'bold' }} className="text-center">
                                                                    {isNaN(kgEmpacados/kgFormados) ? 
                                                                        "-"
                                                                        : formatNumber.new(_.round(kgEmpacados/kgFormados*100, 2)) + " %"
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                <Row md="12" xl="12">
                    <Col md="5" xl="5" className="ml-5" style={query.length < 3 ?
                        { flex: '0 0 45.85%', maxWidth: '45.85%' } : query.length < 4 ?
                        { flex: '0 0 45.85%', maxWidth: '45.85%', marginTop: '-2%' } :
                        { flex: '0 0 45.85%', maxWidth: '45.85%', marginTop: '-4%' }
                    }>
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="">
                                                Detalle de pérdidas según SKU (<i>en kg.</i>)
                                                <hr></hr>
                                            </div>
                                            <Bar
                                                data={dataRechazos}
                                                options={{
                                                    title:{
                                                        display:false,
                                                        fontSize:20
                                                    },
                                                    legend:{
                                                        display: true,
                                                        position:'top'
                                                    },
                                                    type: 'bar',
                                                    scales: {
                                                        xAxes: [{
                                                            gridLines: {
                                                                display: false
                                                            },
                                                            ticks: {
                                                                autoSkip: false,
                                                                maxRotation: 0,
                                                                minRotation: 0
                                                            }
                                                        }],
                                                        yAxes: [{
                                                            ticks: {
                                                                min: 0,
                                                                max: chartsMaxY
                                                            },
                                                            gridLines: {
                                                                display: false
                                                            }
                                                        }]
                                                    },
                                                    plugins: {
                                                        datalabels: {
                                                           display: true,
                                                           color: 'white'
                                                        }
                                                    }
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col md="4" xl="4" className="ml-4 mr-4" style={{ flex: '0 0 45.85%', maxWidth: '45.85%' }}>
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="">
                                                Pérdidas sobre la producción de cada SKU
                                                <hr></hr>
                                            </div>
                                            <Row>
                                                <Col md="12" xl="12">
                                                    <Table size="sm">
                                                        <thead className="theadBlue">
                                                            <tr className="text-center">
                                                                <th>Producto</th>
                                                                <th>Kg de pérdida</th>
                                                                <th>Kg formados</th>
                                                                <th>Relación</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                        {
                                                            query.map((sku, i) =>
                                                            <tr key={i}>
                                                                <td style={{ width: "40%", height: '2.5rem' }}>
                                                                    { sku.producto }
                                                                </td>
                                                                <td style={{ width: "20%", fontWeight: 'bold' }} className="text-center">
                                                                    {isNaN(sku.rechazo_global) || !sku.rechazo_global ? 
                                                                        "-"
                                                                        : formatNumber.new(sku.rechazo_global)
                                                                    }
                                                                </td>
                                                                <td style={{ width:'20%', fontWeight: 'bold' }} className="text-center">
                                                                    {isNaN(sku.kg_formados) || !sku.kg_formados ? 
                                                                        "-"
                                                                        : formatNumber.new(sku.kg_formados)
                                                                    }
                                                                </td>
                                                                <td style={{ width: "20%", fontWeight: 'bold' }} className="text-center">
                                                                    {isNaN(sku.rechazo_global/sku.kg_formados) ? 
                                                                        "-"
                                                                        : formatNumber.new(_.round(sku.rechazo_global/sku.kg_formados*100, 2)) + " %"
                                                                    }
                                                                </td>
                                                            </tr>
                                                            )
                                                        }
                                                            <tr style={{ backgroundColor: '#e9ecefbf' }}>
                                                                <td style={{ width: "40%", height: '2.5rem', fontWeight: 'bold' }} align="center">
                                                                    Producción del día
                                                                </td>
                                                                <td style={{ width: "20%", fontWeight: 'bold' }} className="text-center">
                                                                    { formatNumber.new(kgPerdida) }
                                                                </td>
                                                                <td style={{ width:'20%', fontWeight: 'bold' }} className="text-center">
                                                                    { formatNumber.new(kgFormados) }
                                                                </td>
                                                                <td style={{ width: "20%", fontWeight: 'bold' }} className="text-center">
                                                                    {formatNumber.new(_.round(kgPerdida/kgFormados*100, 2)) + " %"}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </FullScreen>
    );
}

export default FullScreenPerdidas;