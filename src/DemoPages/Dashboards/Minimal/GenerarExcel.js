
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Label, CardBody, CardTitle, Button } from "reactstrap";
import Workbook from 'react-excel-workbook';
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import _ from "lodash";
const GenerarExcel = (props) => {
  const [ordenes, setOrdenes] = useState(0)
  const [paros, setParos] = useState(0)
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
  const [endDate, setEndDate] = useState(new Date())


  const handleChange3 = (date) =>{
    console.log(date);
        setStartDate(date);

        setTimeout(() => {
          loadParo()
          loadOrden()
        }, 700);
    
  }

  const handleChange4= (date) => {
    console.log(date.toISOString().substr(0, 10));
    setEndDate(date);
    setTimeout(() => {
      loadParo()
      loadOrden()
    }, 2000);
  }




  const loadOrden = () => {
    let link
     link = "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/Agrosuper_excel_ordenes"
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
        setOrdenes(result)
      }
      )
      .catch(err => {
        console.error(err);
      });
  }

  const loadParo = () => {
    let link
     link =  "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/agrosuper_excel_paros"
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

  useEffect(() => {
    loadParo()
    loadOrden()
  }, [props.id_orden]);

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
  <Col align="right">
  <Label>Seleccione fechas</Label>
</Col>

<Col>

<DatePicker
        className="form-control"
        selected={startDate}
        onChange={(cambio) => {
            handleChange3(cambio);
            }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      </Col>
      <Col>
      
      <DatePicker
        className="form-control"
        selected={endDate}
        onChange={(cambio) => {
            handleChange4(cambio);
            }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
      </Col>

   <Col>
      <Workbook filename={'Elaborados_'+startDate.toISOString().substr(0, 10)+'_'+endDate.toISOString().substr(0, 10)+'.xlsx'} element={<button className="btn btn-lg btn-primary">Descargar</button>}>
      <Workbook.Sheet data={ordenes} name="Reporte principal">
      <Workbook.Column label="SKU" value="sku"/>
      <Workbook.Column label="n de orden" value="id_suborden"/>
        <Workbook.Column label="Producto" value="producto"/>
        <Workbook.Column label="Fecha" value={row =>new Date(row.fecha).toISOString().substr(0, 10)}/>
        <Workbook.Column label="Máquina" value="maquina"/>
        <Workbook.Column label="Disponibilidad [%]" value={row => Number((row.Disponibilidad * 100).toFixed(2))}/>
        <Workbook.Column label="Calidad [%]" value={row => (isNaN(row.calidad)?'':     (row.calidad>1?100:    Number((row.calidad * 100).toFixed(2))     ))}/>
        <Workbook.Column label="Eficiencia [%]" value={row => Number((row.eficiencia * 100).toFixed(2))}/>
        <Workbook.Column label="OEE [%]" value={row => isNaN(row.calidad)?'':(row.eficiencia*row.calidad*row.Disponibilidad * 100>100?100:Number((row.eficiencia*row.calidad*row.Disponibilidad * 100).toFixed(2)))}/>
        <Workbook.Column label="Tiempo perdido [min]" value="tiempo_perdido" />
        <Workbook.Column label="Cantidad de paros" value={row => (row.cantidad_paros-1)}/>
        <Workbook.Column label="Kg producidos" value="kg_producidos" value={row => Number((row.kg_producidos).toFixed(1))}/>
        <Workbook.Column label="Kg solicitados" value="kg_solicitados"/>

  
      </Workbook.Sheet>
        <Workbook.Sheet data={paros} name="Justificación">
        <Workbook.Column label="SKU" value="sku"/>
        <Workbook.Column label="n de orden" value="id_suborden"/>
        <Workbook.Column label="Producto" value="Produccion"/>
        <Workbook.Column label="Fecha de inicio" value="fecha"/>
        <Workbook.Column label="Duración[min]" value="duracion"/>
        <Workbook.Column label="Máquina" value="Maquinas" />
        <Workbook.Column label="Ámbito" value="ambito"/>
        <Workbook.Column label="Clasificación" value="clasificacion"/>
        <Workbook.Column label="Sección" value="seccion"/>




      </Workbook.Sheet> 
    </Workbook>
    </Col>
    </Row>
        {/* header */}
        
    </Row>
    <hr/>
    </div>
    
  );
}

const mapStateToProps = (state) => ({
  id_orden: state.dashboardReducers.id_orden,
});

export default connect(mapStateToProps)(GenerarExcel);
