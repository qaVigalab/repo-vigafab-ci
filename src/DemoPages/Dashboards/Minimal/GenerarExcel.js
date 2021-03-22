
import React, { useEffect, useState } from "react";
import { Col, Row, Label, Spinner, Alert, Button } from "reactstrap";

import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import _ from "lodash";
import moment from 'moment';
import { Preview } from 'react-html2pdf';
import { jsPDF } from "jspdf";
import agrosuper from './images/logo-agrosuper.png';
import vigalab from './images/logo-vigalab.png';
import ParetoChart from 'pareto-chart';
import html2canvas from 'html2canvas';

const GenerarExcel = (props) => {
  const [ordenes, setOrdenes] = useState([]);
  const [paros, setParos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(new Date(moment().add(-6, 'days').format('YYYY-MM-DD')));
  const [endDate, setEndDate] = useState(new Date(moment().add(0, 'days').format('YYYY-MM-DD')));
  const [titulos, setTitulos] = useState(["FORMADORA", "ENVASADORA 6", "ENVASADORA 5", "ENVASADORA 4", "EMPAQUETADORA"]);

  const handleChange3 = (date) =>{
    if (date > new Date(moment().add(-6, 'days').format('YYYY-MM-DD'))){
      setDateError(true);
      setDateErrorMsg("No es posible seleccionar una fecha de inicio dentro de los últimos 7 días.");
  
      setTimeout(() => {
        setDateError(false);
      }, 3000);
    } else {
      setStartDate(date);
      setEndDate(new Date(moment(date).add(7, 'days').format('YYYY-MM-DD')));
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  const loadOrdenes = () => {
    let link = global.api.dashboard.Agrosuper_excel_ordenes;
    fetch(link, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        fecha_inicio: moment(startDate).format('YYYY-MM-DD'),
        fecha_termino: moment(endDate).format('YYYY-MM-DD')
      }),
    })
    .then(response => response.json())
    .then(result => {
      setOrdenes(result)
    })
    .catch(err => {
      console.error(err);
    });
  }

  const loadParos = () => {
    let link =  global.api.dashboard.agrosuper_excel_paros;
    fetch(link, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        fecha_inicio: moment(startDate).format('YYYY-MM-DD'),
        fecha_termino: moment(endDate).format('YYYY-MM-DD')
      }),
    })
    .then(response => response.json())
    .then(result => {
      setParos(result)
    })
    .catch(err => {
      console.error(err);
    });
  }

  const loadData = () => {
    setLoading(true);
    loadParos();
  };

  useEffect(() => {
    if (paros.length > 0)
      loadOrdenes();
  }, [paros]);

  /* Construcción del objeto que contiene los valores que se registrarán en el reporte */
  const [indicadores, setIndicadores] = useState({});
  const [cantParos, setCantParos] = useState({});
  const [minPerdidos, setMinPerdidos] = useState({});
  const [detenciones, setDetenciones] = useState({});

  useEffect(() => {
    if (ordenes.length > 0){
      /* Se obtiene la cantidad los paros y minutos perdidos para cada Máquina */
      var PPM = {};
      for (var i=0; i<paros.length; i++){
        if (paros[i].fecha.split("T")[0] in PPM){
          if (paros[i].maquina in PPM[paros[i].fecha.split("T")[0]]){
            PPM[paros[i].fecha.split("T")[0]][paros[i].maquina].cantParos += paros[i].cant_paros;
            PPM[paros[i].fecha.split("T")[0]][paros[i].maquina].minPerdidos += paros[i].min_perdidos;
          } else{
            PPM[paros[i].fecha.split("T")[0]][paros[i].maquina] = {
              cantParos: paros[i].cant_paros,
              minPerdidos: paros[i].min_perdidos,
            }
          }
        } else{
          PPM[paros[i].fecha.split("T")[0]] = {};
          PPM[paros[i].fecha.split("T")[0]][paros[i].maquina] = {
            cantParos: paros[i].cant_paros,
            minPerdidos: paros[i].min_perdidos,
          }
        }
      }

      /* Se obtienen los indicadores de Disponibilidad, Eficiencia, Kg Producidos, Kg Solicitados y % de Cumplimiento para cada Máquina */
      var Indicadores = {}
      for (i=0; i<ordenes.length; i++){
        var fecha = ordenes[i].fecha.split("T")[0];
        if (fecha in Indicadores){
          if (ordenes[i].maquina in Indicadores[fecha]){
            Indicadores[fecha][ordenes[i].maquina][ordenes[i].sub_orden] = {
              kgProd: ordenes[i].kg_prod,
              kgSolic: ordenes[i].kg_solic,
              
              eficiencia: ordenes[i].eficiencia,
              disponibilidad: ordenes[i].disponibilidad
            };

            Indicadores[fecha][ordenes[i].maquina]["Total"].kgProdTotal += ordenes[i].kg_prod;
            Indicadores[fecha][ordenes[i].maquina]["Total"].kgSolicTotal += ordenes[i].kg_solic;
            Indicadores[fecha][ordenes[i].maquina]["Total"].kgCamara += ordenes[i].reproceso_camara;
          } else{
            Indicadores[fecha][ordenes[i].maquina] = {};
            Indicadores[fecha][ordenes[i].maquina][ordenes[i].sub_orden] = {
              kgProd: ordenes[i].kg_prod,
              kgSolic: ordenes[i].kg_solic,
              
              eficiencia: ordenes[i].eficiencia,
              disponibilidad: ordenes[i].disponibilidad
            };
  
            Indicadores[fecha][ordenes[i].maquina]["Total"] = {
              kgProdTotal: ordenes[i].kg_prod,
              kgSolicTotal: ordenes[i].kg_solic,
              kgCamara: ordenes[i].reproceso_camara,
  
              cantParos: 0,
              minPerdidos: 0,
  
              disponibilidad: 0,
              eficiencia: 0
            };
          }
        } else{
          Indicadores[fecha] = {};
          Indicadores[fecha][ordenes[i].maquina] = {};
          Indicadores[fecha][ordenes[i].maquina][ordenes[i].sub_orden] = {
            kgProd: ordenes[i].kg_prod,
            kgSolic: ordenes[i].kg_solic,
            
            eficiencia: ordenes[i].eficiencia,
            disponibilidad: ordenes[i].disponibilidad
          };

          Indicadores[fecha][ordenes[i].maquina]["Total"] = {
            kgProdTotal: ordenes[i].kg_prod,
            kgSolicTotal: ordenes[i].kg_solic,
            kgCamara: ordenes[i].reproceso_camara,

            cantParos: 0,
            minPerdidos: 0,

            disponibilidad: 0,
            eficiencia: 0
          };
        }
      }

      /* Se restan los kg que fueron formados dos veces producto de los reprocesos a Mezcladora */
      for (i=0; i<ordenes.length; i++){
        var fecha = ordenes[i].fecha.split("T")[0];
        if (ordenes[i].maquina === "Formadora"){
          Indicadores[fecha]["Formadora"][ordenes[i].sub_orden].kgProd -= ordenes[i].reproceso_mezc;
          Indicadores[fecha]["Formadora"]["Total"].kgProdTotal -= ordenes[i].reproceso_mezc;
        } else if (ordenes[i].maquina.includes("Envasadora")){
          Indicadores[fecha]["Formadora"][ordenes[i].sub_orden].kgProd -= ordenes[i].reproceso_mezc;
          Indicadores[fecha]["Formadora"]["Total"].kgProdTotal -= ordenes[i].reproceso_mezc;

          Indicadores[fecha][ordenes[i].maquina][ordenes[i].sub_orden].kgProd -= ordenes[i].reproceso_mezc;
          Indicadores[fecha][ordenes[i].maquina]["Total"].kgProdTotal -= ordenes[i].reproceso_mezc;
        }
      }

      /* Se calculan la disponibilidad y eficiencia para cada día, según el "peso" de cada SKU */
      Object.keys(Indicadores).map((fecha, i) => {
        Object.keys(Indicadores[fecha]).map((maq, j) => {
          Object.keys(Indicadores[fecha][maq]).map((sub_ord, k) => {
            if (sub_ord !== "Total"){
              Indicadores[fecha][maq]["Total"].disponibilidad += Indicadores[fecha][maq][sub_ord].disponibilidad * Indicadores[fecha][maq][sub_ord].kgProd / Indicadores[fecha][maq]["Total"].kgProdTotal;
              Indicadores[fecha][maq]["Total"].eficiencia += Indicadores[fecha][maq][sub_ord].eficiencia * Indicadores[fecha][maq][sub_ord].kgProd / Indicadores[fecha][maq]["Total"].kgProdTotal;
            }
          });

          Indicadores[fecha][maq]["Total"].disponibilidad = _.round(Indicadores[fecha][maq]["Total"].disponibilidad, 2);
          Indicadores[fecha][maq]["Total"].eficiencia = _.round(Indicadores[fecha][maq]["Total"].eficiencia, 2);
        });
      });

      /* Se agregan los paros justificados y la cantidad de minutos totales asociados a éstos */
      Object.keys(Indicadores).map((fecha, i) => {
        Object.keys(Indicadores[fecha]).map((maq, j) => {
          if (PPM[fecha][maq] != undefined){
            Indicadores[fecha][maq]["Total"].cantParos = PPM[fecha][maq].cantParos;
            Indicadores[fecha][maq]["Total"].minPerdidos = PPM[fecha][maq].minPerdidos;
          } else{
            Indicadores[fecha][maq]["Total"].cantParos = 0;
            Indicadores[fecha][maq]["Total"].minPerdidos = 0;
          }

          if (maq.includes("Envasadora"))
            Indicadores[fecha][maq]["Total"].cumplimiento = _.round(Indicadores[fecha][maq]["Total"].kgProdTotal/(Indicadores[fecha][maq]["Total"].kgSolicTotal/3), 2);
          else
            Indicadores[fecha][maq]["Total"].cumplimiento = _.round(Indicadores[fecha][maq]["Total"].kgProdTotal/Indicadores[fecha][maq]["Total"].kgSolicTotal, 2);
        });
      });

      /* Se calculan los indicadores de Disponibilidad, Calidad y Eficiencia para la OEE */
      Object.keys(Indicadores).map((fecha, i) => {
        Indicadores[fecha]["OEE"] = {};
        Indicadores[fecha]["OEE"].disponibilidad = _.round(Indicadores[fecha]["Formadora"]["Total"].disponibilidad, 2);
        Indicadores[fecha]["OEE"].eficiencia = _.round(Indicadores[fecha]["Formadora"]["Total"].eficiencia, 2);
        Indicadores[fecha]["OEE"].calidad = _.round(Indicadores[fecha]["Empaquetadora"]["Total"].kgProdTotal/Indicadores[fecha]["Formadora"]["Total"].kgProdTotal, 2);
        
        Indicadores[fecha]["OEE"].OEE = _.round(Indicadores[fecha]["OEE"].disponibilidad * Indicadores[fecha]["OEE"].eficiencia * Indicadores[fecha]["OEE"].calidad, 2);
        Indicadores[fecha]["Formadora"]["Total"].formado = (
          Indicadores[fecha]["Formadora"]["Total"].kgProdTotal - 
          Indicadores[fecha]["Envasadora 4"]["Total"].kgProdTotal - 
          Indicadores[fecha]["Envasadora 5"]["Total"].kgProdTotal - 
          Indicadores[fecha]["Envasadora 6"]["Total"].kgProdTotal
        ) - (
          Indicadores[fecha]["Formadora"]["Total"].kgCamara + 
          Indicadores[fecha]["Envasadora 4"]["Total"].kgCamara + 
          Indicadores[fecha]["Envasadora 5"]["Total"].kgCamara + 
          Indicadores[fecha]["Envasadora 6"]["Total"].kgCamara
        );

        Indicadores[fecha]["Empaquetadora"]["Total"].deformes = (
          Indicadores[fecha]["Envasadora 4"]["Total"].kgProdTotal + 
          Indicadores[fecha]["Envasadora 5"]["Total"].kgProdTotal + 
          Indicadores[fecha]["Envasadora 6"]["Total"].kgProdTotal
        ) - (
          Indicadores[fecha]["Envasadora 4"]["Total"].kgCamara + 
          Indicadores[fecha]["Envasadora 5"]["Total"].kgCamara + 
          Indicadores[fecha]["Envasadora 6"]["Total"].kgCamara
        ) - Indicadores[fecha]["Empaquetadora"]["Total"].kgProdTotal;
      });

      /* Se calculan los indicadores porcentuales para la semana completa */
      Indicadores["Semana"] = {};
      Object.keys(Indicadores).map((fecha, i) => {
        if (fecha !== "Semana"){
          Object.keys(Indicadores[fecha]).map((maq, j) => {
            if (maq in Indicadores["Semana"]){
              if (maq === "OEE"){
                Indicadores["Semana"][maq].disponibilidad += Indicadores[fecha][maq].disponibilidad;
                Indicadores["Semana"][maq].eficiencia += Indicadores[fecha][maq].eficiencia;
                Indicadores["Semana"][maq].calidad += Indicadores[fecha][maq].calidad;
                Indicadores["Semana"][maq].OEE += Indicadores[fecha][maq].OEE;
              } else{
                Indicadores["Semana"][maq]["Total"].disponibilidad += Indicadores[fecha][maq]["Total"].disponibilidad;
                Indicadores["Semana"][maq]["Total"].eficiencia += Indicadores[fecha][maq]["Total"].eficiencia;
              }
            } else{
              if (maq === "OEE"){
                Indicadores["Semana"][maq] = {};
                Indicadores["Semana"][maq] = {
                  disponibilidad: Indicadores[fecha][maq].disponibilidad,
                  eficiencia: Indicadores[fecha][maq].eficiencia,
                  calidad: Indicadores[fecha][maq].calidad,
                  OEE: Indicadores[fecha][maq].OEE
                };
              } else{
                Indicadores["Semana"][maq] = {};
                Indicadores["Semana"][maq]["Total"] = {
                  disponibilidad: Indicadores[fecha][maq]["Total"].disponibilidad,
                  eficiencia: Indicadores[fecha][maq]["Total"].eficiencia
                };
              }
            }
          });
        }
      });

      Object.keys(Indicadores["Semana"]).map((maq, i) => {
        if (maq === "OEE"){
          Object.keys(Indicadores["Semana"][maq]).map((indicador, i) => {
              Indicadores["Semana"][maq][indicador] = _.round(Indicadores["Semana"][maq][indicador]/(Object.keys(Indicadores).length-1), 2);
          });
        } else{
          Object.keys(Indicadores["Semana"][maq]["Total"]).map((indicador, i) => {
            Indicadores["Semana"][maq]["Total"][indicador] = _.round(Indicadores["Semana"][maq]["Total"][indicador]/(Object.keys(Indicadores).length-1), 2);
          });
        }
      });

      /* Se obtiene la cantidad total de Paros y Minutos Perdidos según Categoría y Máquinas */
      var justifCantParos = {}, justifCantMinutos = {}, tiempoDetMaq = {};
      for (var i=0; i<paros.length; i++){
        if (["Operativo", "Cambio de formato", "Desmonte del film", "Mantenimiento"].includes(paros[i].paro)){
          if (paros[i].paro in justifCantParos){
            justifCantParos[paros[i].paro].cantParos += paros[i].cant_paros;
            justifCantMinutos[paros[i].paro].minPerdidos += paros[i].min_perdidos;
          } else{
            justifCantParos[paros[i].paro] = {
              nombre: paros[i].paro,
              cantParos: paros[i].cant_paros
            };

            justifCantMinutos[paros[i].paro] = {
              nombre: paros[i].paro,
              minPerdidos: paros[i].min_perdidos
            };
          }
        }

        if (paros[i].maquina in tiempoDetMaq){
          tiempoDetMaq[paros[i].maquina].minPerdidos += paros[i].min_perdidos;
        } else{
          tiempoDetMaq[paros[i].maquina] = {
            maquina: paros[i].maquina,
            minPerdidos: paros[i].min_perdidos
          };
        }
      }

      setIndicadores(Indicadores);
      setCantParos(justifCantParos);
      setMinPerdidos(justifCantMinutos);
      setDetenciones(tiempoDetMaq);
    }
  }, [ordenes]);

  useEffect(() => {
    if (Object.keys(detenciones).length > 0 && loading === true){
      setTimeout(() => {
        const pdf = new jsPDF('p', 'mm', [279, 216]);
        pdf.html(document.getElementById('reporteSemanal'), {
          callback: function () {
              pdf.save('Reporte Semanal ' + moment(startDate).format('DD-MM-YY') + "_" + moment(endDate).format('DD-MM-YY') + '.pdf');
          },
          html2canvas: {
              scale: 0.35, //this was my solution, you have to adjust to your size
          },
        });

        /*html2canvas(document.querySelector("#reporteSemanal")).then(canvas => {  
          canvas.toBlob(function(blob){
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            var img = new Image();
            img.src = imageUrl;
            img.onload = function(){
                var pdf = new jsPDF('p','px',[img.height, img.width]);
                pdf.addImage(img, 'png', 0, 0, img.width, img.height);
                pdf.save('myPdf.pdf');
            };
          });
        });*/

        setLoading(false);
      }, 3000);
    }
  }, [detenciones]);

  return (
    <div>
      <Row>
        <Col align="left">
          <div className="ml-3 mt-1 text-uppercase font-weight-bold title1orange">Descargar reporte semanal</div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Row>
          <Col md="4" className="ml-2" align="right">
            <Label className="mt-2">Seleccione rango de fechas:</Label>
          </Col>

          <Col md="3">
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={(cambio) => {handleChange3(cambio);}}
              dateFormat="dd/MM/yyyy"
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          
          <Col md="3">
            <DatePicker
              className="form-control"
              selected={endDate}
              dateFormat="dd/MM/yyyy"
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              disabled
            />
          </Col>

          <Col>{
            loading === true ?
              <Spinner animation="border" variant="info" />
            : 
              <Button 
                block
                className="buttonGray"
                style={{ height: '100%', backgroundColor: '#2264A7', borderColor: '#2264A7' }}
                onClick={loadData}
              >
                Descargar
              </Button>
          }</Col>
        </Row>
      </Row>

      {/* REPORTE */}
      <Row style={{ display: 'none' }}>
        <Preview id={'reporteSemanal'}>
          <Row md="12" style={{ backgroundColor: '#2264A7', borderBottom: '0.5px solid #13395E' }}>
            <Col md="2" align="center" style={{ alignSelf: 'center' }}>
              <img src={agrosuper} alt="agrosuper"
                style={{ width: '85%', marginLeft: '15%' }}
              />
            </Col>

            <Col md="5" align="center">
              <Label className="ml-2 mb-4 font-weight-bold title1orange" style={{ color: '#FFF', fontSize: '0.75rem' }}>
                REPORTE ONLINE - SEM. {moment(Object.keys(indicadores)[0]).week()}<br></br>
                {"Desde el " + moment(startDate).format('DD-MMM') + " hasta el " + moment(endDate).format('DD-MMM')}
              </Label>
            </Col>

            <Col md="2" align="center" style={{ alignSelf: 'center' }}>
              <img src={vigalab} alt="vigalab"
                style={{ width: '115%', marginRight: '15%', marginBottom: '5%' }}
              />
            </Col>
          </Row>

          <Row md="12" className="mt-2" style={{ marginLeft: '1%', borderRadius: '5px' }}>
            <Col md="2" style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>
              <Row style={{ backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.35rem', borderTopLeftRadius: '5px' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>OEE</div>
              </Row>

              <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.35rem' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>LÍNEA COMPLETA OEE</div>
              </Row>
              <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Disponibilidad [%]</div>
              </Row>
              <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Calidad [%]</div>
              </Row>
              <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right' }}>Eficiencia [%]</div>
              </Row>

              {titulos.map((tit, i) => (
                <div>
                  <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.35rem' }}>
                    <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>{tit}</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Disponibilidad [%]</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Eficiencia [%]</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Cantidad de paros justificados</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Minutos perdidos</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Producción real [kg]</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Producción solicitada [kg]</div>
                  </Row>

                  {tit.includes("ENVASADORA ") ?
                    <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right' }}>Cumplimiento [%]</div>
                    </Row>
                  :
                    <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                      <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Cumplimiento [%]</div>
                    </Row>
                  }

                  {tit === "FORMADORA" ?
                    <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right', fontWeight: 'bold' }}>Rechazo en envasado [kg]</div>
                    </Row>
                  : (tit === "EMPAQUETADORA" ?
                    <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right', fontWeight: 'bold' }}>Rechazo en rayos X [kg]</div>
                    </Row>
                  : ""
                  )}
                </div>
              ))}

              <Row style={{ backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.35rem', borderBottomLeftRadius: '5px' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>PÉRDIDA TOTAL [kg]</div>
              </Row>
            </Col>
            
            {Object.keys(indicadores).length > 0 ?
              Object.keys(indicadores).map((fecha, i) => (
                <Col md="1" style={fecha === "Semana" ?
                  { borderTopRightRadius: '5px', borderBottomRightRadius: '5px' } :
                  {  }
                }>
                  <Row style={fecha === "Semana" ?
                    { backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.35rem', borderTopRightRadius: '5px' } :
                    { backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.35rem' }
                  }>
                    {fecha === "Semana" ?
                      <div className="ml-4 mt-1 mb-1">{"Sem. " + moment(Object.keys(indicadores)[0]).week()}</div> :
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'left' }}>{moment(fecha).format('DD-MMM')}</div>
                    }
                  </Row>

                  <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.35rem' }}>
                    <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'left' }}>{_.round(indicadores[fecha]["OEE"].OEE * 100, 0)} %</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1">{_.round(indicadores[fecha]["OEE"].disponibilidad * 100, 0)} %</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1">{_.round(indicadores[fecha]["OEE"].calidad * 100, 0)} %</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                    <div className="ml-4 mt-1 mb-1">{_.round(indicadores[fecha]["OEE"].eficiencia * 100, 0)} %</div>
                  </Row>

                  {Object.keys(indicadores[fecha]).map((maq, i) => (
                    maq !== "OEE" ?
                      <div>
                        <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.35rem' }}>
                          {fecha === "Semana" ?
                            <div className="ml-4 mt-1 mb-1">{"Sem. " + moment(Object.keys(indicadores)[0]).week()}</div> :
                            <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>{moment(fecha).format('DD-MMM')}</div>
                          }
                        </Row>

                        <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                          <div className="ml-4 mt-1">{_.round(indicadores[fecha][maq]["Total"].disponibilidad * 100, 0)} %</div>
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                          <div className="ml-4 mt-1">{_.round(indicadores[fecha][maq]["Total"].eficiencia * 100, 0)} %</div>
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                          {fecha === "Semana" ?
                            <div className="ml-4 mt-1">-</div> :
                            <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].cantParos, 0))}</div>
                          }
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                          {fecha === "Semana" ?
                            <div className="ml-4 mt-1">-</div> :
                            <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].minPerdidos, 0))}</div>
                          }
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                          {fecha === "Semana" ?
                            <div className="ml-4 mt-1">-</div> :
                            <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].kgProdTotal, 0))} kg</div>
                          }
                        </Row>

                        {maq.includes("Envasadora") ? 
                          <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                            {fecha === "Semana" ?
                              <div className="ml-4 mt-1">-</div> :
                              <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].kgSolicTotal/3, 0))} kg</div>
                            }
                          </Row>
                        :
                        <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                          {fecha === "Semana" ?
                            <div className="ml-4 mt-1">-</div> :
                            <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].kgSolicTotal, 0))} kg</div>
                          }
                        </Row>
                        }

                        {maq.includes("Envasadora") ? 
                          <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                            {fecha === "Semana" ?
                              <div className="ml-4 mt-1 mb-1">-</div> :
                              <div className="ml-4 mt-1 mb-1">{_.round(indicadores[fecha][maq]["Total"].cumplimiento * 100, 0)} %</div>
                            }
                          </Row>
                        :
                          <Row style={{ fontStyle: 'italic', fontSize: '0.3rem' }}>
                            {fecha === "Semana" ?
                              <div className="ml-4 mt-1">-</div> :
                              <div className="ml-4 mt-1">{_.round(indicadores[fecha][maq]["Total"].cumplimiento * 100, 0)} %</div>
                            }
                          </Row>
                        }

                        {maq === "Formadora" ?
                          <Row style={{ fontStyle: 'italic', fontSize: '0.3rem', fontWeight: 'bold' }}>
                            {fecha === "Semana" ?
                              <div className="ml-4 mt-1 mb-1">-</div> :
                              <div className="ml-4 mt-1 mb-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].formado, 0))} kg</div>
                            }
                          </Row>
                        : (maq === "Empaquetadora" ?
                          <Row style={{ fontStyle: 'italic', fontSize: '0.3rem', fontWeight: 'bold' }}>
                            {fecha === "Semana" ?
                              <div className="ml-4 mt-1 mb-1">-</div> :
                              <div className="ml-4 mt-1 mb-1">{props.formatNumber.new(_.round(indicadores[fecha][maq]["Total"].deformes, 0))} kg</div>
                            }
                          </Row>
                        : ""
                        )}
                      </div>
                    : ""
                  ))}

                  <Row style={fecha === "Semana" ?
                    { backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.35rem', borderBottomRightRadius: '5px' } :
                    { backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.35rem' }
                  }>
                    {fecha === "Semana" ?
                      <div className="ml-4 mt-1 mb-1">-</div> :
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>
                        {props.formatNumber.new(_.round(indicadores[fecha]["Formadora"]["Total"].formado + indicadores[fecha]["Empaquetadora"]["Total"].deformes, 0))} kg
                      </div>
                    }
                  </Row>
                </Col>
              ))
              : ""
            }
          </Row>
          <br></br>
          <Row md="12" style={{ backgroundColor: '#2264A7', borderBottom: '0.5px solid #13395E', marginTop: '0.9%' }}>
            <Col md="2" align="center" style={{ alignSelf: 'center' }}>
              <img src={agrosuper} alt="agrosuper"
                style={{ width: '85%', marginLeft: '15%' }}
              />
            </Col>

            <Col md="5" align="center">
              <Label className="ml-2 mb-4 font-weight-bold title1orange" style={{ color: '#FFF', fontSize: '0.75rem' }}>
                REPORTE ONLINE - SEM. {moment(Object.keys(indicadores)[0]).week()}<br></br>
                {"Desde el " + moment(startDate).format('DD-MMM') + " hasta el " + moment(endDate).format('DD-MMM')}
              </Label>
            </Col>

            <Col md="2" align="center" style={{ alignSelf: 'center' }}>
              <img src={vigalab} alt="vigalab"
                style={{ width: '115%', marginRight: '15%', marginBottom: '5%' }}
              />
            </Col>
          </Row>
          
          <Row md="12" className="mt-2" style={{ marginLeft: '1%' }}>
            <Col md="9">
              <Row className="mt-2">
                <Col>
                  <Row>
                    <Col md="1"></Col>
                    <Col md="10" style={{ border: '1px solid #eaecef', borderRadius: '5px' }}>
                      <Row style={{ color: 'black', fontWeight: 'bold', fontSize: '0.5rem', justifyContent: 'center' }}>
                        <div className="ml-4 mt-2 mb-1" style={{ textAlign: 'center' }}>Cantidad de paros por justificación</div>
                      </Row>

                      <Row>
                        {Object.values(cantParos).sort(function(a, b){return b.cantParos - a.cantParos}).map((justif, i) => (
                          <Col md="3" className="mt-2" style={{ textAlign: '-webkit-center' }}>
                            <div className="mb-1" style={{ fontSize: '0.3rem', textAlignLast: 'center', color: 'dimgrey' }}>
                              {justif.nombre}
                            </div>

                            <div style={{
                                  color: 'transparent',
                                  backgroundColor: 'lightcoral',
                                  height: 150*justif.cantParos/Object.values(cantParos).reduce((n, {cantParos}) => n + cantParos, 0) + 'px',
                                  width: '50%',
                                  border: '0.5px solid firebrick',
                                  borderRadius: '5%',
                                  marginTop: '2.5%'
                                }}>
                                  -
                            </div>

                            <div className="mb-2" style={{ fontSize: '0.25rem', textAlignLast: 'center', color: 'darkgrey', marginTop: '1%', fontWeight: 'bold' }}>
                              {justif.cantParos}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col md="1"></Col>
                  </Row>
                </Col>
              </Row>
              
              <Row className="mt-4">
                <Col>
                  <Row>
                    <Col md="1"></Col>
                    <Col md="10" style={{ border: '1px solid #eaecef', borderRadius: '5px' }}>
                      <Row style={{ color: 'black', fontWeight: 'bold', fontSize: '0.5rem', justifyContent: 'center' }}>
                        <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>Minutos perdidos por justificación</div>
                      </Row>

                      <Row>
                        {Object.values(minPerdidos).sort(function(a, b){return b.minPerdidos - a.minPerdidos}).map((justif, i) => (
                          <Col md="3" className="mt-2" style={{ textAlign: '-webkit-center' }}>
                            <div className="mb-1" style={{ fontSize: '0.3rem', textAlignLast: 'center', color: 'dimgrey' }}>
                              {justif.nombre}
                            </div>

                            <div style={{
                                  color: 'transparent',
                                  backgroundColor: '#80e0f0',
                                  height: 150*justif.minPerdidos/Object.values(minPerdidos).reduce((n, {minPerdidos}) => n + minPerdidos, 0) + 'px',
                                  width: '50%',
                                  border: '0.5px solid #2291b2',
                                  borderRadius: '5%',
                                  marginTop: '2.5%'
                                }}>
                                  -
                            </div>

                            <div className="mb-2" style={{ fontSize: '0.25rem', textAlignLast: 'center', color: 'darkgrey', marginTop: '1%', fontWeight: 'bold' }}>
                              {justif.minPerdidos} min
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                    <Col md="1"></Col>
                  </Row>
                </Col>
              </Row>
              
              <Row className="mt-4 mb-2">
                <Col>
                  <Row>
                    <Col md="1"></Col>
                    <Col md="10" style={{ border: '1px solid #eaecef', borderRadius: '5px' }}>
                      <Row style={{ color: 'black', fontWeight: 'bold', fontSize: '0.5rem', justifyContent: 'center' }}>
                        <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>Tiempo de detención por máquina</div>
                      </Row>

                      <Row>
                        <Col md="1"></Col>
                        {Object.values(detenciones).sort(function(a, b){return b.minPerdidos - a.minPerdidos}).map((justif, i) => (
                          <Col md="2" className="mt-2" style={{ textAlign: '-webkit-center' }}>
                            <div className="mb-1" style={{ fontSize: '0.3rem', textAlignLast: 'center', color: 'dimgrey' }}>
                              {justif.maquina}
                            </div>

                            <div style={{
                                  color: 'transparent',
                                  backgroundColor: 'rgb(233 240 128)',
                                  height: 150*justif.minPerdidos/Object.values(minPerdidos).reduce((n, {minPerdidos}) => n + minPerdidos, 0) + 'px',
                                  width: '50%',
                                  border: '0.5px solid rgb(178 167 34)',
                                  borderRadius: '5%',
                                  marginTop: '2.5%'
                                }}>
                                  -
                            </div>

                            <div className="mb-2" style={{ fontSize: '0.25rem', textAlignLast: 'center', color: 'darkgrey', marginTop: '1%', fontWeight: 'bold' }}>
                              {justif.minPerdidos} min
                            </div>
                          </Col>
                        ))}
                        <Col md="1"></Col>
                      </Row>
                    </Col>
                    <Col md="1"></Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Preview>
      </Row>
      <hr/>
      <Row>
        <Col>
          {dateError === true ? (
            <Alert color="warning">
              <a className="alert-link">{dateErrorMsg}</a>
            </Alert>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(GenerarExcel);
