
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Circle from "react-circle";
import { Card, Col, Container, Row } from "reactstrap";

const CialWidget = (props) => {

    const [hacumuladas, setHacumuladas] = useState(0)
    const [tActivo, setTActivo] = useState(0)
    const [tInactivo, setTInactivo] = useState(0)
    const [kgacumulados, setKgacumulados] = useState(0)
    const [estado, setEstado] = useState(0)
    const [capacidad, setCapacidad] = useState(0)
    const [kgsolicitados, setKgsolicitados] = useState(0)
    const [hsolicitadas, setHsolicitadas] = useState(0)
    const id_vibot = props.id_vibot

    const [dataTorta, setDataTorta] = useState(
      {
          legend: [
              {
                  display: false,
                  position: "top",
                  fullWidth: true,
                  reverse: true,
              },
          ],
      
          labels: [
              "Desconectado", 
              "Paro sin Justificar",
              "Producción",
          ],
          datasets: [
              {
                  data: [],
                  backgroundColor: [
                      "#d9d9d9",
                      "#F7431E  ",
                      "#2264A7",
                  ],
                  hoverBackgroundColor: [
                      "#d9d9d9",
                      "#F7431E  ",
                      "#2264A7 ",
                  ],
              },
          ],
      }
  )


  const loadResumen = () => {
    fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getresumenmaquina", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        id_vibot: id_vibot,
      }),
    })
      .then(response => response.json())
      .then(result => {
        let data = [];
        if (result[0].tiempo_inactivo == 0 && result[0].tiempo_actividad == 0) {
          data = [1, 0, 0]
        } else {
          data = [0, Math.round(result[0].tiempo_inactivo / 60 * 100) / 100, Math.round(result[0].tiempo_actividad / 60 * 100) / 100]
        }
        setTActivo(result[0].tiempo_actividad)
        setTInactivo(result[0].tiempo_inactivo == 0 ? 1 :result[0].tiempo_inactivo)
        setEstado(result[0].estado)
        setHacumuladas(result[0].hamburguesas_acumuladas)
        setKgacumulados(result[0].real_kg)
        setHsolicitadas(result[0].cajas)
        setKgsolicitados(result[0].kg_solicitados)
        setCapacidad(result[0].kg_hora)
        setDataTorta(
          {
            datasets: [
              {
                data: data
              }
            ],
          }
        )

      }
      )
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    loadResumen()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {

      loadResumen();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Col md="6" xl="3" lg="6" xs="12">
      <Card className="main-card mb-3">
        {/* header */}

        <div className="blackBorder2" >
          <Row>
            <br />
            <Col align="left" md="12">
              <div className="text-uppercase font-weight-bold title1orange mb-3 ml-3">{props.nombre}</div>
            </Col>
          </Row>
        </div >

        <div className="space5px ">
          <Row>
            <br />
            <Col md="6">
              <Row className="mt-4" align="left">

                 <div  className="ml-4 font2gray">{Intl.NumberFormat().format(hacumuladas)}</div>

                  <div  className="ml-2">de {Intl.NumberFormat().format(hsolicitadas)} F.Packs </div>
                  
              </Row>
              <Row className="mb-4" align="left"> 
                  <div  className="ml-4 font2gray">{Intl.NumberFormat().format(kgacumulados)}</div>

                <div align="center" className=" ml-2 mr-auto"> de {Intl.NumberFormat().format(kgsolicitados)} Kgs</div>

              </Row>
            </Col>
            <Col md="6">
              <Row >
                <Col align="right">
                  <div className={estado == 1 ? "font2gray mr-2 " : "font2Blue mr-2"}>{estado == 1 ? " Detenida" : " Produciendo"}</div>
                </Col>
              </Row>
              <Row >
                <Col align="right">
                  <div className="font2Blue mr-2 ">{Math.round(tActivo / 60 * 100) / 100} hrs</div></Col>
              </Row>
              <Row className=" mb-4">
                <Col align="right">
                  <div className="mr-2 ">Tiempo de Actividad</div>
                </Col>
              </Row>
            </Col>
          </Row>


          <Row >
            <Col xs="9" className="ml-5">
              <div className="space5px">
                <Doughnut
                  data={dataTorta}
                  width="10"
                  height="10"
                  align="center"
                  options={{
                    legend: {
                      display: false,
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                    plotOptions: {
                      pie: {
                        donut: {
                          size: '100%'
                        }
                      }
                    }
                  }}
                />
              </div>
            </Col>
          </Row>


          <Container>
            <Row className="blackBorderTop ">

              <Col xs="5" className="ml-4">
                <div className="circle space5px ">
                  <Circle
                    animate={true} // Boolean: Animated/Static progress
                    animationDuration="10s" // String: Length of animation
                    responsive={true} // Boolean: Make SVG adapt to parent size
                    size="50" // String: Defines the size of the circle.
                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                    progress={(
                      (tActivo / (tInactivo + tActivo)) * 100
                    ).toFixed(0)} // String: Update to change the progress and percentage.
                    progressColor="#02c39a" // String: Color of "progress" portion of circle.
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
                </div>
                <div align="center" className="font2 mt-3">Disponibilidad</div>

              </Col>
              <Col xs="5">
                <div className="circle space5px">
                  <Circle
                    animate={true} // Boolean: Animated/Static progress
                    animationDuration="10s" // String: Length of animation
                    responsive={true} // Boolean: Make SVG adapt to parent size
                    size="50" // String: Defines the size of the circle.
                    lineWidth="30" // String: Defines the thickness of the circle's stroke.
                    progress={(
                      (kgacumulados/ (capacidad *((tActivo + tInactivo)/60))) * 100 //(totalKG/capacidad*tiempo que se demoro)
                    ).toFixed(0)} // String: Update to change the progress and percentage.
                    progressColor="#02c39a" // String: Color of "progress" portion of circle.
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
                </div>

                <div align="center" className="font2 mt-3">Eficiencia</div>
              </Col>

            </Row>
          </Container>
        </div>



      </Card>
    </Col>
  );
}
export default CialWidget
