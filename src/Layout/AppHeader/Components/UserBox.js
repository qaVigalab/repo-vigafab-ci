import { faAngleDown, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { Fragment } from 'react';
import { Bounce, toast } from 'react-toastify';
import {
    Button, DropdownMenu, DropdownToggle,
    UncontrolledButtonDropdown
} from 'reactstrap';
import  { Redirect, withRouter, Link } from 'react-router-dom'
import {
    UncontrolledDropdown,
    Nav, NavItem, DropdownItem, Col, Row
} from 'reactstrap';
import Ionicon from 'react-ionicons';
import Tabs from 'react-responsive-tabs';
import InfoIcon from '@material-ui/icons/Info';
import TimelineEx from './TabsContent/TimelineExample';
import TimelineExNew from './TabsContent/TimelineExample2';


const tabsContent = [
   
    {
        title: 'Ultimas 10',
        content: <TimelineEx />
    },
    
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

const UserBox = (props) => {
    

        return (
    <Fragment>
        <div className="widget-content p-0">
            <div className="widget-content-wrapper">
                <div className="widget-content-left">
                <UncontrolledDropdown>
                        <DropdownToggle className="p-0" color="link">
                            
                                <Ionicon beat={true} style={{height:"42px"}} color="white"  icon="md-notifications-outline"/>
                              
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-lg rm-pointers">
                        <div className="dropdown-menu-header" style={{backgroundColor:"#2f4554"}}>
                            <div className="dropdown-menu-header-inner " style={{backgroundColor:"#2f4554"}}>
                                <div className="menu-header-image opacity-2"
                                                     style={{
                                                         backgroundColor:"#2f4554"
                                                         //#ff6c1c naranjo
                                                         //backgroundImage: 'url(' + city3 + ')'
                                                     }}
                                               />
                                    <Row xs="12" >
                                    <Col xs="2" >
                                        <InfoIcon style={{height:"42px", color:"white", float:"right"}} />
                                    </Col>
                                    <Col xs="7">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">
                                            Alertas
                                        </div>
                                        <div className="widget-subheading opacity-8">
                                            De personal
                                        </div>
                                    </div>
                                    </Col>
                                    </Row>
                                </div>
                            </div>
                            <Tabs tabsWrapperClass="body-tabs body-tabs-alt" transform={false} showInkBar={true}
                                  items={getTabs()}/>
                            {/* <Nav vertical>
                                <NavItem className="nav-item-divider"/>
                                <NavItem className="nav-item-btn text-center">
                                    <Button size="sm" className="btn-shadow btn-wide btn-pill" color="focus">
                                        Ver histórico
                                    </Button>
                                </NavItem>
                            </Nav> */}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
        </div>
                
        <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                
                    <div className="widget-content-left">
            
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className="p-0">
                                <AccountCircleIcon style={{height:"42px", color:"white"}} />
                                {
                                //<img width={42} className="rounded-circle" src={avatar1} alt=""/>
                                }
                                <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                            </DropdownToggle>
                            <DropdownMenu right className="rm-pointers dropdown-menu-lg" >
                                <div className="dropdown-menu-header" style={{backgroundColor:"#2f4554"}}>
                                    <div className="dropdown-menu-header-inner " style={{backgroundColor:"#2f4554"}}>
                                        <div className="menu-header-image opacity-2"
                                                style={{
                                                    backgroundColor:"#2f4554"
                                                    //#ff6c1c naranjo
                                                    //backgroundImage: 'url(' + city3 + ')'
                                                }}
                                        />
                                        <div className="menu-header-content text-left">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left mr-3">
                                                    <AccountCircleIcon style={{height:"42px", color:"white"}} />
                                {
                                //<img width={42} className="rounded-circle" src={avatar1} alt=""/>
                                }
                                                                
                                                    </div>
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">
                                                            Admin
                                                        </div>
                                                        <div className="widget-subheading opacity-8">
                                                            Admin
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right mr-2">
                                                        <Button className="btn-pill"
                                                                style={{backgroundColor:"#ff6c1c"}}
                                                                onClick={revent =>  (localStorage.clear(), window.location.href='#/pages/LoginBoxed')}>
                                                            Cerrar sesión

                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                                                        
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                    <div className="widget-content-left  ml-3 header-user-info">
                        <div className="widget-heading">
                            Admin
                        </div>
                        <div className="widget-subheading">
                            Admin
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    </Fragment>
        )
    }


export default UserBox;