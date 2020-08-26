import React,  {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './style.css';
import {Button, Container, ButtonGroup} from 'reactstrap';
import FormDateRangePicker from './DateRangePicker'
import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

import {
    faHome

} from '@fortawesome/free-solid-svg-icons';

import {Input, 
    InputGroup, InputGroupAddon
} from 'reactstrap';

import {
    faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import PageTitleAlt3 from '../../../Layout/AppMain/PageTitleAlt3';
import DatePicker   from 'react-datepicker'; 


import {Doughnut} from 'react-chartjs-2';

import Circle from 'react-circle';
import Chart from 'react-apexcharts'

import bg1 from '../../../assets/utils/images/dropdown-header/abstract1.jpg';


import classnames from 'classnames';

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

import Column from './Examples/Column';
import Bar2 from './Examples/Bar';
import Area from './Examples/Area';
import Mixed from './Examples/Mixed';

import {
    faAngleUp,
    faAngleDown,
    faQuestionCircle,
    faBusinessTime,
    faCog
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CialWidget from './CialWidget';

const data = {
    legend:[{
        display: false,
        position: "top",
        fullWidth: true,
        reverse: true,}],
    
    labels: [
        'Inactivo',
        'Inactivo',
        'Parada',
        'Parada',
        'Producción'
    ],
    datasets: [{
        data: [ 300, 50, 100, 50, 300],
        backgroundColor: [
            '#d9d9d9',
            '#25a0fc',
            '#ffef45',
            '#ff4560',
            '#31cc54'
        ],
        hoverBackgroundColor: [
            '#d9d9d9',
            '#25a0fc',
            '#ffef45',
            '#ff4560',
            '#31cc54'
        ]
    }]
};

export default class MinimalDashboard1 extends Component {

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
                    <Row>
                        <Col>
                    <PageTitleAlt3
                        heading="VISTA GENERAL"
                        subheading="This is an example dashboard created using build-in elements and components."
                        icon="lnr-apartment opacity-6"
                    />
                    </Col><Col>
                    <div align="right">
                    <Button className="mb-2 mr-2" color="primary">Descargar como Reporte</Button> 
                    </div>
                    </Col></Row>
                    
              
            
                    <Row>
                        <Col md="6" xl="4">
                            <Card className="main-card mb-3">
                            
                                <CardBody>

                                    <div className="titlecard">                                      
                                            
                                                Filtrar Por
                                           
                                                </div>  
                                                 {/* modo 0 */}
                                                
                                            <Button outline={this.state.modo===0?false:true} className="mb-2 mr-2" color={this.state.modo===0?"primary":"secondary"} onClick={() => {
                                                                                   this.setState({
                                                                                    modo:0
                                                                                })  }} >Ver todos</Button> 
                                                                                             {/* modo 1 */}

                                <Button  outline={this.state.modo===1?false:true} className="mb-2 mr-2 btn-transition" 
                                            color={this.state.modo===1?"primary":"secondary"} onClick={() => {
                                                this.setState({
                                                 modo:1
                                             })  }} >Hornos</Button>
                                                                                             {/* modo 2 */}

                                            <Button outline={this.state.modo===2?false:true} className="mb-2 mr-2 btn-transition"
                                            color={this.state.modo===2?"primary":"secondary"} onClick={() => {
                                                this.setState({
                                                 modo:2
                                             })  }} >Envasadoras</Button>
                                                                                             {/* modo 5 */}

                                            <Button outline={this.state.modo===5?false:true} className="mb-2 mr-2 btn-transition"
                                            color={this.state.modo===5?"primary":"secondary"} onClick={() => {
                                                this.setState({
                                                 modo:5
                                             })  }} >Por Producto</Button>
                                            
                                        
                                    
                                    
                        
                              




                            </CardBody>
                            </Card>
                        </Col>
                        <Col md="6" xl="8">
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
                                
                            </Card>
                            </Col>

                    </Row>


                   
                    <div class="columns-parent">
                    
                    {this.state.modo===1||this.state.modo===0?
                    <Row>
                         {/* Carta 3  black header*/}
                         <CialWidget modo={1} estado={1} nombre="Horno 1" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={1} estado={2} nombre="Horno 2" data={[ 3, 2.3, 1.2, 2.4, 1.5, 0.2, 4.8]}/>
                         <CialWidget modo={1} estado={1} nombre="Horno 3" data={[ 1.2, 2.3, 3.4, 5.5, 2, 5, 3]}/>
                         </Row>:''
                         }
     
                        {this.state.modo===2||this.state.modo===0?
                        <Row>
                         <CialWidget modo={2} descripcion="009 - Vienesa Vacío 4 x 1 KG SJ" OE={2090} OET={2500} estado ={1} nombre="Envasadora 1" data={[ 4, 2, 0.11, 1.4, 1, 0.2, 3.8]}/>
                         <CialWidget modo={2} descripcion="1018 - Vienesa Pavo 8 x 1 KG SJ" OE={1200} OET={2100} estado ={0} nombre="Envasadora 2" data={[ 2, 0.4, 0.5, 0.8, 1.2, 1, 1.1]}/>
                         <CialWidget modo={2} descripcion="1019 - Vienesa Pollo 8 x 1 KG SJ" OE={1050} OET={2000} estado ={1} nombre="Envasadora 3" data={[ 3.4, 1, 0.15, 0.13, 0.5, 1, 4]}/>
                        </Row>
                        :''
                    }
                                        {this.state.modo===5||this.state.modo===0?
                         <Row>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="1009 - Vienesa Vacío 4 x 1 KG SJ" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="1018 - Vienesa Pavo 8 x 1 KG SJ" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="1019 - Vienesa Pollo 8 x 1 KG SJ" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="910 - Vienesa Unimarc 1 KG" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="8772 - Salchicha tradicional 900 x 4 WN" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="1032 - Vienesa Vacío 8 x 1 KG SJ" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="1059- Vienesa Merkat 8x1 KG" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         <CialWidget modo={5} estado={1} color="#444054" OE="1980" nombre="2380- Vienesas Tradicional Tottus" data={[ 2.2, 3, 2, 0.8, 0.3, 0.2, 5]}/>
                         </Row>
                         :''
                        }
                       <Row alignItems="stretch">
                       {this.state.modo===1||this.state.modo===0?
<CialWidget modo={3} nombre="Total Hornos"  data={[ 6, 0.5, 1.2, 0.5, 1, 1.2, 5]}/>:''}
{this.state.modo===2||this.state.modo===0?
<CialWidget modo={4} nombre="Total Envasadoras" OE="11324" OET="24521" descripcion="Tipos de productos envasados: 5"  data={[ 5, 0.2, 1, 0.4, 0.5, 1.2, 7]}/>
 :''}
</Row>
  
</div>


                            
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
