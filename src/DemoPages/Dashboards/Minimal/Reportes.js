import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import React, { Fragment, useState, useEffect } from "react";
import { 
    Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, Progress, Row, Table, FormGroup, Label, Spinner
} from "reactstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import moment from 'moment';
import _ from "lodash";

import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import FullScreenParos from "./FullScreenParos";
import FullScreenPerdidas from "./FullScreenPerdidas";
import { useCallback } from "react";

function Reportes() {
    let m = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    const handleParos = useFullScreenHandle();
    const handlePerdidas = useFullScreenHandle();

    const changeFullScreen = useCallback((state, handle) => {
        if (handle === handleParos){
            console.log("Fullscreen de ", state, handle);
        } else if (handle === handlePerdidas){
            console.log("Fullscreen de ", state, handle);
        }
    }, [handleParos, handlePerdidas]);

    const [clicConfirmar, setClicConfirmar] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const changeBtnConfirmar = (e) => {
        e.preventDefault();
        setClicConfirmar(clicConfirmar + 1);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setConfirm(true);
        }, 5000);
    };

    const [sku, setSku] = useState(0);
    const [btnSku, setBtnSku] = useState(0);
    const [startDate, setStartDate] = useState(new Date(moment().add(-1, 'days')));
    const [endDate, setEndDate] = useState(new Date(moment().add(-1, 'days')));

    const changeBtnSku = (e) => {
        e.preventDefault();
        btnSku === 1 ? setBtnSku(0) : setBtnSku(1)
        if (btnSku === 1) setSku(0);
    };

    const changeSku = (e) => {
        e.target.value.length === 7 ? setSku(e.target.value) : setSku(0);
    };

    const handleChange = (date) => {
        setStartDate(date);
        setEndDate(date);
    };
    
    const handleChange2 = (date) => {
        setEndDate(date);
    };

    useEffect(() => {
        setConfirm(false);
    }, [endDate, sku]);

    return (
        <div>
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <Row>
                        <Col>
                            <PageTitleAlt3
                                heading="REPORTES"
                                icon="lnr-chart-bars opacity-6"
                                empresa="Agrosuper"
                                menues={[]}
                                menu_actual="Reportes"
                            />
                        </Col>
                    </Row>

                    <Row md="12" xl="12">
                        <Col md="4" xl="4">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <Container>
                                        <div className="titlecard">Filtrar Por</div>
                                        <Row className="mb-1">
                                            <Col>
                                                <Button block
                                                    className="mb-3 mr-1"
                                                    color="primary">
                                                    Tiempo
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button block
                                                    onClick={(e) => changeBtnSku(e)}
                                                    outline={btnSku === 1 ? false : true}
                                                    className="mb-3 mr-1"
                                                    color={btnSku === 1 ? "primary" : "secondary"}>
                                                    Producto
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col md="8" xl="8">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div className="titlecard">Desde</div>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <div className="input-group-text">
                                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                                        </div>
                                                    </InputGroupAddon>
                                                    <DatePicker
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={startDate}
                                                        onChange={(e) => handleChange(e)}
                                                        selectsStart
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                    />
                                                </InputGroup>
                                            </Col>

                                            <Col>
                                                <div className="titlecard">Hasta</div>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <div className="input-group-text">
                                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                                    </div>
                                                    </InputGroupAddon>
                                                    <DatePicker
                                                        dateFormat="dd/MM/yyyy"
                                                        className="form-control"
                                                        selected={endDate}
                                                        onChange={(e) => handleChange2(e)}
                                                        selectsEnd
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        minDate={startDate}
                                                    />
                                                </InputGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <Label>Buscar por SKU</Label>
                                                    <Input
                                                    onChange={(e) => changeSku(e)}
                                                    size="md"
                                                    className="mt-2"
                                                    type="text"
                                                    name="sku"
                                                    id="sku"
                                                    placeholder="SKU"
                                                    disabled={btnSku === 0 ? true : false}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col >
                                                <Label></Label>
                                                {confirm === false && loading === false ?
                                                    <Button className="mt-3" size="lg" block color="primary" onClick={(e) => changeBtnConfirmar(e)}>
                                                        Confirmar
                                                    </Button>
                                                :   loading === true ?
                                                    <Spinner animation="border" variant="info" style={{ marginTop: '2.35rem' }} />
                                                :   <div align="center" className="font2Blue mt-3" style={{ color: '#3ac47d' }}>
                                                        ¡Reportes listos!
                                                    </div>
                                                }
                                            </Col>
                                        </Row>
                                    </Container>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row md="12" xl="12">
                        <Col md="12" xl="12">
                            <Card className="main-card mb-3">
                                <Row>
                                    <Col align="left">
                                        <div className="ml-3 text-uppercase font-weight-bold title1orange">Reportes diarios</div>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col md="1" xl="1"></Col>
                                    <Col className="mb-2" md="4" xl="4">
                                        <Row>
                                            <Col className="ml-4 my-2" align="left">
                                                <div className="font2Blue">Reporte de paros</div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="ml-4 my-2" align="left">
                                                <Label style={{ textAlign: 'justify' }}>
                                                    Permite visualizar el reporte de tiempos perdidos para cada turno del día seleccionado.
                                                    Admite visualización de Línea Completa disponible y la posibilidad de filtrar según SKU y/o máquina.
                                                </Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" xl="5"></Col>
                                            <Col md="6" xl="6">
                                                {confirm === false ?
                                                    <Button className="my-2 ml-4 buttonOrange" size="lg" block disabled onClick={handleParos.enter}>Generar</Button> :
                                                    <Button className="my-2 ml-4 buttonOrange" size="lg" block onClick={handleParos.enter}>Generar</Button>
                                                }
                                            </Col>
                                            <Col md="1" xl="1"></Col>
                                        </Row>
                                    </Col>
                                    <Col md="2" xl="2"></Col>
                                    <Col className="mb-2" md="4" xl="4">
                                        <Row>
                                            <Col className="ml-4 my-2" align="left">
                                                <div className="font2Blue">Reporte de pérdidas</div>    
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="ml-4 my-2" align="left">
                                                <Label style={{ textAlign: 'justify' }}>
                                                    Permite visualizar el reporte de rechazos en Envasado y Rayos X para el día seleccionado.
                                                    Sólo admite visualización del día completo, ya que expone el detalle según cada SKU producido.
                                                </Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5" xl="5"></Col>
                                            <Col md="6" xl="6">
                                                {confirm === false ?
                                                    <Button className="my-2 ml-4 buttonOrange" size="lg" block disabled onClick={handlePerdidas.enter}>Generar</Button> :
                                                    <Button className="my-2 ml-4 buttonOrange" size="lg" block onClick={handlePerdidas.enter}>Generar</Button>
                                                }
                                            </Col>
                                            <Col md="1" xl="1"></Col>
                                        </Row>
                                    </Col>
                                    <Col md="1" xl="1"></Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>

            <FullScreenParos handle={handleParos} onChange={changeFullScreen} date={startDate} sku={sku} confirmar={clicConfirmar} />
            <FullScreenPerdidas handle={handlePerdidas} onChange={changeFullScreen} date={startDate} confirmar={clicConfirmar} />
        </div>
    );
};

export default Reportes;