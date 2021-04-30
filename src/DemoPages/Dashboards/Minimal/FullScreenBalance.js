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

const FullScreenBalance = (props) => {
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

    const [balance, setBalance] = useState({});
    const [calidad, setCalidad] = useState(0);
    const getBalance = () => {
        fetch(global.api.dashboard.getBalanceDia, {
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
            var skus = {}, kgFormados = 0, kgEmpacados = 0;
            result.map(r => {
                if (r.producto in skus){
                    if (r.id_tipo_vibot === 4){
                        skus[r.producto].rayos_mezc += r.rayos_mezc;
                        skus[r.producto].rayos_cam += r.rayos_cam;
                    } else if (r.id_tipo_vibot === 5){
                        skus[r.producto].hamb_empacadas += r.hamb_empacadas;
                        skus[r.producto].kg_empacados += r.kg_empacados;

                        kgEmpacados += r.kg_empacados;
                    }
                } else{
                    skus[r.producto] = {
                        hamb_formadas: r.hamb_formadas,
                        kg_formados: r.kg_formados,
                        env_mezc: r.env_mezc,
                        env_cam: r.env_cam,
                        rayos_mezc: r.rayos_mezc,
                        rayos_cam: r.rayos_cam,
                        hamb_empacadas: r.hamb_empacadas,
                        kg_empacados: r.kg_empacados
                    };

                    kgFormados += r.kg_formados;
                }
            });

            setBalance(skus);
            setCalidad(_.round(kgEmpacados/kgFormados*100, 2));
        })
        .catch(err => {
            console.error(err);
        });
    };

    useEffect(() => {
        if (props.confirmar !== 0)
            getBalance();
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
                        Balance de masa para el día {moment(props.date).format('DD-MM-YYYY')} 
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
                    <Col md="2" xl="2" className="ml-5">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row className="mb-3">
                                        <Col>
                                            <div>
                                                Indicador de calidad
                                                <hr></hr>
                                                <Col align="center" className="font2Blue mt-3 mb-2" style={{ fontSize: 'xx-large' }}>
                                                    {formatNumber.new(calidad)}%
                                                </Col>
                                                <div align="center" className="font2Blue" style={{ fontWeight: 'bold' }}>de la prod. del día</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>

                        {/*<Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row className="mb-3">
                                        <Col>
                                            <div>
                                                Calidad por SKU
                                                <hr></hr>
                                            </div>
                                            {Object.keys(balance).map((sku, i) =>
                                                <div>
                                                    <Row>
                                                        <div align="center" style={{ color: 'darkslategrey', fontWeight: 'bold' }}>{sku}</div>
                                                        <Col align="center" className="font2Blue mt-3 mb-2" style={{ fontSize: 'x-large' }}>
                                                            {formatNumber.new(_.round(balance[sku].kg_empacados/balance[sku].kg_formados*100, 2))}%
                                                        </Col>
                                                    </Row>
                                                    <hr></hr>
                                                </div>
                                            )}
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>*/}
                    </Col>

                    <Col md="9" xl="9" className="ml-4 mr-4">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row className="mb-1">
                                        <Col>
                                            <div>
                                                Balance de masa de la línea de hamburguesas
                                                <hr></hr>
                                            </div>
                                            <Row>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange" style={{ fontSize: 'x-large' }}>SKU</div>
                                                </Col>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={formadora} alt="formadora"
                                                        style={{ width: '75%' }}
                                                    />
                                                </Col>
                                                <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange">Reproceso de Envasado</div>
                                                    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}></hr>
                                                    <Row>
                                                        <Col md="6" xl="6" className="font2Blue" style={{ color: 'darkslategrey', borderRight: 'inset' }}>
                                                            Mezcladora
                                                        </Col>

                                                        <Col md="6" xl="6" className="font2Blue" style={{ color: 'darkslategrey' }}>
                                                            Cámara
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                    <div className="font-weight-bold title1orange">Reproceso de Rayos X</div>
                                                    <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}></hr>
                                                    <Row>
                                                        <Col md="6" xl="6" className="font2Blue" style={{ color: 'darkslategrey', borderRight: 'inset' }}>
                                                            Mezcladora
                                                        </Col>

                                                        <Col md="6" xl="6" className="font2Blue" style={{ color: 'darkslategrey' }}>
                                                            Cámara
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="2" align="center" style={{ alignSelf: 'center' }}>
                                                    <img src={empaquetadora} alt="empaquetadora"
                                                        style={{ width: '75%' }}
                                                    />
                                                </Col>
                                            </Row>

                                            {Object.keys(balance).map((sku, i) =>
                                                <div>
                                                    {i === 0 ?
                                                        <hr></hr> : ""
                                                    }
                                                    <Row className="my-4">
                                                        <Col md="2" align="center" className="font2Blue" style={{ color: 'darkslategrey', alignSelf: 'center' }}>
                                                            {sku}
                                                        </Col>
                                                        <Col md="2" className="font2Blue" align="center" style={{ alignSelf: 'center' }}>
                                                            {formatNumber.new(_.round(balance[sku].hamb_formadas, 2))}<br></br>
                                                            <div style={{ fontSize: 'small' }}>hamb. formadas</div>
                                                            <hr></hr>
                                                            {formatNumber.new(_.round(balance[sku].kg_formados, 2))}<br></br>
                                                            <div style={{ fontSize: 'small' }}>kg. formados</div>
                                                        </Col>
                                                        <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                            <Row>
                                                                <Col md="6" xl="6" className="font2Blue" style={{ fontSize: 'large', color: 'darkslategrey', borderRight: 'inset' }}>
                                                                    {formatNumber.new(_.round(balance[sku].env_mezc, 2))} Kg.
                                                                </Col>

                                                                <Col md="6" xl="6" className="font2Blue" style={{ fontSize: 'large', color: 'darkslategrey' }}>
                                                                    {formatNumber.new(_.round(balance[sku].env_cam, 2))} Kg.
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md="3" xl="3" align="center" style={{ alignSelf: 'center' }}>
                                                            <Row>
                                                                <Col md="6" xl="6" className="font2Blue" style={{ fontSize: 'large', color: 'darkslategrey', borderRight: 'inset' }}>
                                                                    {formatNumber.new(_.round(balance[sku].rayos_mezc, 2))} Kg.
                                                                </Col>

                                                                <Col md="6" xl="6" className="font2Blue" style={{ fontSize: 'large', color: 'darkslategrey' }}>
                                                                    {formatNumber.new(_.round(balance[sku].rayos_cam, 2))} Kg.
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col md="2" className="font2Blue" align="center" style={{ alignSelf: 'center' }}>
                                                            {formatNumber.new(_.round(balance[sku].hamb_empacadas, 2))}<br></br>
                                                            <div style={{ fontSize: 'small' }}>hamb. empacadas</div>
                                                            <hr></hr>
                                                            {formatNumber.new(_.round(balance[sku].kg_empacados, 2))}<br></br>
                                                            <div style={{ fontSize: 'small' }}>kg. empacados</div>
                                                        </Col>
                                                    </Row>
                                                    <hr></hr>
                                                </div>
                                            )}
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

export default FullScreenBalance;