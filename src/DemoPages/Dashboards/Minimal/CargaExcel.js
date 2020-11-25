import React, { Component } from 'react';
import { Alert, Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback } from 'reactstrap';

class CargaExcel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      visible: true,
    }

    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.insertFromExcel = this.insertFromExcel.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.fileInput = React.createRef();
  }

  insertFromExcel = (prioridad,cajas,kg_sol,sku,tiempo,fecha) => {
    fetch(
      "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/insertordenfromexcel",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m",
        },
        body: JSON.stringify({
          prioridad: prioridad,
          cajas: cajas,
          kg_solicitados: kg_sol,
          sku: sku,
          tiempo_estimado: tiempo,
          fecha2: fecha,
        }),
      }
    )
      .then((res) => res.json())
      .then(console.log("insertado")
      )
      .catch((err) => {
        console.error(err);
      });
  }
  onDismiss () {
    this.setState({ visible:false })
   }

  fileHandler = (event) => {
    var self = this
    var XLSX = require("xlsx");
    var dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    if (event.target.files.length) {
      var files = event.target.files, f = files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        dias.map(dia =>{
          let wb = workbook.Sheets[dia]
          for (var i = 1; i < 200; i++) {
            if (wb["F" + i] === undefined) { }
            else {
              if (wb["F" + i].v > 0 && wb["C" + i]!==undefined && wb["C" + i].v === "Hamb" && wb["V" + i]!==undefined) {
                //para ver los datos:
                //console.log("prioridad: "+wb["B" + i].v+" cajas "+wb["F" + i].v+" kg_solicitados "+wb["Q" + i].v+ " id_producto "+wb["D"+ i].v+ " tiempo_estimado "+wb["P" + i].v+ " fecha "+wb["D10"].v.slice(8))
                let pri = wb["B" + i].v
                let caj = wb["F" + i].v
                let kg_sol = wb["Q" + i].v
                let sku = wb["D"+ i].v
                let tie = wb["P" + i].v
                let fech = wb["D10"].v.slice(8)
                let fecha_final = fech.split("-").reverse().join("-");
                self.insertFromExcel(pri,caj,kg_sol,sku,tie,fecha_final)
              }
            }
          }
        })
        
      }
      


      let fileObj = event.target.files[0];
      let fileName = fileObj.name;


      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false,
          visible: true,
        });
        reader.readAsArrayBuffer(f);
      }
      else {
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openFileBrowser = () => {
    this.fileInput.current.click();
  }

  render() {
    return (
      <div>
        <form>
        <Alert color="success" className="mb-0" isOpen={this.state.visible} toggle={this.onDismiss}>
          <a className="alert-link">Ordenes Cargadas Correctamente</a>.
        </Alert> 
          <FormGroup row>
            <Label className="pl-5" xs={4} sm={3} md={3} lg={3} size="lg">Importar desde Excel</Label>
            <Col xs={8} sm={9} md={9} lg={9}>
              <InputGroup>
                <InputGroupAddon addonType="prepend" className="mt-1">
                  <Button color="primary" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                </InputGroupAddon>
                <Input type="text" className="form-control mt-1 mr-4 " value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />
                <FormFeedback>
                  <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                     Solo de admiten archivos .xlsx !
                  </Fade>
    
                </FormFeedback>
                
              </InputGroup>
            </Col>
          </FormGroup>
        </form>
        

      </div>
    );
  }
}

export default CargaExcel;
