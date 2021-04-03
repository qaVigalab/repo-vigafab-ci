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
    const [totalEnvasado, setTotalEnvasado] = useState(0.0);
    const [totalRayosX, setTotalRayosX] = useState(0.0);
    const [dataEnv, setDataEnv] = useState({});
    const [dataRayos, setDataRayos] = useState({});
    const [chartsMaxY, setChartsMaxY] = useState(0);

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
            var rechazoEnv = 0, rechazoRayosX = 0;
            var maxLimit = 0;

            result.map(r => {
                labels.push(r.producto.split("@"));
                dataEnvasado.push(r.rechazo_envasado);
                dataRayosX.push(r.rechazo_rayos_x);
                
                rechazoEnv += r.rechazo_envasado;
                rechazoRayosX += r.rechazo_rayos_x;

                if (r.rechazo_envasado > maxLimit)
                    maxLimit = r.rechazo_envasado;
                else if (r.rechazo_rayos_x > maxLimit)
                    maxLimit = r.rechazo_rayos_x;
            });

            setTotalEnvasado(_.round(rechazoEnv, 0));
            setTotalRayosX(_.round(rechazoRayosX, 0));
            setChartsMaxY(Math.ceil(maxLimit/100)*100);

            setDataEnv({
                labels: labels,
                datasets: [
                    {
                        label: 'Kilogramos',
                        backgroundColor: '#f7b924',
                        data: dataEnvasado
                    }
                ]
            });

            setDataRayos({
                labels: labels,
                datasets: [
                    {
                        label: 'Kilogramos',
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
        getRechazos();
    }, [props.date]);

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
                        Pérdidas para el día {moment(props.date).format('DD-MM-YYYY')} 
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
                                            <div className="titlecard">
                                                Pérdidas del día
                                                <hr></hr>
                                            </div>

                                            <Row>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={formadora} alt="formadora"
                                                        style={{ width: '105%' }}
                                                    />
                                                </Col>
                                                <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange">Envasado</div>
                                                    <hr></hr>
                                                    <div align="center" className="font2Blue" style={{ color: 'darkslategrey' }}>
                                                        {totalEnvasado} Kg
                                                    </div>
                                                </Col>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={envasadoras} alt="envasadoras"
                                                        style={{ width: '105%' }}
                                                    />
                                                </Col>
                                                <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange">Rayos X</div>
                                                    <hr></hr>
                                                    <div align="center" className="font2Blue" style={{ color: 'darkslategrey' }}>
                                                        {totalRayosX} Kg
                                                    </div>
                                                </Col>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={empaquetadora} alt="empaquetadora"
                                                        style={{ width: '105%' }}
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
                                    <Row className="mb-3">
                                        <Col>
                                            <div className="titlecard">
                                                Relación de pérdida
                                                <hr></hr>
                                            </div>
                                            <Row className="mt-2 mb-2">
                                                <Col md="6" xl="6">
                                                </Col>

                                                <Col md="6" xl="6">
                                                </Col>
                                            </Row>
                                            <br></br>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                
                <Row md="12" xl="12">
                    <Col md="5" xl="5" className="ml-5" style={{ flex: '0 0 45.85%', maxWidth: '45.85%' }}>
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="titlecard">
                                                Rechazos de Envasado (según SKU)
                                                <hr></hr>
                                            </div>
                                            <Bar
                                                data={dataEnv}
                                                options={{
                                                    title:{
                                                        display:false,
                                                        text:'Average Rainfall per month',
                                                        fontSize:20
                                                    },
                                                    legend:{
                                                        display:false,
                                                        position:'right'
                                                    },
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
                    
                    <Col md="5" xl="5" className="ml-4 mr-4" style={{ flex: '0 0 45.85%', maxWidth: '45.85%' }}>
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="titlecard">
                                                Rechazos de Rayos X (según SKU)
                                                <hr></hr>
                                            </div>
                                            <Bar
                                                data={dataRayos}
                                                options={{
                                                    title:{
                                                        display:false,
                                                        text:'Average Rainfall per month',
                                                        fontSize:20
                                                    },
                                                    legend:{
                                                        display:false,
                                                        position:'right'
                                                    },
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
                </Row>
            </div>
        </FullScreen>
    );
}

export default FullScreenPerdidas;