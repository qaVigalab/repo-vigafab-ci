import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Doughnut } from "react-chartjs-2";
import Chart from 'react-apexcharts'

import Circle from "react-circle";
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
        //  "Naranjo",
        //  "Morado",
        "Azul",
        "Amarillo",
        "Rojo",
        "Producción",
    ],
    datasets: [
        {
            data: [2.2, 3, 2, 0.8, 5],
            backgroundColor: [
                "#d9d9d9",
                // "#feb018",
                // "#775dd0",
                "#25a0fc",
                "#ffef45",
                "#ff4560",
                "#2B74BC",
            ],
            hoverBackgroundColor: [
                "#d9d9d9",
                //"#feb018",
                // "#775dd0",
                "#25a0fc",
                "#ffef45",
                "#ff4560",
                "#2B74BC",
            ],
        },
    ],
};


    let options2 = {
        stroke:{
            show: true,
            width: 2,
            curve:'smooth'
        },
        
        chart: {
            id: 'DetalleAvanzadoPorKilo'
        },
        dataLabels: {
            enabled: false,
            
        },
        plotOptions: {
            bar: {
                columnWidth: '95%',
                horizontal: false,
                
            }
        },
        xaxis: {
            categories: [
            '07:00', 
            '08:00', 
            '09:00', 
            '10:00', 
            '11:00', 
            '12:00', 
            '13:00', 
            '14:00',
            '15:00', 
            '16:00', 
            '17:00', 
            '18:00'
            ],
            labels:{
                show:true,
                rotate:-45
            }
        },/*
        yaxis: {
            labels: [
            '00.00', 
            '05.00', 
            '10.00', 
            '15.00', 
            '20.00', 
            '25.00', 
            '30.00', 
            '35.00'
            ],
            labels:{
                show:true,
                rotate:-45
            }
        },*/
        yaxis: {
            title: {
              text: 'Temperature'
            },
            min: 5,
            max: 40
          },
        
    }
    
    let series2 = [{
       
        name: 'T°',
        type: 'line',
        data: [28,13,5,20 ,29, 33, 36, 32, 32,40,38,25, 33]
      }, ]


const Formadora2 = (props) => {
    return (

        <div>

            <div className="blackBorder2" >
                <Row>
                    <br />
                    <Col align="center" md="2">
                        <div className="title1orange">Formadora</div>
                    </Col>

                    <Col md="3"></Col>

                    <Col align="center" md="2">
                        <div className="mt-3">
                            <div className={"indi"} >
                                {props.estado === 1 ? (
                                    <span className="opacity-10 text-success pr-2">
                                        <FontAwesomeIcon icon={faAngleUp} />
                                    </span>
                                ) : (
                                        <span className="opacity-10 text-danger pr-2">
                                            <FontAwesomeIcon icon={faAngleDown} />
                                        </span>
                                    )}{"65"}
                                <small className="opacity-5 pl-1">%</small>
                            </div>
                        </div>{" "}
                    </Col>

                    <Col md="3">
                        <div align="center" className="font2 my-4">3.8 hrs Tiempo de Actividad</div>
                    </Col>
                    <Col md="2">
                        <div align="center" className="font2 my-4 pr-3">Produciendo</div>
                    </Col>

                </Row>
            </div >

            <Row>
                <Col md="3">
                    <div class="noSpace">
                        <div className="blackBorder py-3">
                            <Row >
                                <Col md="5"></Col>
                                <Col md="6">
                                    <Row>
                                        <div align="left" className="indi">600</div>

                                        <div align="center" className=" mt-3 ml-1">Kg</div>
                                    </Row>
                                </Col>

                            </Row>
                        </div>

                        <div className="blackBorder">
                            <Row >

                                <Col md="12">
                                    <div align="center" className="font3 mt-3 ml-3">600</div>
                                    <div align="center" className="font2 mb-3 ml-3">Hamburguesas formadas</div>
                                </Col>

                            </Row>
                        </div>
                        <div className=" blackBorder3">
                            <Row >

                                <Col md="6">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (0.5) *
                                                100
                                            ).toFixed(0)} // String: Update to change the progress and percentage.
                                            progressColor="#D35400" // String: Color of "progress" portion of circle.
                                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                            textColor="#6b778c" // String: Color of percentage text color.
                                            textStyle={{
                                                fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                                            }}
                                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                                            showPercentage={true} // Boolean: Show/hide percentage.
                                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                        />
                                        <div align="center" className="mt-3">Disponibilidad</div>
                                    </div>
                                </Col>

                                <Col md="6">
                                    <div className="circle space5px">
                                        <Circle
                                            animate={true} // Boolean: Animated/Static progress
                                            animationDuration="10s" // String: Length of animation
                                            responsive={true} // Boolean: Make SVG adapt to parent size
                                            size="100" // String: Defines the size of the circle.
                                            lineWidth="30" // String: Defines the thickness of the circle's stroke.
                                            progress={(
                                                (0.5) *
                                                100
                                            ).toFixed(0)} // String: Update to change the progress and percentage.
                                            progressColor="#D35400" // String: Color of "progress" portion of circle.
                                            bgColor="#ecedf0" // String: Color of "empty" portion of circle.
                                            textColor="#6b778c" // String: Color of percentage text color.
                                            textStyle={{
                                                fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                                            }}
                                            percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                                            roundedStroke={true} // Boolean: Rounded/Flat line ends
                                            showPercentage={true} // Boolean: Show/hide percentage.
                                            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                                        />
                                        <div align="center" className="mt-3">Eficiencia</div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="9">
                    <Row>
                        <Col md="4">
                            <div className="centralbodydetail" style={{ paddingBottom: '10px' }}>
                                <Doughnut
                                    data={data}
                                    width="12"
                                    height="12"
                                    align="left"
                                    options={{
                                        legend: {
                                            display: false,
                                        },
                                        responsive: true,
                                        maintainAspectRatio: true,
                                    }} /></div>
                        </Col>
                        <Col md="8">
                            <div className="mt-5 mr-3">
                            <Chart
                                options={options2}
                                series={series2}
                                type="line"
                                width="100%"
                                height="200px"
                            />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className="bot-description">Receta actual: Hamburguesa de Vacuno 100 Grs La Crianza</div>
        </div>
    )
}

export default Formadora2