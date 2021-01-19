import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button, Col, Card, Table, Row } from "reactstrap";
import _ from "lodash";
import moment from 'moment'
import Circle from "react-circle";
import icono1 from "./images/icono1.png";
import icono2 from "./images/icono2.png";
import icono3 from "./images/icono3.png";
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import Brightness1Icon from "@material-ui/icons/Brightness1";


function FullSceen() {
  const handle = useFullScreenHandle();
  const [dataTortaFor, setDataTortaFor] = useState(
    {
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
  const [dataTortaEnv3, setDataTortaEnv3] = useState(
    {
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
  const [dataTortaEnv4, setDataTortaEnv4] = useState(
    {
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
  const [dataTortaEnv5, setDataTortaEnv5] = useState(
    {
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
  const [dataTortaEnv6, setDataTortaEnv6] = useState(
    {
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
  const [dataTortaEmp, setDataTortaEmp] = useState(
    {
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
  const [calidad, setCalidad] = useState(0)
  const [eficiencia, setEficiencia] = useState(0)
  const [disponibilidad, setDisponibilidad] = useState(0)
  const [ordenes, setOrdenes] = useState([]);
  const [IdOrden, setIdOrden] = useState()
  const [CajasSol, setCajasSol] = useState()
  const [HamSol, setHamSol] = useState()
  const [GHam, setGHam] = useState()
  const [HamAcumEmp, setHamAcumEmp] = useState()
  const [HamAcumEnv3, setHamAcumEnv3] = useState()
  const [HamAcumEnv4, setHamAcumEnv4] = useState()
  const [HamAcumEnv5, setHamAcumEnv5] = useState()
  const [HamAcumEnv6, setHamAcumEnv6] = useState()
  const [HamAcumFor, setHamAcumFor] = useState()
  const [KgAcumEmp, setKgAcumEmp] = useState()
  const [KgAcumEnv3, setKgAcumEnv3] = useState()
  const [KgAcumEnv4, setKgAcumEnv4] = useState()
  const [KgAcumEnv5, setKgAcumEnv5] = useState()
  const [KgAcumEnv6, setKgAcumEnv6] = useState()
  const [KgAcumFor, setKgAcumFor] = useState()
  const [KgCaja, setKgCaja] = useState()
  const [KgHora, setKgHora] = useState()
  const [KgSol, setKgSol] = useState()
  const [Producto, setProducto] = useState()
  const [Sku, setSku] = useState()
  const [TaFor, setTaFor] = useState()
  const [TaEnv3, setTaEnv3] = useState()
  const [TaEnv4, setTaEnv4] = useState()
  const [TaEnv5, setTaEnv5] = useState()
  const [TaEnv6, setTaEnv6] = useState()
  const [TaEmp, setTaEmp] = useState()
  const [TiFor, setTiFor] = useState()
  const [TiEnv3, setTiEnv3] = useState()
  const [TiEnv4, setTiEnv4] = useState()
  const [TiEnv5, setTiEnv5] = useState()
  const [TiEnv6, setTiEnv6] = useState()
  const [TiEmp, setTiEmp] = useState()
  const [TaLinea, setTaLinea] = useState()
  const [TiLinea, setTiLinea] = useState()
  const [TempFor, setTempFor] = useState()
  const [ordenFor, setOrdenFor] = useState()
  const [ordenEnv1, setOrdenEnv1] = useState()
  const [ordenEnv2, setOrdenEnv2] = useState()
  const [ordenEnv3, setOrdenEnv3] = useState()
  const [ordenEnv4, setOrdenEnv4] = useState()
  const [ordenEmp, setOrdenEmp] = useState()
  const [TiempoRetencion, setTiempoRetencion] = useState()

  const loadData = () => {
    fetch(global.api.dashboard.getfullscreen, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },
      body: JSON.stringify({
      }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setIdOrden(result[0].id_so)
        setCajasSol(result[0].cajas_sol)
        setHamSol(result[0].h_sol)
        setGHam(result[0].g_ham)
        setHamAcumEmp(result[0].h_acum_emp)
        setHamAcumEnv3(result[0].h_acum_env3)
        setHamAcumEnv4(result[0].h_acum_env4)
        setHamAcumEnv5(result[0].h_acum_env5)
        setHamAcumEnv6(result[0].h_acum_env6)
        setHamAcumFor(result[0].h_acum_for)
        setKgAcumEmp(result[0].kg_acum_emp)
        setKgAcumEnv3(result[0].kg_acum_env3)
        setKgAcumEnv4(result[0].kg_acum_env4)
        setKgAcumEnv5(result[0].kg_acum_env5)
        setKgAcumEnv6(result[0].kg_acum_env6)
        setKgAcumFor(result[0].kg_acum_for)
        setKgCaja(result[0].kg_caja)
        setKgHora(result[0].kg_hora)
        setKgSol(result[0].kg_sol)
        setProducto(result[0].producto)
        setSku(result[0].sku)
        setTaFor(result[0].ta_for)
        setTaEnv3(result[0].ta_env3)
        setTaEnv4(result[0].ta_env4)
        setTaEnv5(result[0].ta_env5)
        setTaEnv6(result[0].ta_env6)
        setTaEmp(result[0].ta_emp)
        setTiFor(result[0].ti_for)
        setTiEnv3(result[0].ti_env3)
        setTiEnv4(result[0].ti_env4)
        setTiEnv5(result[0].ti_env5)
        setTiEnv6(result[0].ti_env6)
        setTiEmp(result[0].ti_emp)
        setTaLinea(result[0].ta_linea)
        setTiLinea(result[0].ti_linea)
        setTempFor(result[0].temp_for)
        setOrdenFor(result[0].ordenfor)
        setOrdenEnv1(result[0].ordenenv1)
        setOrdenEnv2(result[0].ordenenv2)
        setOrdenEnv3(result[0].ordenenv3)
        setOrdenEnv4(result[0].ordenenv4)
        setOrdenEmp(result[0].ordenemp)
        setTiempoRetencion(result[0].tiempo_retencion)
        setCalidad((result[0].h_acum_emp * result[0].kg_caja) / result[0].kg_acum_for)
        setEficiencia((result[0].kg_acum_emp / (result[0].kg_hora * (result[0].ta_linea) / 60)))
        setDisponibilidad((result[0].ta_linea / (result[0].ti_linea + result[0].ta_linea)))

        setDataTortaFor({
          datasets: [
            {
              data: [0, result[0].ti_for, result[0].ta_for],
            },
          ],
        })
        setDataTortaEnv3({
          datasets: [
            {
              data: [0, result[0].ti_env3, result[0].ta_env3],
            },
          ],
        })
        setDataTortaEnv4({
          datasets: [
            {
              data: [0, result[0].ti_env4, result[0].ta_env4],
            },
          ],
        })
        setDataTortaEnv5({
          datasets: [
            {
              data: [0, result[0].ti_env5, result[0].ta_env5],
            },
          ],
        })
        setDataTortaEnv6({
          datasets: [
            {
              data: [0, result[0].ti_env6, result[0].ta_env6],
            },
          ],
        })
        setDataTortaEmp({
          datasets: [
            {
              data: [0, result[0].ti_emp, result[0].ta_emp],
            },
          ],
        })
      }
      )
      .catch(err => {
        console.error(err);
      });
  }

  var formatNumber = {
    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
      num += '';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
      }
      return this.simbol + splitLeft + splitRight;
    },
    new: function (num, simbol) {
      this.simbol = simbol || '';
      return this.formatear(num);
    }
  }
  const formatHour = (min) => {
    let horas = min / 60;
    horas = Math.trunc(horas)
    let minutos = min - (60 * horas)
    return horas === 0 ? minutos + " Min" : horas + " Hrs " + minutos + " Min"
  }

  const loadOrdenes = () => {
    fetch(global.api.dashboard.getordenes, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
      },
      body: JSON.stringify({
        fecha: localStorage.getItem("fechaFinal"),
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setOrdenes(result);

      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadOrdenes();
    loadData();

    const interval = setInterval(() => {
      loadOrdenes();
      loadData();
      console.log("recargando")
    }, 600000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    loadOrdenes();
    loadData();
    const interval = setInterval(() => {
      loadOrdenes();
      loadData();
      console.log("recargando")
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Button onClick={handle.enter}>
        Ver Fullscreen
      </Button>
      <FullScreen handle={handle} >
        <div className={handle.active ? "fullscreen-space" : "fullscreen-space d-none"} >
          <Row className="fullscreen-nav">
            <Col>
              <div className="app-header__logo2 ">
                <div className="logo-src2"
                  style={{
                    backgroundImage: `url(${localStorage.getItem("img")}) `
                  }}
                />
              </div>
            </Col>
            <Col className="bigFont2 mt-4 mr-5" align="right">
              {moment().format('DD-MM-YYYY')}

              <WatchLaterOutlinedIcon style={{ fontSize: 30 }} className="mb-1 ml-4 mr-1" />
              {moment().format("HH:mm")}
            </Col>
          </Row>
          <Row className="fullscreen-centerSpace">
            <Col xl="4" className="fullscreen-center1" >
              <Row className="fullscreen-center1-head p-3">
                <Col xl="3" className="font1 mt-3 ">
                  N° {IdOrden}
                </Col>
                <Col className="font1 mt-3">
                  {Producto}
                </Col>
              </Row>
              <Row className="fullscreen-center1-body1">
                <Col xl="4">
                  <div align="center" className="bigFont3 mt-4">{formatNumber.new(_.round(KgAcumEmp * 100 / KgSol, 2))}%</div>
                  <div align="center" className="littleFont2">de Produccion en  Linea</div>
                </Col>
                <Col xl="4">
                  <div align="center" className="bigFont3 mt-4">{formatNumber.new(_.round(HamAcumEmp / (TaLinea + TiLinea), 2))}</div>
                  <div align="center" className="littleFont2">Caj/min Productividad</div>
                </Col>
                <Col xl="4">
                  <div align="center" className="bigFont3 mt-4"> {formatNumber.new(_.round((TaLinea + TiLinea) / 60, 2))} </div>
                  <div align="center" className="littleFont2">Horas de Produccion</div>
                </Col>
              </Row>
              <Row className="fullscreen-center1-body2 pt-3 pb-3">
                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(
                        disponibilidad > 1 ? 100 : disponibilidad * 100
                      ).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#fff" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">Disponibilidad</div>
                  </div>
                </Col>
                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(
                        eficiencia > 1 ? 100 : eficiencia * 100 //(totalKG/capacidad*tiempo que se demoro)
                      ).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#FFF" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">Eficiencia</div>
                  </div>
                </Col>
                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(
                        calidad > 1 ? 100 : calidad * 100
                      ).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#FFF" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">Calidad</div>
                  </div>
                </Col>
                <Col md="3">
                  <div className="circle">
                    <Circle
                      animate={true} // Boolean: Animated/Static progress
                      animationDuration="3s" // String: Length of animation
                      responsive={true} // Boolean: Make SVG adapt to parent size
                      size="100" // String: Defines the size of the circle.
                      lineWidth="30" // String: Defines the thickness of the circle's stroke.
                      progress={(
                        ((eficiencia > 1 ? 1 : eficiencia) * (disponibilidad > 1 ? 1 : disponibilidad) * (calidad > 1 ? 1 : calidad)) * 100
                      ).toFixed(0)} // String: Update to change the progress and percentage.
                      progressColor="#02c39a" // String: Color of "progress" portion of circle.
                      bgColor="#a4a4a4" // String: Color of "empty" portion of circle.
                      textColor="#FFF" // String: Color of percentage text color.
                      textStyle={{
                        fontSize: "5rem", // CSSProperties: Custom styling for percentage.
                      }}
                      percentSpacing={5} // Number: Adjust spacing of "%" symbol and number.
                      roundedStroke={true} // Boolean: Rounded/Flat line ends
                      showPercentage={true} // Boolean: Show/hide percentage.
                      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                    />
                    <div align="center" className="mt-2">OEE</div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Card className="fullscreen-center2" >
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

                  <tbody>
                    {

                      ordenes.map((orden, i) =>
                        orden.id_sub_orden ? (

                          <tr key={i}
                            className={orden.id_estado == 1 ? "orangeRow" :
                              "text-center"}
                          >
                            <td>{orden.id_sub_orden}</td>
                            <td>{orden.sku}</td>
                            <td>{orden.producto}</td>
                            <td>{formatNumber.new(orden.cajas)}</td>
                            <td>
                              {orden.id_estado == 1 ? formatNumber.new(_.round(HamAcumEmp / (TaLinea + TiLinea), 2)) + " Caj/min" : formatNumber.new(_.round(orden.productividad, 2)) + " Caj/min"}
                            </td>
                            <td>
                              {formatNumber.new(_.round(orden.tiempo_estimado, 2)) + " hrs"}
                            </td>
                            <td>{formatNumber.new(_.round(orden.kg_solicitados)) + " Kg"}</td>
                            <td>{formatNumber.new(_.round(orden.real_kg)) + " Kg"}</td>
                            <td>
                              {orden.kg_porcentual == null
                                ? "0 %"
                                : orden.kg_porcentual > 100
                                  ? "100%"
                                  : formatNumber.new(_.round(orden.kg_porcentual, 2)) + " %"}
                            </td>

                          </tr>
                        ) : (
                            ""
                          )
                      )
                    }


                  </tbody>
                </Table>
              </Card>
              <Row className="fullscreen-center3">
                <Col xl="3" className="fullscreen-center3-verde1 pr-0">
                  <Row className="mx-4 px-4 mt-2 ">
                    <div className="ml-3">
                      <img src={icono1} className="" alt="Empaque" width="120%" height="110%" />
                    </div>
                  </Row>
                  <div align="center" className="bigFont">{formatNumber.new(KgAcumFor)}</div>
                  <div align="center" className="littleFont">de {formatNumber.new(KgSol)} Kgs</div>


                </Col>
                <Col xl="3" className="fullscreen-center3-verde2">
                  <Row className="mx-4 px-4 mt-2">
                    <div className="text-white ml-3" >
                      <img src={icono2} className="" alt="Empaque" width="120%" height="110%" />
                    </div>
                  </Row>
                  <div align="center" className="bigFont">{formatNumber.new(HamAcumEnv3 + HamAcumEnv4 + HamAcumEnv5 + HamAcumEnv6)}</div>
                  <div align="center" className="littleFont">de {formatNumber.new(HamSol)} F. Pack</div>


                </Col>
                <Col xl="3" className="fullscreen-center3-verde3 ">
                  <Row className="mx-4 px-4 mt-2">
                    <div className="ml-3">
                      <img src={icono3} className="" alt="Empaque" width="120%" height="110%" />
                    </div>
                  </Row>
                  <div align="center" className="bigFont">{formatNumber.new(HamAcumEmp)}</div>
                  <div align="center" className="littleFont">de {formatNumber.new(CajasSol)} Cajas</div>


                </Col>
                <Col xl="3" className="">
                  <Card className="p-0 fullscreen-centerMaquina">
                    <div align="center" className="text-uppercase font-weight-bold title1orange2 mr-2 mt-2">Iqf</div>

                    <div align="center" className="bigFontGreen">{formatNumber.new(_.round(TempFor, 2))}°C</div>
                    <div align="center" className="littleFontGreen mb-2">Temp. Entrada</div>
                    <div align="center" className="bigFontGreen blackBorderTop pt-2">{/* formatNumber.new(_.round(TiempoRetencion, 2)) */ TiempoRetencion} Min</div>
                    <div align="center" className="littleFontGreen mb-2">Tiempo Retencion</div>

                  </Card>
                </Col>

              </Row>

            </Col>

          </Row>
          <Row className="fullscreen-botSpace ">
            <Col xl="2">
              <Card className=" main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb- mr-2 mt-2">Formadora</div>
                <Doughnut
                  data={dataTortaFor}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: {
                      display: true,
                      position: "buttom",
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TaFor)}
                </Row>
                <Row className="ml-2 mb-3">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiFor)}
                </Row>

                {/*             <Row className="ml-2">
                  Desconectado: 3 Hrs
                </Row> */}
                <div className=" fullscreen-botMaquina-bot pl-2 pt-2">{"Orden: " + ordenFor}</div>
              </Card>
            </Col>
            <Col xl="2">
              <Card className="main-card fullscreen-botMaquina ">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 3</div>

                <Doughnut
                  data={dataTortaEnv3}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: {
                      display: true,
                      position: "buttom",
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TaEnv3)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiEnv3)}
                </Row>
                {/*                 <Row className="ml-2">
                  Desconectado: 3 Hrs
                </Row> */}
                <div className="fullscreen-botMaquina-bot pl-2 pt-2 ">{"Orden: " + ordenEnv1}</div>
              </Card>
            </Col>
            <Col xl="2">
              <Card className=" main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 4</div>

                <Doughnut
                  data={dataTortaEnv4}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: {
                      display: true,
                      position: "buttom",
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TaEnv4)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiEnv4)}
                </Row>
                {/*                 <Row className="ml-2">
                  Desconectado: 3 Hrs
                </Row> */}
                <div className=" fullscreen-botMaquina-bot pl-2 pt-2">{"Orden: " + ordenEnv2}</div>
              </Card>
            </Col>
            <Col xl="2">
              <Card className="main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 5</div>

                <Doughnut
                  data={dataTortaEnv5}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: {
                      display: true,
                      position: "buttom",
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TaEnv5)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiEnv5)}
                </Row>
                {/*                 <Row className="ml-2">
                  Desconectado: 3 Hrs
                </Row> */}
                <div className=" fullscreen-botMaquina-bot pl-2 pt-2">{"Orden: " + ordenEnv3}</div>
              </Card>
            </Col>
            <Col xl="2">
              <Card className="main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Envasadora 6</div>
                <Doughnut
                  data={dataTortaEnv6}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: {
                      display: true,
                      position: "buttom",
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TaEnv6)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiEnv6)}
                </Row>
                {/*                 <Row className="ml-2">
                  Desconectado: 3 Hrs
                </Row> */}
                <div className=" fullscreen-botMaquina-bot pl-2 pt-2">{"Orden: " + ordenEnv4}</div>
              </Card>
            </Col>
            <Col xl="2" >
              <Card className="main-card fullscreen-botMaquina">
                <div align="center" className="text-uppercase font-weight-bold title1orange2 mb-3 mr-2 mt-2">Empaque</div>

                <Doughnut
                  data={dataTortaEmp}
                  width="12"
                  height="8  "
                  align="center"
                  options={{
                    legend: {
                      display: true,
                      position: "buttom",
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
                <Row className="ml-2 mt-2">
                  <Brightness1Icon style={{ color: "#2264A7" }} />
                  Produciendo: {formatHour(TaEmp)}
                </Row>
                <Row className="ml-2">
                  <Brightness1Icon style={{ color: "#F7431E" }} />
                  En Paro: {formatHour(TiEmp)}
                </Row>
                {/*                 <Row className="ml-2">
                  Desconectado: 3 Hrs
                </Row> */}
                <div className="fullscreen-botMaquina-bot pl-2 pt-2 ">{"Orden: " + ordenEmp}</div>
              </Card>
            </Col>
          </Row>
        </div>
      </FullScreen>
    </div>
  );
}

export default FullSceen;