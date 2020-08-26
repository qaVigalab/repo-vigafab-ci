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


export default class CialWidget extends Component {


    
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
            
            <div>
            {/* header */}
            <Container>
            <Row>
                <Col>
           
        
<div>
                                                <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={false} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={((this.props.OE/this.props.OET)*100).toFixed(0)} // String: Update to change the progress and percentage.
                                            progressColor="var(--success)" // String: Color of "progress" portion of circle.
                                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                            textColor="#6b778c" // String: Color of percentage text color.
                                            textStyle={{
                                                fontSize: '6rem' // CSSProperties: Custom styling for percentage.
                                            }}
                                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                                            showPercentage={true} // Boolean: Show/hide percentage.
                                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                        />
                                        </div>   
                                        </Col>
                                        </Row>
                                        <Row>
                                        <Col> 
                                        <div>    
         <font color="gray">{this.props.data[6]} hrs / {this.props.data.reduce((a, b) => a + b, 0).toFixed(1)} hrs</font>   
         </div> 
         </Col>
         </Row>
         </Container>
</div>


                     
         
        )



        
   
 

    
}
}