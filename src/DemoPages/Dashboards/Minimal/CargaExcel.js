import React, { Component } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import { Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback } from 'reactstrap';

class CargaExcel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null
    }
    this.fileHandler = this.fileHandler.bind(this);
    this.toggle = this.toggle.bind(this);
    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.renderFile = this.renderFile.bind(this);
    this.fileInput = React.createRef();
  }

  renderFile = (fileObj) => {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      }
      else {
        this.setState({
          dataLoaded: true,
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }

  fileHandler = (event) => {
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
          console.log("Estamos en el Dia: " + dia)
          for (var i = 1; i < 200; i++) {
            if (wb["F" + i] === undefined) { }
            else {
              if (wb["F" + i].v > 0 && wb["C" + i]!==undefined && wb["C" + i].v === "Hamb" && wb["V" + i]!==undefined) {
                console.log("prioridad: "+wb["B" + i].v+" cajas "+wb["F" + i].v+" kg_solicitados "+wb["Q" + i].v+ " id_producto "+wb["D"+ i].v+ " tiempo_estimado "+wb["P" + i].v+ " fecha ")
              }
            }
          }
        })
        var wblunes = workbook.Sheets["Lunes"]
        //console.log(wblunes)
        //console.log(wblunes["F26"].v)
      }
      reader.readAsArrayBuffer(f);


      let fileObj = event.target.files[0];
      let fileName = fileObj.name;


      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
        this.setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        this.renderFile(fileObj)
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
          <FormGroup row>
            <Label className="pl-5" xs={4} sm={3} md={2} lg={2} size="lg">Upload</Label>
            <Col xs={8} sm={9} md={10} lg={10}>
              <InputGroup>
                <InputGroupAddon addonType="prepend" className="mt-1">
                  <Button color="info" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Browse&hellip;</Button>
                  <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                </InputGroupAddon>
                <Input type="text" className="form-control mt-1 mr-4 " value={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />
                <FormFeedback>
                  <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                    Please select a .xlsx file only !
                  </Fade>
                </FormFeedback>
              </InputGroup>
            </Col>
          </FormGroup>
        </form>

        {this.state.dataLoaded &&
          <div>
            {/*  <Card body outline color="secondary" className="restrict-card">
            
              <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
           
          </Card>   */}
            {this.state.rows.map(row => (

              <text>
                {row[0] > 0 ? "UPDATE codelco.pulsera SET numero_impersonal='" + row[1] + "' WHERE id= " + row[0] + ";" : ""}
                <br />
              </text>
            ))}

          </div>}

        {this.state.dataLoaded &&
          <div>
            {this.state.rows.map(row => (

              <text>
                {row[0] > 0 ? "update codelco.usuarios set numero_impersonal = '" + row[1] + "' WHERE mac = (select mac from pulsera where pulsera.id=" + row[0] + ");" : ""}
                <br />
              </text>
            ))}
          </div>}
      </div>
    );
  }
}

export default CargaExcel;
