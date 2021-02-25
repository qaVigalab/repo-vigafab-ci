
import React, { useEffect, useState } from "react";
import { Col, Row, Label, Spinner, Alert } from "reactstrap";
import Workbook from 'react-excel-workbook';
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import _ from "lodash";
import moment from 'moment';

const GenerarExcel = (props) => {
  const [ordenes, setOrdenes] = useState([]);
  const [paros, setParos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [dateErrorMsg, setDateErrorMsg] = useState("");
  const [startDate, setStartDate] = useState(new Date(moment().add(-7, 'days').format('YYYY-MM-DD')));
  const [endDate, setEndDate] = useState(new Date(moment().add(0, 'days').format('YYYY-MM-DD')));

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

  useEffect(() => {
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

          delete Indicadores[fecha][maq].cantMaquinas;
        }
      });
    });
    console.log(Indicadores);

    /* Se obtiene la cantidad total de Paros y Minutos Perdidos según Categoría y Máquinas */


    setLoading(false);
    setIndicadores(Indicadores);
  }, [ordenes]);

  return (
    <div>
      <Row>
        <Col align="left">
          <div className="ml-3 mt-1 text-uppercase font-weight-bold title1orange">Descargar reporte</div>
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
