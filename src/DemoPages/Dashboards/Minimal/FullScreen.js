import React, { useCallback } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button, Col, Container, Form, Input, Table, Row } from "reactstrap";

function FullSceen() {
  const handle = useFullScreenHandle();

  return (
    <div>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle}>
        <div className="fullscreen-space">
          <Row className="fullscreen-nav ">
            agrosuper, 21-12-2020, 15:06
          </Row>
          <Row className="fullscreen-centerSpace ">
            <Col xl="4" className="fullscreen-center1" >
              <Row className="fullscreen-center1-head">
                head
              </Row>
              <Row className="fullscreen-center1-body1">
                body1
              </Row>
              <Row className="fullscreen-center1-body2">
                body2
              </Row>
            </Col>
            <Col>
              <Row className="fullscreen-center2" >
                <Table className="mt-0 ">
                  <thead className="fullscreen-theadBlue">
                    <tr className="text-center">
                      <th className="border1">N° de Orden</th>
                      <th>SKU</th>
                      <th>Producto</th>
                      <th>Cajas</th>
                      <th>Productividad</th>
                      <th>Tiempo</th>
                      <th>Kg Solicitados</th>
                      <th>Kg Producidos</th>
                      <th className="border2">Kg %</th>
                    </tr>
                  </thead>

                  <tbody className="fullscreen-tableBody">
                    {/* vacio */ 0 === 1 ? (
                      <tr className="text-center">
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        <td>---</td>
                        {/* perfil == 1 || perfil */ 2 == 2 ? (
                          <td>---</td>

                        ) : (
                            ""
                          )}


                        ) : (
                            ""
                          )
                      </tr>
                    ) : 1 === 1
              /* ordenes.map((orden, i) =>
                orden.id_sub_orden */ ? (
                          <tr /*onClick={ (e) => verOrden(e, orden.id_sub_orden)}
                    className={orden.id_estado == 1 ? "orangeRow" :
                      select == orden.id_sub_orden ? "grayRow" :
                        "text-center" }*/
                          >
                            <td>2{/* orden.id_sub_orden */}</td>
                            <td>3{/* orden.sku */}</td>
                            <td>4{/* orden.producto */}</td>
                            <td>5{/* formatNumber.new(orden.cajas) */}</td>
                            <td>
                              6 {/* formatNumber.new(_.round(orden.productividad, 2)) + " ham/min" */}
                            </td>
                            <td>7
                            {/* formatNumber.new(_.round(orden.tiempo_estimado, 2)) + " hrs" */}
                            </td>
                            <td>9{/* formatNumber.new(_.round(orden.kg_solicitados)) + " Kg" */}</td>
                            <td>10{/* formatNumber.new(_.round(orden.real_kg)) + " Kg" */}</td>
                            <td>11
                            {/* orden.kg_porcentual == null
                        ? "0 %"
                        : orden.kg_porcentual > 100
                          ? "100%"
                          : formatNumber.new(_.round(orden.kg_porcentual, 2)) + " %" */}
                            </td>

                          </tr>
                        ) : (
                          ""
                        )
                      /* ) */
            /*  ) */}
                  </tbody>
                </Table>
              </Row>
              <Row className="fullscreen-center3">
                <Col xl="9"  >
                  <Row className="fullscreen-center3">
                    <Col xl="4" className="fullscreen-center3-verde1">
                      asd
                    </Col>
                    <Col xl="4" className="fullscreen-center3-verde2">
                      asd
                    </Col>
                    <Col xl="4" className="fullscreen-center3-verde3">
                      asd
                    </Col>
                  </Row>
                </Col>
                <Col xl="3" >
                  <Container className="fullscreen-botMaquina">

                  </Container>
                </Col>

              </Row>

            </Col>

          </Row>
          <Row className="fullscreen-botSpace ">
            <Col xl="2">
              <Container className="fullscreen-botMaquina">

              </Container>
            </Col>
            <Col xl="2">
              <Container className="fullscreen-botMaquina">

              </Container>
            </Col>
            <Col xl="2">
              <Container className="fullscreen-botMaquina">

              </Container>
            </Col>
            <Col xl="2">
              <Container className="fullscreen-botMaquina">

              </Container>
            </Col>
            <Col xl="2">
              <Container className="fullscreen-botMaquina">

              </Container>
            </Col>
            <Col xl="2" >
              <Container className="fullscreen-botMaquina">

              </Container>
            </Col>
          </Row>
        </div>
      </FullScreen>
    </div>
  );
}

export default FullSceen;