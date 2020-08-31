import React, { Component } from "react";
import Circle from "react-circle";
import { Col, Container, Row } from "reactstrap";

export default class CialWidget extends Component {
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
        "Morado",
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
                  progress={((this.props.OE / this.props.OET) * 100).toFixed(0)} // String: Update to change the progress and percentage.
                  progressColor="var(--success)" // String: Color of "progress" portion of circle.
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
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <font color="gray">
                  {this.props.data[6]} hrs /{" "}
                  {this.props.data.reduce((a, b) => a + b, 0).toFixed(1)} hrs
                </font>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
