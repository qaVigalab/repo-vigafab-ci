import Brightness1Icon from '@material-ui/icons/Brightness1';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row, Table, Button } from "reactstrap";
import './style.css';
import { Link } from 'react-router-dom';
export default class DetalleHorno extends Component {
  render() {
    let data = {
      legend: [
        {
          display: false,
          position: "top",
          fullWidth: true,
          reverse: true,
        },
      ],
      
      labels: [
        "Inactivo",
        "Naranjo",
        "Microparo",
        "Azul",
        "Amarillo",
        "Rojo",
        "Producción",
      ],
      datasets: [
        {
          data: this.props.data,
          backgroundColor: [
            "#d9d9d9",
            "#feb018",
            "#775dd0",
            "#25a0fc",
            "#ffef45",
            "#ff4560",
            "#31cc54",
          ],
          hoverBackgroundColor: [
            "#d9d9d9",
            "#feb018",
            "#775dd0",
            "#25a0fc",
            "#ffef45",
            "#ff4560",
            "#31cc54",
          ],
        },
      ],
    };
    
      return (
        <Col md="12" xl="12" lg="12" xs="12">
          <Card className="main-card mb-3" style={{height:'210px'}}>
              <div className="centralbody2">
              <Container>
                  <Row>
                    <Col xs="2" style={{paddingTop:'50px'}}>
                        {this.props.hora} <br />
                        {this.props.producto===true?
                          <Link to='DetalleAvanzado'>
                            Ver detalle
                          </Link>
                          :
                          ""
                        }
                        
                    </Col>
                    <Col xs="2">
                      <div >
                        <Doughnut
                          data={data}
                          width="120"
                          height="120"
                          align="left"
                          options={{
                            legend: {
                              display: false,
                            },
                            responsive: false,
                            maintainAspectRatio: true,
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs="2">
                      {/* <div className="Kg">{this.props.OE} Kg</div> */}
                      <div className="circle">
                        <Circle
                          animate={true} // Boolean: Animated/Static progress
                          animationDuration="10s" // String: Length of animation
                          responsive={false} // Boolean: Make SVG adapt to parent size
                          size="120" // String: Defines the size of the circle.
                          lineWidth="30" // String: Defines the thickness of the circle's stroke.
                          progress={(
                            (this.props.TA / this.props.TAT) *
                            100
                          ).toFixed(0)} // String: Update to change the progress and percentage.
                          progressColor="var(--primary)" // String: Color of "progress" portion of circle.
                          bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                          textColor="#6b778c" // String: Color of percentage text color.
                          textStyle={{
                            fontSize: "6rem", // CSSProperties: Custom styling for percentage.
                          }}
                          percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                          roundedStroke={true} // Boolean: Rounded/Flat line ends
                          showPercentage={true} // Boolean: Show/hide percentage.
                          showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                        />
                      </div>
                     {/*  <div className="OE">OEE</div> */}
                     {/*  <div className="kgpor">
                        {this.props.OE}/{this.props.OET} Kg
                      </div> */}
                    </Col>
                    <Col xs="6">
                        {/* 
                        "#d9d9d9",
                        "#feb018",
                        "#775dd0",
                        "#25a0fc",
                        "#ffef45",
                        "#ff4560",
                        "#31cc54", 
                        */}
                        <Table size="sm">
                            <tbody>
                                <tr>
                                    <td>
                                        <Brightness1Icon 
                                        style={{color:'#31cc54'}} 
                                        />Produciendo
                                    </td>
                                    <td>
                                        {this.props.TA}
                                    </td>
                                    <td>
                                        razon
                                    </td>
                                    <td >
                                        <ChatBubbleIcon 
                                        style={{color:"#d9d9d9"}}
                                        
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Brightness1Icon 
                                        style={{color:'#ff4560'}} 
                                        />Paro
                                    </td>
                                    <td>
                                        {this.props.TA}
                                    </td>
                                    <td>
                                        razon
                                    </td>
                                    <td >
                                        <ChatBubbleIcon 
                                        style={{color:"#25a0fc"}}
                                        
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Brightness1Icon 
                                        style={{color:'#feb018'}} 
                                        />Paro
                                    </td>
                                    <td>
                                        {this.props.TA}
                                    </td>
                                    <td>
                                        razon
                                    </td>
                                    <td >
                                        <ChatBubbleIcon 
                                        style={{color:"#25a0fc"}}
                                        
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Brightness1Icon 
                                        style={{color:'#25a0fc'}} 
                                        />Paro
                                    </td>
                                    <td>
                                        {this.props.TA}
                                    </td>
                                    <td>
                                        razon
                                    </td>
                                    <td >
                                        <ChatBubbleIcon 
                                        style={{color:"#d9d9d9"}}
                                        
                                            />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Brightness1Icon 
                                        style={{color:'#775dd0'}} 
                                        />Microparo
                                    </td>
                                    <td>
                                        {this.props.TA}
                                    </td>
                                    <td>
                                        razon
                                    </td>
                                    <td >
                                        <ChatBubbleIcon 
                                        style={{color:"#d9d9d9"}}
                                        
                                            />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                  </Row>
                </Container>
                
              </div>
            
              <div style={{ padding: "11px" }} />
           
           
            {this.props.modo === 2 || this.props.modo === 4 ? (
              <div className="bot-description">{this.props.descripcion}</div>
            ) : this.props.modo === 1 || this.props.modo === 3 ? (
              <div style={{ padding: "10px" }} />
            ) : (
              ""
            )}
          </Card>
        </Col>
      );
  }
}
