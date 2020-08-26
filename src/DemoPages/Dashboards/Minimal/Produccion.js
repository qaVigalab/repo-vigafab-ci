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
import Chart from 'react-apexcharts';


import bg1 from '../../../assets/utils/images/dropdown-header/abstract1.jpg';
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
    faAngleUp,
    faAngleDown,
    faQuestionCircle,
    faBusinessTime,
    faCog
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



import classnames from 'classnames';


export default class Pr extends Component {


    
    render() {

        let data = {
            legend:[{
                display: false,
                position: "top",
                fullWidth: true,
                reverse: true,}],
            
            labels: [
                'Inactivo',
                'Naranjo',
                'Morado',
                'Azul',
                'Amarillo',
                'Rojo',
                'Producción'
            ],
            datasets: [{
                data: this.props.data,
                backgroundColor: [
                    '#d9d9d9',
                    '#feb018',
                    '#775dd0',
                    '#25a0fc',
                    '#ffef45',
                    '#ff4560',
                    '#31cc54'
                ],
                hoverBackgroundColor: [
                    '#d9d9d9',
                    '#feb018',
                    '#775dd0',
                    '#25a0fc',
                    '#ffef45',
                    '#ff4560',
                    '#31cc54'
                ]
            }]
        };
 
        return(
            <Row>
            <Col>
            
            {/* header */}
        <Container>
    
                    
                         <Doughnut data={data} options={{
                            legend: {
                            display: false
                            },
                            responsive:true, maintainAspectRatio: true}}/>
                            
                            </Container>

            

                
        </Col>  
        </Row>          
         
        )



        
   
 

    
}
}