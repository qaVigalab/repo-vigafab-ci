import React, { useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { 
    Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, Row, FormGroup, Label, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";

import _ from "lodash";
import moment from 'moment';


const FullScreenParos = (props) => {
    const [fecha, setFecha] = useState(props.date);
    useEffect(() => {
        setFecha(props.date);
    }, [props.date]);

    const [machineDropdownOpen, setMachineDropdownOpen] = useState(false);
    const toggleMachine = () => setMachineDropdownOpen(!machineDropdownOpen);
    
    const [machineSelected, setMachineSelected] = useState("Línea Completa");
    const changeMachine = (e) => {
        setMachineSelected(e.currentTarget.textContent);
        toggleMachine();
    };

    const [classificationDropdownOpen, setClassificationDropdownOpen] = useState(false);
    const toggleClassification = () => setClassificationDropdownOpen(!classificationDropdownOpen);
    
    const [classificationSelected, setClassificationSelected] = useState("Todos los paros");
    const changeClassification = (e) => {
        setClassificationSelected(e.currentTarget.textContent);
    };

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
                        Tiempos perdidos para el día {moment(fecha).format('DD-MM-YYYY')} 
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
                <Row md="12" xl="12">
                    <Col md="3" xl="3" className="ml-4">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Container>
                                    <Row className="mb-1">
                                        <Col>
                                            <div className="titlecard">
                                                Filtros de búsqueda
                                                <hr></hr>
                                            </div>
                                            <InputGroup>
                                                <Col md="4" xl="4" align="left" style={{ alignSelf: 'center' }}>
                                                    Máquina
                                                </Col>

                                                <Col align="right">
                                                    <Dropdown isOpen={machineDropdownOpen} toggle={toggleMachine}>
                                                        <DropdownToggle caret style={{ color: '#6c757d', backgroundColor: 'white' }}>
                                                            {machineSelected}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem header>Seleccione una máquina</DropdownItem>
                                                            <DropdownItem onClick={changeMachine}>Formadora</DropdownItem>
                                                            <DropdownItem onClick={changeMachine}>Envasadora 3</DropdownItem>
                                                            <DropdownItem onClick={changeMachine}>Envasadora 4</DropdownItem>
                                                            <DropdownItem onClick={changeMachine}>Envasadora 5</DropdownItem>
                                                            <DropdownItem onClick={changeMachine}>Envasadora 6</DropdownItem>
                                                            <DropdownItem onClick={changeMachine}>Empaquetadora</DropdownItem>
                                                            <DropdownItem divider />
                                                            <DropdownItem onClick={changeMachine}>Línea Completa</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </Col>
                                            </InputGroup>
                                            <br></br>
                                            <InputGroup>
                                                <Col md="5" xl="5" align="left" style={{ alignSelf: 'center' }}>
                                                    Clasificación
                                                </Col>

                                                <Col align="right">
                                                    <Dropdown isOpen={classificationDropdownOpen} toggle={toggleClassification}>
                                                        <DropdownToggle caret style={{ color: '#6c757d', backgroundColor: 'white' }}>
                                                            {classificationSelected}
                                                        </DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem header>Seleccione una clasificación</DropdownItem>
                                                            <DropdownItem onClick={changeClassification}>...</DropdownItem>
                                                            <DropdownItem divider />
                                                            <DropdownItem onClick={changeClassification}>Todos los paros</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                </Col>
                                            </InputGroup>
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

export default FullScreenParos;