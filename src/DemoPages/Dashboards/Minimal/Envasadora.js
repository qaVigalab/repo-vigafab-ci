import React,  {Component, Fragment} from 'react';

import PageTitleAlt3 from '../../../Layout/AppMain/PageTitleAlt3';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Input, 
    InputGroup, InputGroupAddon
} from 'reactstrap';
import Produccion from './Produccion';
import Actividad from './Actividad';
import styles from './style.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Button, Container, ButtonGroup} from 'reactstrap';
import FormDateRangePicker from './DateRangePicker'
import {
    Row, Col,
    Alert,
    CardTitle,
    CardHeader,
    Table,
    Nav,
    NavItem,
    NavLink,
    Popover,
    PopoverBody,
    Progress,
    Card,
    CardBody,
    DropdownItem, DropdownToggle, DropdownMenu,
    UncontrolledButtonDropdown, CardFooter
} from 'reactstrap';


import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import DatePicker   from 'react-datepicker'; 


export default class Envasadora extends Component {

    applyCallback(startDate, endDate) {
        this.setState({
                start: startDate,
                end: endDate
            }
        )
    }


    constructor(props) {
        super(props);

        this.togglePop1 = this.togglePop1.bind(this);

        this.state = {
            modo: 0
        }
        this.onDismiss = this.onDismiss.bind(this);
    }

    togglePop1() {
        this.setState({
            popoverOpen1: !this.state.popoverOpen1
        });
    }

    onDismiss() {
        this.setState({visible: false});
    }

    render() {

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                    <PageTitleAlt3
                        heading="Envasadora 1"
                        subheading="This is an example dashboard created using build-in elements and components"
                        icon="lnr-apartment opacity-6"
                    />
                    </ReactCSSTransitionGroup>

                    <Col md="12" xl="12">
                            <Card className="main-card mb-3">
                            
                                <CardBody>
                                <Container>

                                <Row>
    <Col>


                                            <div className="titlecard">
                                                Ver Fecha
                                            </div>
                                            
                                            <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faCalendarAlt}/>
                        </div>
                    </InputGroupAddon>
                    <DatePicker className="form-control"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                    />
                </InputGroup>                      
    </Col>
    <Col>
      
  
                                            <div className="titlecard">
                                                Turno
                                            </div>
                                            
                                            <Input type="select" name="select" id="exampleSelect">
                                                    <option>Turno 1</option>
                                                    <option>Turno 2</option>
                                                    <option>Turno 3</option>
                                                </Input>
                                           
                                        </Col>

                                        <Col>
                                    


                                        <div className="titlecard">
                                                Ver Rango Especifico
                                                </div>
                                            
                                            
                                                
                                            <InputGroup>
                    
                    <FormDateRangePicker/>
                </InputGroup>
                </Col>
                <Col>                <div align="right" className="buttonenvase">   <Button className="mb-2 mr-2" color="primary">Descargar como Reporte</Button> </div> 
</Col>

           </Row>
           </Container>                           
                            </CardBody>
                            </Card>

                        </Col>
                        <Col md="12" xl="12">
                            <Card className="main-card mb-3">
                            
                                <Row>
                                    <Col>
                                    <div className="flechas">
                                    <div align="left">
                                &lt;
                                </div>
                                </div>
                                </Col>
                                <Col>
                                <div className="navegator">
                                <div align="center">
                                7:00 - 14:30 | TURNO 1 | 08 Ene 2020
                                </div>
                                </div>
                                </Col>
                                <Col>
                                <div className="flechas">
                                <div align="right">
                                &gt;
                                </div>
                                </div>
                                
                                </Col>
                                </Row>

                                <Row><Col>
                                <table width="100%"><tr>
                                <td>
                                Prod.

                                </td>
                                <td>Hora</td>
                                <td>Producción</td>
                                <td>Tiempo de Actividad</td>
                                <td>OEE</td>
                                <td>Tipo</td>
                                <td>Tiempo</td>
                                <td>Razón</td>
                                <td>Comentario</td>
                                </tr>
                                <tr>
                                    <td ></td>
                                    <td>7:00 - 8:00</td> 
                                    <td width="20px"><Produccion  data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/></td>
                                    <td><Actividad OE="12" OET="19"  nombre="Horno 1" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/></td>
                                    <td><Actividad OE="12" OET="19"  nombre="Horno 1" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/></td>
                                    <td><div className="circulo produccion"/> Producc
                                    <div className="circulo rojo"/> Paro
                                    <div className="circulo amarillo"/> Paro
                                    <div className="circulo azul"/> Paro</td>
                                    <td>Tiempo</td>
                                    <td>Razon</td>
                                    <td>Comentario</td>
                                </tr>
                                    </table>
                                
                                </Col></Row>
                                
                            </Card>
                            </Col>
                    </Fragment>
        )
    }
}
