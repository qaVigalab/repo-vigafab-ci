
import React, { useEffect, useState } from "react";
import { Col, Row, Label } from "reactstrap";
import Workbook from 'react-excel-workbook';
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import _ from "lodash";
import moment from 'moment';

const GenerarExcel = (props) => {
  const [ordenes, setOrdenes] = useState(0);
  const [paros, setParos] = useState(0);
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)));
  const [endDate, setEndDate] = useState(new Date());

  const handleChange3 = (date) =>{
    setStartDate(date);
    console.log("Fecha original: " + date + " | Fecha tratada: " + moment(date).format('YYYY-MM-DD'))
  }

  const handleChange4= (date) => {
    setEndDate(date);
    console.log("Fecha original: " + date + " | Fecha tratada: " + moment(date).format('YYYY-MM-DD'))
  }

  const loadOrden = () => {
    let link
     link = global.api.dashboard.Agrosuper_excel_ordenes
    fetch(link, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        fecha_inicio: moment(startDate).add(1, 'days').format('YYYY-MM-DD'),
        fecha_termino: moment(endDate).add(1, 'days').format('YYYY-MM-DD')
      }),
    })
      .then(response => response.json())
      .then(result => {
        setOrdenes(result)
      }
      )
      .catch(err => {
        console.error(err);
      });
  }

  const loadParo = () => {
    let link
     link =  global.api.dashboard.agrosuper_excel_paros
    fetch(link, {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m"
      },

      body: JSON.stringify({
        fecha_inicio: startDate.toISOString().substr(0, 10),
        fecha_termino: endDate.toISOString().substr(0, 10)
      }),
    })
      .then(response => response.json())
      .then(result => {
        setParos(result)
      }
      )
      .catch(err => {
        console.error(err);
      });
  }

  const loadData = () => {
    
  };

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
          <Col className="ml-2" align="right">
            <Label className="mt-2">Seleccione fechas:</Label>
          </Col>

          <Col>
            <DatePicker
              className="form-control"
              selected={startDate}
              onChange={(cambio) => {handleChange3(cambio);}}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          
          <Col>
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

          <Col>
            <button className="btn btn-lg btn-primary" onClick={loadData}>Descargar</button>
          </Col>
        </Row>
      </Row>
    <hr/>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(GenerarExcel);
