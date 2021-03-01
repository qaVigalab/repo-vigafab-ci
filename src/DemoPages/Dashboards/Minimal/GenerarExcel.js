
import React, { useEffect, useState } from "react";
import { Col, Row, Label, Spinner, Alert } from "reactstrap";

import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import _ from "lodash";
import moment from 'moment';
import { Preview, print } from 'react-html2pdf';

const GenerarExcel = (props) => {
  const [ordenes, setOrdenes] = useState([]);
  const [paros, setParos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(new Date(moment().add(-7, 'days').format('YYYY-MM-DD')));
  const [endDate, setEndDate] = useState(new Date(moment().add(0, 'days').format('YYYY-MM-DD')));
  const [titulos, setTitulos] = useState(["FORMADORA", "ENVASADORA 4", "ENVASADORA 5", "ENVASADORA 6", "EMPAQUETADORA"]);

  const handleChange3 = (date) =>{
    if (date > endDate){
      setStartDate(endDate);
      setDateError(true);
      setDateErrorMsg("No es posible seleccionar una fecha de inicio posterior a la de término.");
  
      setTimeout(() => {
        setDateError(false);
      }, 3000);
    } else {
      setStartDate(date);
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  const handleChange4= (date) => {
    if (date > new Date(moment().format('YYYY-MM-DD'))){
      setEndDate(endDate);
      setDateError(true);
      setDateErrorMsg("No es posible seleccionar una fecha con órdenes en espera.");
  
      setTimeout(() => {
        setDateError(false);
      }, 3000);
    } else {
      setEndDate(date);
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
          if (PPM[paros[i].maquina] in PPM[paros[i].fecha.split("T")[0]]){
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
      var Indicadores = {};
      for (var i=0; i<ordenes.length; i++){
        if (ordenes[i].fecha.split("T")[0] in Indicadores){
          if ([ordenes[i].maquina] in Indicadores[ordenes[i].fecha.split("T")[0]]){
            if (ordenes[i].tipo_reporte === 1){
              Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina].tiempoInactivo += ordenes[i].minutos;
              Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina].kgSolic += ordenes[i].kg_solic;
            } else{
              Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina].tiempoActivo += ordenes[i].minutos;
              Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina].cantOrdenes += 1;
            }

            Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina].kgProd += ordenes[i].kg_prod;
            Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina].eficiencia += ordenes[i].eficiencia;
          } else{
            if (ordenes[i].tipo_reporte === 1){
              Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina] = {
                tiempoInactivo: ordenes[i].minutos,
                tiempoActivo: 0,

                kgSolic: ordenes[i].kg_solic,
                kgProd: ordenes[i].kg_prod,
                eficiencia: ordenes[i].eficiencia,
                cantOrdenes: 0
              }
            } else{
              Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina] = {
                tiempoInactivo: 0,
                tiempoActivo: ordenes[i].minutos,

                kgSolic: ordenes[i].kg_solic,
                kgProd: ordenes[i].kg_prod,
                eficiencia: ordenes[i].eficiencia,
                cantOrdenes: 0
              }
            }
          }
        } else{
          Indicadores[ordenes[i].fecha.split("T")[0]] = {};

          if (ordenes[i].tipo_reporte === 1){
            Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina] = {
              tiempoInactivo: ordenes[i].minutos,
              tiempoActivo: 0,

              kgSolic: ordenes[i].kg_solic,
              kgProd: ordenes[i].kg_prod,
              eficiencia: ordenes[i].eficiencia,
              cantOrdenes: 0
            }
          } else{
            Indicadores[ordenes[i].fecha.split("T")[0]][ordenes[i].maquina] = {
              tiempoInactivo: 0,
              tiempoActivo: ordenes[i].minutos,

              kgSolic: ordenes[i].kg_solic,
              kgProd: ordenes[i].kg_prod,
              eficiencia: ordenes[i].eficiencia,
              cantOrdenes: 0
            };
          }
        }
      }

      Object.keys(Indicadores).map((fecha, i) => {
        Object.keys(Indicadores[fecha]).map((maq, i) => {
          Indicadores[fecha][maq].disponibilidad = _.round(Indicadores[fecha][maq].tiempoActivo/(Indicadores[fecha][maq].tiempoActivo + Indicadores[fecha][maq].tiempoInactivo), 2);
          Indicadores[fecha][maq].eficiencia = _.round(Indicadores[fecha][maq].eficiencia/Indicadores[fecha][maq].cantOrdenes, 2);

          Indicadores[fecha][maq].cantParos = PPM[fecha][maq].cantParos;
          Indicadores[fecha][maq].minPerdidos = PPM[fecha][maq].minPerdidos;

          if (maq.includes("Envasadora"))
            Indicadores[fecha][maq].cumplimiento = _.round(Indicadores[fecha][maq].kgProd/(Indicadores[fecha][maq].kgSolic/3), 2);
          else
            Indicadores[fecha][maq].cumplimiento = _.round(Indicadores[fecha][maq].kgProd/Indicadores[fecha][maq].kgSolic, 2);

          delete Indicadores[fecha][maq].cantOrdenes
        });
      });

      /* Se calculan los indicadores de Disponibilidad, Calidad y Eficiencia para la OEE */
      Object.keys(Indicadores).map((fecha, i) => {
        Object.keys(Indicadores[fecha]).map((maq, i) => {
          if ("OEE" in Indicadores[fecha]){
            Indicadores[fecha]["OEE"].disponibilidad += Indicadores[fecha][maq].disponibilidad;
            Indicadores[fecha]["OEE"].eficiencia += Indicadores[fecha][maq].eficiencia;

            Indicadores[fecha]["OEE"].cantMaquinas += 1;
          } else{
            Indicadores[fecha]["OEE"] = {
              disponibilidad: Indicadores[fecha][maq].disponibilidad,
              calidad: _.round(Indicadores[fecha]["Empaquetadora"].kgProd / Indicadores[fecha]["Formadora"].kgProd, 2),
              eficiencia: Indicadores[fecha][maq].eficiencia,
              cantMaquinas: 1
            }
          }
        });
      });

      Object.keys(Indicadores).map((fecha, i) => {
        Object.keys(Indicadores[fecha]).map((maq, i) => {
          if (maq === "OEE"){
            Indicadores[fecha][maq].disponibilidad = _.round(Indicadores[fecha][maq].disponibilidad / Indicadores[fecha][maq].cantMaquinas, 2);
            Indicadores[fecha][maq].eficiencia = _.round(Indicadores[fecha][maq].eficiencia / Indicadores[fecha][maq].cantMaquinas, 2);
            Indicadores[fecha][maq].OEE = _.round(Indicadores[fecha][maq].disponibilidad * Indicadores[fecha][maq].eficiencia * Indicadores[fecha][maq].calidad, 2)

            delete Indicadores[fecha][maq].cantMaquinas;
          }
          else if (maq === "Formadora"){
            Indicadores[fecha][maq].formado = Indicadores[fecha][maq].kgProd - Indicadores[fecha]["Envasadora 4"].kgProd - Indicadores[fecha]["Envasadora 5"].kgProd - Indicadores[fecha]["Envasadora 6"].kgProd;
          }
          else if (maq === "Empaquetadora"){
            Indicadores[fecha][maq].deformes = Indicadores[fecha]["Envasadora 4"].kgProd + Indicadores[fecha]["Envasadora 5"].kgProd + Indicadores[fecha]["Envasadora 6"].kgProd - Indicadores[fecha][maq].kgProd;
          }
        });
      });

      /* Se obtiene la cantidad total de Paros y Minutos Perdidos según Categoría y Máquinas */
      var justifCantParos = {}, justifCantMinutos = {}, tiempoDetMaq = {};
      for (var i=0; i<paros.length; i++){
        if (["Operativo", "Cambio de formato", "Desmonte del film", "Mantenimiento"].includes(paros[i].paro)){
          if (paros[i].paro in justifCantParos){
            justifCantParos[paros[i].paro] += paros[i].cant_paros;
            justifCantMinutos[paros[i].paro] += paros[i].min_perdidos;
          } else{
            justifCantParos[paros[i].paro] = paros[i].cant_paros;
            justifCantMinutos[paros[i].paro] = paros[i].min_perdidos;
          }
        }

        if (paros[i].maquina in tiempoDetMaq){
          tiempoDetMaq[paros[i].maquina] += paros[i].min_perdidos;
        } else{
          tiempoDetMaq[paros[i].maquina] = paros[i].min_perdidos;
        }
      }

      setIndicadores(Indicadores);
      setCantParos(justifCantParos);
      setMinPerdidos(justifCantMinutos);
      setDetenciones(tiempoDetMaq);
    }
  }, [ordenes]);

  useEffect(() => {
    if (Object.keys(indicadores).length > 0 && loading === true){
      setLoading(false);
      print('Reporte Semanal ' + moment(startDate).format('DD-MM-YYYY') + "_" + moment(endDate).format('DD-MM-YYYY'), 'reporteSemanal');
    }
  }, [indicadores]);

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
          <Col md="3" className="ml-2" align="right">
            <Label className="mt-2">Seleccione fechas:</Label>
          </Col>

          <Col md="3">
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={(cambio) => {handleChange3(cambio);}}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          
          <Col md="3">
            <DatePicker
              className="form-control"
              selected={endDate}
              onChange={(cambio) => {handleChange4(cambio);}}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Col>

          <Col>{
            loading === true ?
              <Spinner animation="border" variant="info" />
            : <button className="btn btn-lg btn-primary" onClick={loadData}>Descargar</button>
          }</Col>
        </Row>
      </Row>
      <Row style={{ display: 'none' }}>
        <Preview id={'reporteSemanal'}>
          <Row style={{ backgroundColor: '#2264A7', borderBottom: '0.5px solid #13395E' }}>
            <Col md="12" className="ml-2" align="left">
              <Label className="ml-2 mb-2 text-uppercase font-weight-bold title1orange" style={{ color: '#FFF' }}>
                REPORTE SEMANAL - CONTROL ONLINE<br></br>
                {"Desde el " + moment(startDate).format('DD-MMM') + " hasta el " + moment(endDate).format('DD-MMM')}
              </Label>
            </Col>
          </Row>

          <Row>
            <Col md="2">
              <Row className="mt-1" style={{ backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>OEE</div>
              </Row>

              <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>LÍNEA COMPLETA OEE</div>
              </Row>
              <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Disponibilidad [%]</div>
              </Row>
              <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Calidad [%]</div>
              </Row>
              <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right' }}>Eficiencia [%]</div>
              </Row>

              {titulos.map((tit, i) => (
                <div>
                  <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                    <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>{tit}</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Disponibilidad [%]</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Eficiencia [%]</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Cantidad de paros</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Minutos perdidos</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Producción real [kg]</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Producción solicitada [kg]</div>
                  </Row>

                  {tit.includes("ENVASADORA ") ?
                    <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right' }}>Cumplimiento [%]</div>
                    </Row>
                  :
                    <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                      <div className="ml-4 mt-1" style={{ textAlign: 'right' }}>Cumplimiento [%]</div>
                    </Row>
                  }

                  {tit === "FORMADORA" ?
                    <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right', fontWeight: 'bold' }}>Rechazo en envasado [kg]</div>
                    </Row>
                  : (tit === "EMPAQUETADORA" ?
                    <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                      <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'right', fontWeight: 'bold' }}>Rechazo en rayos X [kg]</div>
                    </Row>
                  : ""
                  )}
                </div>
              ))}

              <Row style={{ backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>PÉRDIDA TOTAL [kg]</div>
              </Row>
            </Col>
            
            {Object.keys(indicadores).length > 0 ?
              Object.keys(indicadores).map((fecha, i) => (
                <Col md="1">
                  <Row className="mt-1" style={{ backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                    <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'left' }}>{moment(fecha).format('DD-MMM')}</div>
                  </Row>

                  <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                    <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'left' }}>{_.round(indicadores[fecha]["OEE"].OEE * 100, 0)} %</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1">{_.round(indicadores[fecha]["OEE"].disponibilidad * 100, 0)} %</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1">{_.round(indicadores[fecha]["OEE"].calidad * 100, 0)} %</div>
                  </Row>
                  <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                    <div className="ml-4 mt-1 mb-1">{_.round(indicadores[fecha]["OEE"].eficiencia * 100, 0)} %</div>
                  </Row>

                  {Object.keys(indicadores[fecha]).map((maq, i) => (
                    maq !== "OEE" ?
                      <div>
                        <Row style={{ backgroundColor: '#538dd5', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                          <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>{moment(fecha).format('DD-MMM')}</div>
                        </Row>

                        <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                          <div className="ml-4 mt-1">{_.round(indicadores[fecha][maq].disponibilidad * 100, 0)} %</div>
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                          <div className="ml-4 mt-1">{_.round(indicadores[fecha][maq].eficiencia * 100, 0)} %</div>
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                          <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].cantParos, 0))}</div>
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                          <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].minPerdidos, 0))}</div>
                        </Row>
                        <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                          <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].kgProd, 0))} kg</div>
                        </Row>

                        {maq.includes("Envasadora") ? 
                          <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                            <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].kgSolic/3, 0))} kg</div>
                          </Row>
                        :
                        <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                          <div className="ml-4 mt-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].kgSolic, 0))} kg</div>
                        </Row>
                        }

                        {maq.includes("Envasadora") ? 
                          <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                            <div className="ml-4 mt-1 mb-1">{_.round(indicadores[fecha][maq].cumplimiento * 100, 0)} %</div>
                          </Row>
                        :
                          <Row style={{ fontStyle: 'italic', fontSize: '0.075rem' }}>
                            <div className="ml-4 mt-1">{_.round(indicadores[fecha][maq].cumplimiento * 100, 0)} %</div>
                          </Row>
                        }

                        {maq === "Formadora" ?
                          <Row style={{ fontStyle: 'italic', fontSize: '0.075rem', fontWeight: 'bold' }}>
                            <div className="ml-4 mt-1 mb-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].formado, 0))} kg</div>
                          </Row>
                        : (maq === "Empaquetadora" ?
                          <Row style={{ fontStyle: 'italic', fontSize: '0.075rem', fontWeight: 'bold' }}>
                            <div className="ml-4 mt-1 mb-1">{props.formatNumber.new(_.round(indicadores[fecha][maq].deformes, 0))} kg</div>
                          </Row>
                        : ""
                        )}
                      </div>
                    : ""
                  ))}

                  <Row style={{ backgroundColor: '#31869b', color: 'white', fontWeight: 'bold', fontSize: '0.15rem' }}>
                    <div className="ml-4 mt-1 mb-1" style={{ textAlign: 'center' }}>
                      {props.formatNumber.new(_.round(indicadores[fecha]["Formadora"].formado + indicadores[fecha]["Empaquetadora"].deformes, 0))} kg
                    </div>
                  </Row>
                </Col>
              ))
              : ""
            }
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
