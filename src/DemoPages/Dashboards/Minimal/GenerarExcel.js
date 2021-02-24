
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
  const [startDate, setStartDate] = useState(new Date(moment().add(-6, 'days').format('YYYY-MM-DD')));
  const [endDate, setEndDate] = useState(new Date(moment().add(1, 'days').format('YYYY-MM-DD')));

  const handleChange3 = (date) =>{
    if (date > endDate){
      setStartDate(endDate);
      setDateError(true);
      setDateErrorMsg("No es posible seleccionar una fecha de inicio posterior a la de término.");
  
      setTimeout(() => {
        setDateError(false);
      }, 1500);
    } else {
      setStartDate(date);
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  const handleChange4= (date) => {
    if (date < startDate){
      setEndDate(startDate);
      setDateError(true);
      setDateErrorMsg("No es posible seleccionar una fecha de término anterior a la de inicio.");
  
      setTimeout(() => {
        setDateError(false);
      }, 1500);
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
  const [parosPorMaquina, setParosPorMaquina] = useState({});

  useEffect(() => {
    setLoading(false);
    
    /* Se construyen los Paros según Máquina y Día */
    var PPM = {};
    for (var i=0; i<paros.length; i++){
      if (paros[i].maquina in PPM){
        if (paros[i].fecha.split("T")[0] in PPM[paros[i].maquina]){
          PPM[paros[i].maquina][paros[i].fecha.split("T")[0]].cantParos += paros[i].cant_paros;
          PPM[paros[i].maquina][paros[i].fecha.split("T")[0]].minPerdidos += paros[i].min_perdidos;
        } else{
          PPM[paros[i].maquina][paros[i].fecha.split("T")[0]] = {
            cantParos: paros[i].cant_paros,
            minPerdidos: paros[i].min_perdidos,
          }
        }
      } else{
        PPM[paros[i].maquina] = {};
        PPM[paros[i].maquina][paros[i].fecha.split("T")[0]] = {
          cantParos: paros[i].cant_paros,
          minPerdidos: paros[i].min_perdidos,
        }
      }
    }
    setParosPorMaquina(parosPorMaquina);
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
