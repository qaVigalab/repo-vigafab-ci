import React, { useState, Fragment, useEffect } from "react";
import { Card, CardHeader, CardBody, Col, Container, Row, Progress } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PageTitleAlt3 from "../../../Layout/AppMain/PageTitleAlt3";
import G1 from './svgs/g1';
import G2 from './svgs/g2';
import G3 from './svgs/g3';
import G4 from './svgs/g4';
import G5 from './svgs/g5';
import G6 from './svgs/g6';
import TimeLine from "./TimeLine";
const Scada2 = (props) => {


  const [colorAlerta, setColorAlerta] = useState("#ffffff");//ffffff //ff4560
  const [colorLetraAlerta, setColorLetraAlerta] = useState("#606060"); //606060 //fff
  const [colorNumeroAlerta, setColorNumeroAlerta] = useState("#606060");//606060
  const [colorUnidadAlerta, setColorUnidadAlerta] = useState("#606060");//606060

  const [formadoraTemperaturaSalida, setFormadoraTemperaturaSalida] = useState("0");
  const [hamburguesasFormadas, setHamburguesasFormadas] = useState("0");
  const [iqfTemperaturaSalida, setIqfTemperaturaSalida] = useState("0");
  const [iqfVelocidadGiro, setIqfVelocidadGiro] = useState("0");
  const [envasadora1Conteo, setEnvasadora1Conteo] = useState("0");
  const [envasadora2Conteo, setEnvasadora2Conteo] = useState("0");
  const [envasadora3Conteo, setEnvasadora3Conteo] = useState("0");
  const [envasadora4Conteo, setEnvasadora4Conteo] = useState("0");
  const [empaquetadoraConteoEmpaques, setEmpaquetadoraConteoEmpaques] = useState("0");

  /* INI techos de maquinas */
  const [colorTechoFormadora, setColorTechoFormadora] = useState("");
  const [colorTechoIQF, setColorTechoIQF] = useState("");
  const [colorTechoEnvasadora1, setColorTechoEnvasadora1] = useState("");
  const [colorTechoEnvasadora2, setColorTechoEnvasadora2] = useState("");
  const [colorTechoEnvasadora3, setColorTechoEnvasadora3] = useState("");
  const [colorTechoEnvasadora4, setColorTechoEnvasadora4] = useState("F7431E");
  const [colorTechoEmpaquetadora, setColorTechoEmpaquetadora] = useState("");

  const loadData = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "p7eENWbONjaDsXw5vF7r11iLGsEgKLuF9PBD6G4m");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/getscada", requestOptions)
      .then(response => response.json())
      .then(result => {

        console.log(result[0])
        setFormadoraTemperaturaSalida(result[0].formadora_temp)
        setHamburguesasFormadas(result[0].formadora_rmp)
        setIqfTemperaturaSalida(result[0].iqf_temp)
        setIqfVelocidadGiro(result[0].iqf_vel)
        setEnvasadora1Conteo(result[0].envasadora1)
        setEnvasadora2Conteo(result[0].envasadora2)
        setEnvasadora3Conteo(result[0].envasadora3)
        setEnvasadora4Conteo(result[0].envasadora4)
        setEmpaquetadoraConteoEmpaques(result[0].empaquetadora)
        setColorTechoFormadora(result[0].est_for==2 ? "#2264A7" :"#F7431E")
        setColorTechoIQF(result[0].est_iqf==2 ? "#2264A7" :"#F7431E")
        setColorTechoEnvasadora1(result[0].est_env1==2 ? "#2264A7" :"#F7431E")
        setColorTechoEnvasadora2(result[0].est_env2==2 ? "#2264A7" :"#F7431E")
        setColorTechoEnvasadora3(result[0].est_env3==2 ? "#2264A7" :"#F7431E")
        setColorTechoEnvasadora4(result[0].est_env3==2 ? "#2264A7" :"#F7431E")
        setColorTechoEmpaquetadora(result[0].est_emp==2 ? "#2264A7" :"#F7431E")
        var myHeaders = new Headers();
      })
      .catch(error => console.log('error', error));
  }

  var temp_formadora = (formadoraTemperaturaSalida >= -10 && formadoraTemperaturaSalida <= 10 ? 50 :
    formadoraTemperaturaSalida < -10 && formadoraTemperaturaSalida >= -13 ? 30 :
      formadoraTemperaturaSalida < -13 && formadoraTemperaturaSalida >= -16 ? 10 :
        formadoraTemperaturaSalida > 10 && formadoraTemperaturaSalida <= 13 ? 70 :
          formadoraTemperaturaSalida > 13 ? 90 : 0
  );
  var temp_iqf = (iqfTemperaturaSalida >= -18 && iqfTemperaturaSalida <= -15 ? 50 :
    iqfTemperaturaSalida < -18 && iqfTemperaturaSalida >= -21 ? 30 :
      iqfTemperaturaSalida < -21 && iqfTemperaturaSalida >= -24 ? 10 :
        iqfTemperaturaSalida > -15 && iqfTemperaturaSalida <= -12 ? 70 :
          iqfTemperaturaSalida > -12 ? 90 : 0
  );
  const loadGauge = (porcentaje) => {
    var w = 150
    var h = 75

    if (porcentaje == 0) {
      return <G1 width={w} height={h} />
    } else if (porcentaje > 0 && porcentaje <= 20) {
      return <G2 width={w} height={h} />
    } else if (porcentaje > 20 && porcentaje <= 40) {
      return <G3 width={w} height={h} />
    } else if (porcentaje > 40 && porcentaje <= 60) {
      return <G4 width={w} height={h} />
    } else if (porcentaje > 60 && porcentaje <= 80) {
      return <G5 width={w} height={h} />
    } else if (porcentaje > 80 && porcentaje <= 100) {
      return <G6 width={w} height={h} />
    }
  }

  useEffect(() => {

    loadData()
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
    }, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col>
            <PageTitleAlt3
              heading="SCADA"
              subheading="This is an example dashboard created using build-in elements and components."
              icon="lnr-apartment opacity-6"
              empresa="Agrosuper"
              menues={[]}
              menu_actual="Scada"
            />
          </Col>
          <Col>
            <div align="right">
              {/*  <Button className="mb-2 mr-2" color="primary">
                Descargar como Reporte
              </Button> */}
            </div>
          </Col>
        </Row>

        <Col xs="12">
          <Card className="main-card mb-3">
            <Container>
              <Row>
                <svg
                  style={{
                    flex: 1
                  }}
                  id="prefix__Capa_1"
                  x={0}
                  y={0}
                  viewBox="0 0 1550.6 1882.6"
                  xmlSpace="preserve"
                  {...props}
                >
                  <style>
                    {
                      ".prefix__st3{fill:#fff}.prefix__st67{fill:#2264a7}.prefix__st69{fill:#dbdcde}.prefix__st70{fill:#f8f8fb}.prefix__st72{enable-background:new}.prefix__st73{fill:#b3b3b3}.prefix__st74{fill:#e1b689}.prefix__st75{fill:#e0e0ff}.prefix__st82{fill:#bab5b1}.prefix__st107{fill:#ff6200}.prefix__st146{fill:#606060}.prefix__st147{font-family:&apos;SegoeUI&apos;}.prefix__st148{font-size:14.6358px}.prefix__st149,.prefix__st150,.prefix__st151{fill-rule:evenodd;clip-rule:evenodd;fill:#e6e6e6}.prefix__st150,.prefix__st151{fill:#3bcc7d}.prefix__st151{fill:#3f3e40}.prefix__st152{fill:#e6e6e6}" +
                      ".colorTechoFormadora{fill:" + colorTechoFormadora + " !important}" +
                      ".colorTechoIQF{fill:" + colorTechoIQF + " !important}" +
                      ".colorTechoEnvasadora1{fill:" + colorTechoEnvasadora1 + " !important}" +
                      ".colorTechoEnvasadora2{fill:" + colorTechoEnvasadora2 + " !important}" +
                      ".colorTechoEnvasadora3{fill:" + colorTechoEnvasadora3 + " !important}" +
                      ".colorTechoEnvasadora4{fill:" + colorTechoEnvasadora4 + " !important}" +
                      ".colorTechoEmpaquetadora{fill:" + colorTechoEmpaquetadora + " !important}"
                    }
                  </style>
                  <path
                    className="prefix__st67"
                    d="M662 593.9c-2.3 0-4.6-.6-6.6-1.8l-214-125.9 2-3.4 214 125.9c2.8 1.6 6.4 1.6 9.3 0l205.9-118.5 2 3.4-206 118.6c-2 1.1-4.3 1.7-6.6 1.7zM1067.3 871.5l-2-3.4 372.6-216.2c1.1-.6 1.8-1.8 1.8-3.1s-.7-2.4-1.8-3.1l-303.2-176.1 2-3.4 303.2 176.1c2.3 1.4 3.7 3.8 3.7 6.5s-1.4 5.1-3.7 6.5l-372.6 216.2z"
                  />
                  <path
                    transform="rotate(-30.006 1168.874 971.35)"
                    className="prefix__st67"
                    d="M1127.3 969.4h83.5v4h-83.5z"
                  />
                  <image
                    width={266}
                    height={277}
                    xlinkHref="data:image/png;base64,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 gg=="
                    transform="translate(859.16 887.033)"
                    overflow="visible"
                    opacity={0.2}
                  />
                  <g id="prefix__Axonometric_Cube_81_">
                    <path
                      id="prefix__Cube_face_-_left_99_"
                      className="prefix__st69"
                      d="M1083.9 1070.2l-81.3-48.3V914.2l81.3 48.3z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_99_"
                      className="prefix__st70"
                      d="M1114.4 1080.9l-30.5 18.3V962.5l30.5-18.3z"
                    />
                    <path
                      id="prefix__Cube_face_-_top_110_"
                      className="prefix__st3"
                      d="M1083.9 962.5l-81.3-48.3 30.5-18.3 81.3 48.3z"
                    />
                  </g>
                  <g id="prefix__Axonometric_Cube_80_">
                    <path
                      id="prefix__Cube_face_-_left_98_"
                      className="prefix__st69"
                      d="M995.2 1150.4l-81.3-47V995.7l81.3 47z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_98_"
                      className="prefix__st70"
                      d="M1083.7 1099.3l-88.5 51.1v-107.7l88.5-51.1z"
                    />
                    <path
                      id="prefix__Cube_face_-_top_109_"

                      d="M995.2 1042.7l-81.3-47 88.4-51.1 81.4 47z"
                      className={"colorTechoEnvasadora3"}
                    />
                  </g>
                  <g className="prefix__st72">
                    <path
                      className="prefix__st70"
                      d="M1058.2 1052.2l46.1-26.5v85.8l-46.1 26.5z"
                    />
                    <path
                      className="prefix__st3"
                      d="M1104.3 1025.7l-17.3-32.2-46.1 26.5 17.3 32.2z"
                    />
                    <path
                      className="prefix__st73"
                      d="M1092.8 1015.1l-9.6-17.9-36.6 21.3 9.6 18z"
                    />
                    <path
                      className="prefix__st3"
                      d="M1037.7 1018.1l46.1-26.5 3.2 1.9-46.1 26.5z"
                    />
                    <path
                      className="prefix__st69"
                      d="M1058.2 1052.2l-17.3-32.2-3.2-1.9-.1 108 20.6 11.9z"
                    />
                  </g>
                  <path
                    className="prefix__st74"
                    d="M1061.3 1020.1c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8.5 1.1.2 2.4-.8 2.9zM1067 1016.8c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM1072.6 1013.5c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.6 1 1.8 1.4 2.7.8zM1078.3 1010.2c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8zM1065.6 1023.9c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9zM1071.3 1020.6c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9zM1076.9 1017.3c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM1079.9 1013.1c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.8-1.3-2.7-.8z"
                  />
                  <path
                    className="prefix__st75"
                    d="M1061.6 1020c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8s.2 2.3-.8 2.9zM1067.3 1016.7c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.5.9 1.7 1.3 2.7.8zM1073 1013.4c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.5.9 1.7 1.3 2.7.8zM1078.7 1010.1c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.5.9 1.7 1.3 2.7.8zM1065.9 1023.7c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM1071.6 1020.4c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM1077.3 1017.1c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9zM1080.2 1012.9c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9-.5-.9-1.7-1.3-2.7-.8z"
                  />
                  <path className="prefix__st73" d="M925.2 1020.5v50.8l57.8-17.4z" />
                  <path
                    className="prefix__st70"
                    d="M925.2 1071.3l57.8 33.6v-51l-14.9-8.7z"
                  />
                  <g id="prefix__Axonometric_Cube_79_">
                    <path
                      id="prefix__Cube_face_-_left_97_"
                      className="prefix__st69"
                      d="M924.9 1153.3l-57.7-35.3v-13.8l57.7 35.3z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_97_"
                      className="prefix__st70"
                      d="M983 1117.7l-58.1 35.7v-13.9l58.1-35z"
                    />
                    <path
                      id="prefix__Cube_face_-_top_108_"
                      className="prefix__st3"
                      d="M924.9 1139.5l-57.7-35.3 58.5-33.2 57.3 33.5z"
                    />
                  </g>
                  <path
                    className="prefix__st67"
                    d="M1395.3 1145.6l-2-3.4 67.5-39c.5-.3.6-.8.6-1 0-.2-.1-.7-.6-1l-773.5-449a6.95 6.95 0 00-7.1 0L613 690.7l-2-3.4 67.3-38.5c3.4-2 7.6-2 11.1 0l773.5 449c1.6.9 2.6 2.6 2.6 4.5s-1 3.5-2.6 4.5l-67.6 38.8z"
                  />
                  <image
                    width={266}
                    height={276}
                    xlinkHref="data:image/png;base64,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"
                    transform="translate(1122.16 1040.033)"
                    overflow="visible"
                    opacity={0.2}
                  />
                  <g id="prefix__Axonometric_Cube_78_">
                    <path
                      id="prefix__Cube_face_-_left_96_"
                      className="prefix__st69"
                      d="M1347.2 1222.8l-81.3-48.3v-107.7l81.3 48.3z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_96_"
                      className="prefix__st70"
                      d="M1377.7 1233.5l-30.5 18.3v-136.7l30.5-18.3z"
                    />
                    <path
                      id="prefix__Cube_face_-_top_104_"
                      className="prefix__st3"
                      d="M1347.2 1115.1l-81.3-48.3 30.5-18.3 81.3 48.3z"
                    />
                  </g>
                  <g id="prefix__Axonometric_Cube_77_">
                    <path
                      id="prefix__Cube_face_-_left_95_"
                      className="prefix__st69"
                      d="M1258.6 1303l-81.4-47v-107.7l81.4 47z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_95_"
                      className="prefix__st70"
                      d="M1347.1 1251.9l-88.5 51.1v-107.7l88.5-51.1z"
                    />
                    <path
                      className={"colorTechoEnvasadora4"}
                      d="M1258.6 1195.3l-81.4-47 88.5-51.1 81.4 47z"
                      id="prefix__Cube_face_-_top_103_"
                    />

                  </g>
                  <g className="prefix__st72">
                    <path
                      className="prefix__st70"
                      d="M1321.5 1204.8l46.1-26.5v85.8l-46 26.5z"
                    />
                    <path
                      className="prefix__st3"
                      d="M1367.6 1178.3l-17.3-32.2-46 26.5 17.2 32.2z"
                    />
                    <path
                      className="prefix__st73"
                      d="M1356.1 1167.7l-9.6-17.9-36.6 21.3 9.6 17.9z"
                    />
                    <path
                      className="prefix__st3"
                      d="M1301 1170.7l46.1-26.5 3.2 1.9-46 26.5z"
                    />
                    <path
                      className="prefix__st69"
                      d="M1321.5 1204.8l-17.2-32.2-3.3-1.9v108l20.6 11.9z"
                    />
                  </g>
                  <path
                    className="prefix__st74"
                    d="M1324.6 1172.7c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8.6 1.1.2 2.4-.8 2.9zM1330.3 1169.4c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8zM1336 1166.1c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM1341.7 1162.8c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM1328.9 1176.5c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM1334.6 1173.2c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM1340.3 1169.9c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9zM1343.2 1165.7c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.7-1.3-2.7-.8z"
                  />
                  <path
                    className="prefix__st75"
                    d="M1325 1172.5c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8.5 1.1.2 2.4-.8 2.9zM1330.7 1169.2c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM1336.3 1165.9c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8zM1342 1162.6c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8zM1329.3 1176.3c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9zM1335 1173c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9zM1340.6 1169.7c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM1343.6 1165.5c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.8-1.3-2.7-.8z"
                  />
                  <path className="prefix__st73" d="M1188.6 1173.1v50.8l57.8-17.5z" />
                  <path
                    className="prefix__st70"
                    d="M1188.6 1223.9l57.8 33.6v-51.1l-14.9-8.6z"
                  />
                  <g id="prefix__Axonometric_Cube_76_">
                    <path
                      id="prefix__Cube_face_-_left_94_"
                      className="prefix__st69"
                      d="M1188.3 1305.9l-57.8-35.3v-13.8l57.8 35.3z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_94_"
                      className="prefix__st70"
                      d="M1246.4 1270.3l-58.1 35.7v-13.9l58.1-35z"
                    />
                    <path
                      id="prefix__Cube_face_-_top_102_"
                      className="prefix__st3"
                      d="M1188.3 1292.1l-57.8-35.3 58.6-33.2 57.3 33.5z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M1134.3 1294.5c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.1 5.3-1.1 7.4 0z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M873.3 1142.5c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.4-1.2 7.4 0z"
                    />
                  </g>
                  <path
                    className="prefix__st67"
                    d="M965.2 1393.2c-1.6 0-3.2-.4-4.6-1.2L186.8 941.7c-1.6-.9-2.5-2.5-2.5-4.3 0-1.8.9-3.4 2.5-4.3l159-92.5 2 3.4-159 92.5c-.5.3-.5.7-.5.9 0 .2.1.6.5.9l773.8 450.2c1.6.9 3.6.9 5.2 0l162.7-94 2 3.4-162.7 94c-1.4.9-3 1.3-4.6 1.3z"
                  />
                  <path
                    className="prefix__st67"
                    d="M520 1446.9l-214.8-124.8c-2.7-1.5-4.2-4.3-4.2-7.4 0-3.1 1.6-5.8 4.3-7.3l261-150.5 2 3.4-261 150.5c-1.4.8-2.3 2.3-2.3 3.9s.8 3.1 2.3 3.9l214.8 124.8-2.1 3.5z"
                  />
                  <path
                    transform="rotate(-59.843 848.83 1635.175)"
                    className="prefix__st67"
                    d="M846.9 1512.6h4V1758h-4z"
                  />
                  <g>
                    <image
                      width={255}
                      height={306}
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEzCAYAAADenN1lAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAIaJJREFUeNrsXQl34jqzFJgt+zLb 9///3Xz33VlCIAmbH5ynfhSdlm3AgCVXnaNDkiGTxHZVV7daknMEQbQWHV4C3v8zIOelpgAQzbnH nTM+B3kFMaBAUACIExK97PVcDiA3CJ/vKRYEBYBQ966I4FXGqcmfK/KHRkgQcgoCBYD3ySZ8aHTV xzj0v3fOIAArP6yPc/W+vEA4KAgUgFZHeIvkSOwMPs+M10y9pxP4WXXk/JrYSz9W8PlKjWUFsXAl zoGgACRB+iLCh8jdM16tj4tEoM68XxN74T9egCBYn+thCUaVNIKgAERzH4qiu47gQuQ+ELsPr/2C r8mQ//PUDgBJjmOuBGFu/Jv1PkscKAYUgKijvSa8JnuI5AN4HRhfw1cc2gXU/Tzo3H8JRJ6rj/Fr MmZ+WB/PDWGwxGBl1A8ICkAjo7228UJ0TeIhkH0Ir0P1b0WC0FMCU/e0YF7gAIqIjyT/8AM//jC+ rkVBfk4oVaArAPR4CS5GfG3tdVQfqjEyPh4Z7xsaAhCK/tmZawDLAouvIz+S/d0Yb/AxisKsxBms AukKHQBxVuJnytZrsl+pMYKvj2DI+weK/P1A3t9Tkf8cApCrQt7CeC0SASS9jKn63BIE/D/1DIRV L6AAECclvrb4QlZN+Jv1uIbXa0MIRiriDwtIjz/X6gk4xfOQB2oBelZAC8FCicAsIAJTPybw8VQJ gyUGiwJX0DohYApwXuJriy+kFrLLuIVXFAARCiS+/H89ld/31M/W/QL4+9UtAKFegNx9ntPXYrA0 UgMRgiIRsAY6hXcjTZCf12mrCNABnMfq67weSX9bMNABjALRvmcU9boqv7e6/s7ZCuxccTtwmRhI 5J4ZNQEtAq9+TOB1otwBigG6glXb0gIKQH3XMUT8PuTpQmYh+J0xbo3IryN+3+32AnRLorxV5e+c 6Tko6u23xMAShFB68AGOQAvBGMRAxlgJgojBDP7/ZZvSAqYA9UV9IZ5E5IEq6N0A6e/VuDOi/pWK +jraW7m8FdVDU3ydM1+jEJnyEqdg1QxwCvED0gNJDbQb2BD/xY8xfI6pwocqGLYiLaADOD7qO6O4 p23+nSL+gx/3RtQPET/UvmtF+E6E9zgvSBtCawqWBenBmxIBEYC/aqAreAchwLQgWSGgA6jH8kvE H4DVx2j/YAwkfxXiF+XyKQi69XeE3EEPiDlQKcIs4Agk6osIi9sSIRhCavCu6gOh9IUC0HLLnym7 LxFfHrJHGE+K+Hdg90dGYS8U7d2ZindNu965EoauIQYLfx0XkHa9q3oLCoBOuV78vZxAfUCu9TJF J0ABOM7yY4HvBh6wJ2Mg+W9UgW8QyO/bSPqq6aoWg5W/dpIiDLwQYPH1Gkh/44pnW8b+fryptCAp EaAAHGf5h8ruS6T/sh7Pfjz5r98ru29ZfSu3Z52mmhjI11AIcBZGd1jq3gsZkorJvcH74qD2kIQI UAD2Iz9afoz6D57oz578MjDy3xoPlxXxGe2PSxMywxVgy/UgIAbXAQHoKWGegRBELwIUgGrkF4Ji hf8G8nwh/ldF/kew/FeQ55fl+MTxzgCvp7XoKiQEViHWaptOQgQoANXILw+OPCyY6wvxv4EASOSX /HKk8nwS/7yuQO+kFBICvbpSOwDLnUUtAhSA6jm/FJNkWu8ZiK/Jj/n+qCTPJ84nBjiVqlMDXKeB +X+VexatCFAAynP+viL/oyf7Znz345snPxb7RkYU6ZL4jUkNVu5z96ZeUKU3TClClCJAAQhDHowh 2P5HIP4PEAAkv+T7A0b9RgtB5uzNWYrqM/r+WW3LUYkABcCO/ljtv/IR/dETfUP4/4AAoO2/KbH8 RHPucx4geJWp2NCipuj6BCgAn8nfNay/5PzfIPr/8G4AyS/V40xFGJK/2W6giPQW+UNrFZzbriGg A4j0oUDrj3n/Fy8AEvm/elHQkZ+WP04hCFX5i6L/KjD0ISYUgIiiv7b+D2471YcFv5Dtp+WPOyUo 40VoVaKMqI4vowDY1h+j/xNE/68kf2tFwCK+PuhkGXADFIAIIAIw8OS/g9z/C1j+B/9v185uFiH5 03YCKAB681Jre7FOk0WgxxteGP2xzRcX9UiDz4Dkb5UI6ENOcKNSPJvA2mOQAhBJ9JfcX+y/XtEn 8/xS8GOxrx0ikBvRf0N4fTYBbjYqItBYF5DxRv//nP/QbRf4yJSfTPdJ4e/Bbaf7UAC65EySz0bo VR95NnOfjyvDDUZzCkBz7b9Yf93wI+SXKb8nt23xFetP8rdDBKzPxRHocwus7cYbKwBd3mBz6k9v 3Clr+YeG9SfaEShCS8Lv3OfdniRINL4TtMub+kkAcGsva1Uf23vb/bxkSgTwjAdr+XdGAWh+DUCr Ou4VF9UNJc7qGPHMBxmy5ZssKaYDiKAGIEXAkSEAsqyX5Cf5Q+tFrpQAWAHDNfG5absA6LP75Gbq ffpp/QkrcOz73NABNLgGgLvH6rP4SH7Cem60COAI7QdBAWiwC8A94qxtoQgCuSPPxsDtnv6stxXr NPmPaCPpQ2qOW0L1jLyfDoDQ9QB9GKzeUJQOIDJLh8pO4hNFAUSnkH0XPvOhq76fAtCAm6jVXO8D Zx3PRRDWGZGZco46+jMFiCw1IIh93SMKQddFsBM0BaA4v6P9J/Z5VnQaWba/IAWggdGfIA5NI7uG IFjvpQAQROJBJIpgQgEgiHpSgCidJAWAIE4vEBQAgiAoAATRJuQUAIJoD8Hz2ESAArB7k3JeCuKA Zyc3Po/iWaIAHK7sBOEKiB+FCFAAwi4gKiUnLhok9FFg+lCQxooCBYCkJ457bpD0cmLQUgkCtwWP gPDW8c76BlIYiNx4bvC0IDwPYAliwBSgoeRfOfvU1yjOdiMuHv3leZkbo/HPUJc38dM576jii4J8 juCzs3LbQ0LlWDAZ8gw1OhXotvwGOsjf5IinOXy8MG4iwWcGyS/Rf0P6zdFgb4YI0AE09EZqC6eP e54pJacDILT1l2dm6oc+JXjZ5ODR5Y38dCP1cc941DMbhgh8bvQR4SgCH/DcNPaAUArA9oTXD7iJ r+sxUSKA9QCKAO2/uMZ39cxMwUEuVApAAWho/o8OYOJvpowp2DmsBxCM/u8QNCZKBMQBNPp5YRFw q+biADY3cLweL/5V31BOD7b7WVkZAWPshwjAu3KNLAI2FCtl51AA/voxhnRAFwSJdkZ/LPxJ5B+D Y3x3kRSP2+4ArJuKDuAvOIE3w9bRBbQv+s8Dz8pYpYzzpkd/OoDdOoAUAqWg80IXQKhgEXpOXtQz EkX+TwE43AVQANpr/+cF0X8C9j+KGSM6gHJ1FwEI3WCmAenbfz1b9KZyfxGAt5jsPwWgugvQBR5O CbYv+q/c7ry/rv5PYwwOFIByFzAO5Hh6iocuIN3oj1N/Ml2MvSLWVDF3BErABRQpfeP7vIlac/+F s6f/ou4ToQDYLsDqDByDC9BpAAWgHfb/A8g/AfK/BQTAUQDiEwBMBbDPG+3em2NnYBvtv/U8TGMl PwVgP8unbzqLge15FqT5R/f9h6K/owOIvxawqOACrH5vuoD0UkJc+DNRA1f+LWN7BigA5TceFwmh CLw5FgNTt/9lTlCegXmsQYACYEOv+hLrN1YugMXAtO2/tVLUsv+LWIMABSAcAfSuLzglyGJg+tHf mvtHFzhNIQBQAMrTgND8L4uB7Yj++t6XTf3RASQkACwGtvf+h6r/E0P4o60BUQCquQAWA9tp/+dG /j9R9zzqHaMpAMVgMbCd9h8PidH2/81FtuafAnBcRGAxsJ35v94pGkcUW35TAOpNA1gMbJf9t4p/ aP/1qT8UgIQFgMXAdtn/qq2/0Qs9BWA/F8BiYHvuc1HrbxRbflMA6gOLge2w/8m3/lIADn9AWAxM 3/4n3/pLATjeHrIYmGb0b0XrLwXgOAFgMTD96J906y8FoB4XwGJgeve2Fa2/FIDjwGJguvZ/Cfn/ u0u09ZcCcPwDw2Jg2vZf7ukUrH9Sc/8UgHrSABYD07X/mAIk1fpLAahHAKoUA5NqGEnc/odW/omQ iwBE3/pLAajXBYSKgVYakKuHj2iG/W/Nyj8KQH0IFQNDLmDJNKDR+X8rVv5RAOq1j9bCEX1cVOi0 WLqAZtn/Vqz8owCcJg1YqOgxCaQBnBJspv1vzco/CkD9AmAVkKbKBVizARSB5gh4a1b+UQDO4wIm ARewABvpKAIXt/9lJ/6K/U+6pZsCUI+VrPIgsRjYrHtWpfd/5iI99JMCcD4HkLviHWSLrCRdwOWd 20ylAJj7J9/OTQGorxawdHYxSVeT2RTUrPqNtP++q1erjZsOgChNA6xusqjPkE+M+M7tNgCJe5Ox cPb6jY4fFADCTAOsopKMd2Up6QIue88cCEFuRHgh+4YfmX/tpCgCPT4PJ8srZ0B8TX50AHmKkSUS aKL312OwHsP1GEHatoL7lFRKQAE4/gHSn1s95gsY+gEi+S9zzzqe9D1P+g3hr9fj1g+ZAsy9QHRB wJdwn13MQkABOP4h6sKDhK9oG3MV8Wn9L3//uv5eDT3x79bjwW2n/1bqfT2329W5BEcQrQhQAA4n viY/Wscr/zr0trLv35NkISlS0e75+zLyEV/SNInumBJs3qM7O0MFw6iEIONzcXC+iA/IFdjHTRR5 XI/n9fjix5P/+q1/78A/gF2KwkXqNVbE7hgRH0cGzs4qCnYCaSEFIBHiW8UizBvvgfhf1+ObH1/8 1+6VAGQUgEagaxC/D/d4AJ/3QQjk/rmYxYACcBjxh57INz53fPRR/qsf3/34Bg7g3ovFEFKCruNU 7CVTOMvViQAM4V4PlRD0lBsocgQUgETt/p2y+t886X/48R2iv2X/0QEQlxN3XcvpKaEfKjFAEdCp QahXoEMBiD/q6zz/yRP8KxBfXr8FyK+jP+3/5V1A1xCBPkR8SwRCaUG3QAga6QwoAJ+Jj1YwZPef Icf/oaK+tv23yvrrB4W43P12QH4cVi1gaIwiISgSAQpAgyN+D8iPxH8osfvfvRt49iJx5793BA9K j+SPwg1kARHoVxACTAs6TU8LMpLfzPNHnrw3Poo/AfF/GMT/5omPUf8KyN8j+aNyAx3lBvDZGATq A1XdQKNmCrIW3/Cq03o6zw/Z/Qew+xbxk1xMkqgQ6JQgU0EilBYMXHi2oJHThllLiV81z/9aEPXF 7j+47RTfFTwEoakiIi4hsJ4Zq1dAFwkx7WvstGHWMuIX5fm3rnxaT4j/xb9X2320fyR+++oDWgj6 ruHThllLyL9Pno+NPEL+byrPF7t/o+y+NR1EtKM+UMUNlE0bunOnBVniN+6YPP8/Rp4v1X2x+1ZX H/P8dtYHeorkoWJhWaGQDqDmqC8Xu2qe/93Z03r3/nvR7jPPZ30A6wNljUSWEIREgAJQE/mHEPWr tO9qux+a1qPdZ33Aqg/oVLPKtKHVO3CW8yN6iZJfF/kw8ovtlyHW/sGPO5XfD91+DR5Eu0QAn72V swvN4j6voe50C8Nylnqh2En2GuglSn60/LeK+E9qWMS/AqXuBXJ8Ep/QQpCVpKAjFZBwaIfZdbu7 SeWncAWpOYDQNk9P3tLjeHS7U3ma+ANXbcqGIByQtevsaUO94egVuIJr5TaR/CtjUABKor9Efqzw y/gCll8Ke9i9ZxX3SHzi2LRAp6YyIzUC8g/ARejNZXHrsU5dIpBSCiCWSy7snY/8UujDnn2x/NZ0 HvN8ou60wJoy1NOG8uw5t3vqtGwxr4+YpwAYFx0Lf+gApNL/1YvCnQv37NPuE+eqD+g9BzvOPrLM Oq6sFheQogPAnV5xn75niP7Ywcc8n7hUfUD3j+TOPrFYdiOu3QWkVgPouvAMwL3brtG/duzgIy5f H8D+ETlZCsk/dv93wOxrQASOdgG9RC5q0T79WG2VgovkXYz6xKXcABauMe+XU4km3r2O/cBj5ud1 uYBughfXqrYOXfmOrgRxbtdqpa56nYpedTo0glerBaATSAVwIwa9lzstP9HEoIUiIKmrNKrJlLXu Fmy9ABTlWV2j8ELLTzQxeGETm3QK3oMISP0KXcDRW8t3E7+wziA9iU80MR3QC9huIBUIuQAKQIWU gCBiSgUyt20X1i4gVAs4WAR4OjBBNCdohVzAhvwvMDbTgjIjIFOCBx1TTgEgiGa7AEwDUADe3LYv YOkOXChEASCI5roAnBbcCID0BIQag/ZeKEQBIIjmugBc1yJ9AdgYtHEBeo1ATgEgiPRcwL0nvbQG 4xoBqQXsvVCIAkAQzXcB1z7SP5SIwN4twhQAgmiuC+h5Qusdrl5VPcBKBSq5AAoAQTTbBWB34C2k Arog+OZ2pwVzCgBBxO0CLBG4c59XCko6sPdyYQoAQTQX0qmbu91zLCUVCDUHVa4FdHmNCSIaF6Cn BXGNgG4RrrROgAJAEM0WgZMuFKIAEEQcQoC1gNoWCrEGQBBxpAInWShEASCIuFxArQuFKAAEEacL CC0U2ozKC4UoAAQRpwsILRTauABrnUDXGdOCLAISRDzkD+0iLH0BD267i7DsHygnX5lb4lEACCIN F4AioGcEgjsIUwAIIl4XYK0TwBOw0AFkdAAEkY4Q4AlYkgrI1KA+8h4dAAWAIBJwAVoE9DF4+th7 TAE6FACCSEMIUARECAYG+c0aAKcBCSJO8ju3ewyezAz0wfbjOZjmORl0AASRhhNAIegq4pv2nwJA EGk4gY4iux6a+KwBEETComCR3gQFgCDSSAF0p1+lswIpAATRDoGgABAEQQEgCIICQBAEBYAgKAAE QVAACIKgABAEQQEgCIICQBAEBYAgCAoAQRAUAIIgKAAEQVAACIKgABAEQQEgCIICQBAEBYAgCAoA QRAUAIIgKAAEQVAACIKgABAEQQEgCIICQBAEBYAgCAoAQRAUAIIgKAAEQVAACIKgABAEQQEgCIIC QBAEBYAgCAoAQRAUAIIgKAAEQVAACIJIUgA6anSNr3V4uwkibQHoBkYH3kcQRAICoEmfrUfPGBm8 hyAIQC9S4str5kd/PQZ+DGEMKAIEkYYAIPEx6vc92a/W4wbG9XqMvAj0VTrAVIAgIhGAjmH5JfJL xN+Q/X49Htbj0b/eeyG4AidA8hNERALQMXJ9ye0HPsJvCH7nif8FxqP/+rUXiT6kAhQCgmiwAFh2 H4kvln9D7lsf8Z888b+vx7f1ePZfv/Hvl1oAiU8QDRWAUJ7fg1x/BMS/A9v/7MdXP559GiC1gD6j P0E0UwCK8nwk/hUQH3P+JxjPUAeQFGBA+08QzRSAKnn+yFt5TXwh/yOQXogvBcAR5P8kP0E0RAD2 yfNvjIgvr0h6Ib4U/gZut/jXpQAQxGUF4JA8X8j/pCL+o/+3WxXxhfhY+CP5CeKCAnBsno+RH6P+ bQHxM8fFQARxcQGoK8/XxL/x3zcsIT7JTxAXEIBT5Plo97Hfv+c+t/uS+ARxAQE4dZ4vxB9AxCfx CeLCAnCJPJ+LfAiiAQLAPJ8gWigAzPMJooUCwDyfIFooAMzzCaKlAsA8nyBaKADM8wmihQJg2f0e 83yCSF8AOszzCaKdAmDl+X1l95nnE0SCAqCjvkX8W+b5BJGeAGjy6wJfaCsu5vkEkZAD6EKuj8QX 0j+73X34mOcTROQCoCv9fU/iW7fddXez267su/8MUZ95PkEkkgKg/cdDNzZ77X/34ytE/jvm+QSR VgrQAwG4dbuHbvzwAoAn74yY5xNEWg4AU4B7yP3F/j8o8jPPJ4jzIz/m30M1ACwC6jn/e7e7/bbe fZdRnyDOLwK5+lh/rVAAQiv89CGc1/71yoj8JD5BXF4ELDHYqwaAqQAu+MHRd9sDN3DffYIgzmf7 V/7jlR9LP1bwWigKOgWwUoFMOYLMyPVJfoI4b74vpF/4MYcx81/TIrCXA9BuAMnOXJ8gLkN8jPhC +I/1eF+PNz8+/JgbQlBJACwhcCQ+QTSC+BL5Z57wk/V4XY+xH68gBPNjBCAkBM6VTz8QBHE8+XMg v+T4YvPfPflf1uO3H3/W468XgqkXgUWgHlAqAHnglyH5CeI8UR+Lemj5JfKPPen/XY9//OtvLwpa AFb7OIAQ6Ul+gjif3V+6bZFPiD+FyP/XE35D/P/xIvDL/9tEpQGfgnevhPArZ08x4OgWpAkEQRyX 56Pdn0LUR/KLAPzyI+QAXBUHgAKA6qPH5us4HegoBARRe56PUR+J/wdyfp3/v7ptIXBm1AA+CUDu iYsNBji/+O52pxk2HYEDt50SxMU/FAKCqC/P13ZfE/+vHy9eICb+e97dbj+AWbvrGb8Y5h0zpT6b sVkDMISov/keWQ+A/QI5RYAgjs7zJer/UeSX8eKj/cR/37v73AOQVxEAjP5LiPyoPkL+TL0X9wGg GyCIevN8i/wS8V8LiL9yJTN3mSJpR1l6af9FYutaQQidwCtBMM/fOmxJraWRZ0PuTSFPKvo/1+O/ fvzjv/6vyvffDMu/chVm7rIAYXE9gO76wz8ClSykNJ2SzwnimIhaBZ0L/46S5yPx9Vz+3wDxf/rP hfy/IfpPIfJLza406ocEwCmyh0i/hB+2UAWMfRqFKATEsaTCZ7NKv0rnAr9jUQefEF+m8f4B0uuo LwW/MeT7H/7/Wx7AP1MAQtB/xNztzhIslBuwUoROQXpAEPuQSufRliMtcgqdE/+eRXYfp/Owgee/ Bvn/x7uCP263wq+Jv3IHduhmFcmvK5XyB6EYzANpgWNaQNQcTbF4NjeeRYyIZbWpc9j9U+X5S3dk h25W8kflAfsfagyyUoN9fkEKwWXta0zFMyEW9qh8gBhoW3yK4FPF7suUHnbuHZPnV6ru1+kAQl1K 84ACW0ocyk+YFtiEL7upnZZci1DxDKfLpOtN7HGlZbBHXtOqef7U/25/A3b/kDx/5WpckJft8Qfr P3RpiMAs4AiWFRxBG9OCvCTi5YH3pHiN9iUVNsfIvPiLIo5OS+sQgn2m9eR3ROL/hHGWPL8OB2AV X6wZARSCGeQreCP2zVs6iZO/aOFVFeGM/RrtQ3ysmv/yxMJFMBg931U6EBLUqi70mGk9q7L/DxD/ pHl+HQ5A1wQsIZgHHIFOD6qmBZ1E04LQg6Tz25lyUlWiWCcBEdyneKbz5j8B+xyarj4k+u87rffT sPv/Krt/0jy/LgGokhYsCkRgdkBa0MZIpwtbM/d5UYeLXAiObZLRhbN/wQFgGvCuCoOhulQVlDmT lwp5/r+G3T95nn8KAbD2DrBqAxjJqqYFoYc5ZjdQdX4Yi1pjI5+1nMA+NjYWESxqkrHI/1uRHyPq R6A2ZXWxhn7nuqb1pLr/es48/1QOYB83MCtICxaBC5BCkbDq/DA+8NZKr2nAzlaxsZ2IiF+1SeYf o3gm1+lNkf+jQjpquVBMc0POJET80LSezFaEpiudO/OOW1mNNzdUG1hWqA2gKqfQUrxPpHuBB+kX PNi/QAQmkA5YzS5Nvk6nWAzzC6I+Et8i/Ae8Wo5AH6ShV+otCgqRx7bvniXPP4cDsIqE+6QFc5dO S/E+7aBY0daFLcsyhtKBVQOv0ykXw1jFM100LapHfRS40GXgfr2CMwlV9y8+rbcveie66daRRdYh BlO4QPKqbdzmdGI5k1COJpPNR0IPelOivl7v/QF/I270gOu8x2ATl/7vxKPaH/x7Hv37Np/fNeg6 nWPTCzz4QpNJVrFq8utnzhpyLTfXUfa9yP3/IWL110jV/qoaxCRQwC1rkY9eAJy6EVYUDJ1mMlUC IB/rB3zhb07P/9+4C9GlhCAU9a1tnNHq4n5uOrLNQADwqHZpER0DKR79tbz1Qw5vPfd1KtvjTnfx HbvphXaLWLEPbbjxDr/DVBVdH/3zduOvnwiAtPTqOg0SX7s03YNwcbt/LgGwUoJVIBLMDEcwVSqN juDW35wrt7sLUc/tHl12ru3IQnu7iQX9MCzkX7e7m+svFf1f/ffIw9Nx26Pax+qB1W2wDyXXKTuR EJTtcRdyP38N0tcRTasEnzflCF6B4LeGAGBbryY+TjvOAjM2jTxPo3dGkoTSgkVACCYqLdAP+CXt bpnNLarw/1Yj1Ma6gJ8jJzRPSyzsxHAE1+AG5ETnugSzit1/h4Kn5X6szS2PjaY6+HRLXCg6klvD AcxBAMZKfEPOZOkiOEgnO+PPSqWleN8i369AtVi3g76oBwpPebWKWnOjqKULYYd0v3UOJH5TF8NU LU6HBAELtTj7oO/X2dp3YxWA0A2JpaW4qMhXtAhEV7SrtIPOjaq0rlAX9VgUVbiPnTaMfTFM0cI2 a3YC3RvWJKZQjDxr+27sAlDlhjStpTj00OO6dNw9+ZcR6X46u4GlSqQ7pMfimO4361qlsBimyIUu nH0Yh15yrFuMGzWtF5sANL2lOPTQzyG/tWyutvs/XXhuvwrx9+2xmLnq3W9Fq+NCtZzYF8MUXU8U gQ8g/Lv7vMIwWuI3yQHs4wbO1VJcluN+uN0TW/4E8lskvkS7V7d7cssh7aBVrlNR91tZfSAP/Lzk FsME/j50NnNX3LHqXMQH5mYNI79zl28prqvIp/PbF2O66JBIV6WYWqX7raw+kFeY4Yh+MUyBCw3t y1Bl01EKwIns2alaiq0HYlmxuBUq8mFVW0f9RQ0PfF1pgVUfsHriQ+fSR70YJiAEriD1SoL4TRaA Q+3uIbsU72N1DynyWVtU7X14wwmuU6g+oNOohQvvylPkfKJZDLOHuCZD+pgEYN+0oOouxftY3Sor wEJFPm33T9UcUlZMrVofWKhX7OB7Lal3RLkYpu3oRfA7nrKlGPvlu/AzFs4+lx07+aQpRKaxLNIX beJx6uvUDVwn7IWXa4MdbpsuQll7MYJnBBfE6P59+fujWwxDAYgHp2gpFhEYgBvCY9Gtc9mxf9/q B8eNOy7RC15VMPU1eoUof++2awmKBACJH+ViGApAXChaaagLXx+BSKeXfuojz6XYhYWu31DwwqgX WghySrt/rGBabuANrsuL2y6JRQewcLvz/XpFYpSLYSgAcaIsyunKvXYD8vA+FFhdy/b/MSKefuiX DSoe7bs0W9Kda7e7Jt6ptEi7qg8X6WIYCkDc0FFOr8UPpQRjIPitYXWxuw8jvnzfNGD3m/rQ71Mf mLjtMuI+CMDSuJ6a+MzzKQAXj3IhN4BFvVcgeMgB4Ppwa933/MxFvnM4p5kn/dS/4hJrXPg0d/a5 BclPm6WGToJ/j4yu2659lw01Rt7a3rjtTADmujnkuigUehFICjmuvlZ4vXDPgK77PLWo+wWY51MA Gvlw6wd7AEJw5bZbZw2U1dXblSHx54nluJYQ4K5B2CKNZCfxKQBRCUHmR98PEQPcLsup+oG1BDnV HLdjDOfCayRIfApAtGmBOIKe290rD3NdvUtRWyJeleXSJD4FIGo3gGKgN8nUhURaXYICkLAj0F/D Knmyq8AIoq0CoIXAug5lqwYJggKQ8LUg4QmCIAiCIAiCIIjU8L8CDACtXik0UtPptQAAAABJRU5E rkJggg=="
                      transform="translate(211.16 185.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <g id="prefix__Axonometric_Cube_51_">
                      <path
                        id="prefix__Cube_face_-_left_70_"
                        className="prefix__st69"
                        d="M346.9 476.9L265.8 430V322.7l81.1 46.8z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_70_"
                        className="prefix__st70"
                        d="M435.1 426l-88.2 50.9V369.5l88.2-50.9z"
                      />
                      <path
                        className="prefix__st67 colorTechoFormadora"
                        d="M346.9 369.5l-81.1-46.8 88.2-50.9 81.1 46.8z"
                        id="prefix__Cube_face_-_top_82_"
                      />
                    </g>
                    <g className="prefix__st72">
                      <path
                        className="prefix__st70"
                        d="M409.6 379l46-26.4v85.5l-45.9 26.4z"
                      />
                      <path
                        className="prefix__st3"
                        d="M455.6 352.6l-17.3-32.1-45.9 26.4 17.2 32.1z"
                      />
                      <path
                        className="prefix__st73"
                        d="M444.1 342.1l-9.6-18-36.5 21.3 9.6 17.9z"
                      />
                      <path
                        className="prefix__st3"
                        d="M389.2 345l45.9-26.4 3.2 1.9-45.9 26.4z"
                      />
                      <path
                        className="prefix__st69"
                        d="M409.6 379l-17.2-32.1-3.2-1.9-.1 107.7 20.6 11.8z"
                      />
                    </g>
                    <path
                      className="prefix__st75"
                      d="M412.7 347c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8.5 1.1.2 2.4-.8 2.9zM418.4 343.8c1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5.9 1.7 1.3 2.7.8zM424 340.5c1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9s1.8 1.3 2.7.8zM429.7 337.2c1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.7 1.3 2.7.8zM417 350.8c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8 1-.6 1.3-1.9.8-2.9zM422.7 347.5c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8 1-.6 1.3-1.9.8-2.9zM428.3 344.2c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8 1-.6 1.4-1.9.8-2.9zM431.2 340c-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8 1-.6 1.3-1.8.8-2.9-.5-.9-1.7-1.3-2.7-.8z"
                    />
                    <g>
                      <path
                        className="prefix__st75"
                        d="M413.1 346.9c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8s.1 2.3-.8 2.9zM418.7 343.6c1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8s-1.3 1.8-.8 2.9c.5 1 1.8 1.3 2.7.8zM424.4 340.3c1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.7 1.3 2.7.8zM430 337c1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.6 1 1.8 1.3 2.7.8zM417.3 350.6c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8s1.4-1.9.8-2.9zM423 347.3c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8s1.3-1.9.8-2.9zM428.7 344c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8 1-.6 1.3-1.9.8-2.9zM431.6 339.9c-1 .6-1.3 1.8-.8 2.9.5 1 1.8 1.4 2.7.8 1-.6 1.3-1.8.8-2.9-.5-1-1.8-1.4-2.7-.8z"
                      />
                    </g>
                    <path
                      className="prefix__st70"
                      d="M282.6 256.1l23.1 58.5c.8.9 2.1 1.4 3 2.5 17.4 20.6 65.4 19.7 84.8 1.4 1.2-1.1 2.5-1.7 3.4-2.6l21.4-59.4-135.7-.4z"
                    />
                    <g id="prefix__Axonometric_Cylinder_12_">
                      <ellipse
                        id="prefix__Cylinder_face_30_"
                        cx={350.4}
                        cy={234.7}
                        rx={72.2}
                        ry={41.7}
                        fill="#f3f3f5"
                      />
                      <ellipse
                        id="prefix__Cylinder_face_29_"
                        className="prefix__st3"
                        cx={350.4}
                        cy={234.7}
                        rx={69.6}
                        ry={40.2}
                      />
                      <path
                        className="prefix__st73"
                        d="M399.7 220.6c-27.2-15.7-71.3-15.7-98.5 0-10.4 6-16.9 13.5-19.3 21.3 2.4 7.8 8.8 15.3 19.3 21.3 27.2 15.7 71.3 15.7 98.5 0 10.4-6 16.9-13.5 19.3-21.3-2.5-7.8-8.9-15.3-19.3-21.3z"
                      />
                      <path
                        id="prefix__Cylinder_body_15_"
                        className="prefix__st70"
                        d="M278.2 234.3v7.9c-.2 10.8 6.9 21.6 21.1 29.9 28.2 16.3 73.9 16.3 102.1 0 13.9-8 21-18.6 21.1-29.1v-7.9c-.2 10.5-7.2 21-21.1 29.1-28.2 16.3-73.9 16.3-102.1 0-14.2-8.2-21.2-19.1-21.1-29.9z"
                      />
                    </g>
                    <g>
                      <path className="prefix__st73" d="M277.1 347.4V398l57.6-17.4z" />
                      <path
                        className="prefix__st70"
                        d="M277.1 398l57.6 33.5v-50.9l-14.9-8.5z"
                      />
                    </g>
                    <g id="prefix__Axonometric_Cube_50_">
                      <path
                        id="prefix__Cube_face_-_left_69_"
                        className="prefix__st69"
                        d="M276.8 479.9l-57.6-35.1V431l57.6 35.2z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_69_"
                        className="prefix__st70"
                        d="M334.7 444.3l-57.9 35.8v-13.9l57.9-35z"
                      />
                      <path
                        id="prefix__Cube_face_-_top_81_"
                        className="prefix__st3"
                        d="M276.8 466.2L219.2 431l58.4-33.2 57.1 33.4z"
                      />
                    </g>
                  </g>
                  {/*}
                <g>
                    <image
                      width={255}
                      height={219}
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAADbCAYAAACiNUfqAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAFSBJREFUeNrsnQt32ji0RmUwhJBH O22nM///3907d6aTPvIAgi+spTP5OJEMJDZgs7+1tExI4qZI+7wkSyEghM5SBR8BfbuDKj5OBgg6 7f4rWujfas+vEfCjFvur7lq06Pkr97ruioAfNQx7rg0y7zcBvm/LzPsVxgD4UTPA5wAfJNrQfV28 MQ2oMvAvpT27r5diEJY7GAQE/GgL8CnAfSvddVhjAPaF34P/HNvCXX1LGQUMAfCjHYH3gGsbyXUk X5diBOoigH3CfQV/IW0ubSFXbSmDgCE4EZV8BEeFfpABvkzAPa5pI7mOXATwXs+vHt9gn8k117xx WGQMwbIm5UB4/t581jkP7726QX3h2iTx3oUzAiPn/Zvw/M/O2xvgT4n2mHhPDYKPDOoiAgT8vYM+ 5d097JcR9kv3epIxAnaPMgH/vn1dJTy/AWsQp6Bftwe56mtvDFJRAUYA+HsLvUGp3n0isGubynXq jMBkB68/DO+b8lMAn3fw/o8O+vvYHuSqzX5HowL7NzACwN/pz3SQ8PQazk8c3FeZq8Kv4Keg9+AP 3tHPBtwyYQByRkANwL20X5nrvUQHmh74SGBJTYCCX1e8vc/nRy6cN7ivY/Ovr2o8vkKfqvAPXTHx LYY+VfSrBMhU5d/AzUUAv2L7GZt/fe/Sg7kYgQIDgOfvQoifgl69vEF+u2o30hR+Az8V4tt9dSow tbinaBB+v7rPz/s/C6ypVEANgAH/Q9p3ed9HA/OamgAC/pMJ8RX6sUBvnv0mQv9Brga/evxUeF83 j++r+k2u708t161cSJ6KBlLpgEYABv5dhN+uPyQaeJC6gBoBUgHgP7kQX6v2Br3B/SG2j/Javb7m 9anQ3nt4X8kvWu7XVDQQEtHAMlEb0JTAUoGfzgCs27/y2r73S9IBLQz6KUIE/Af19qkQXz39rQCv 7YNAr97+IryerhtuCemLA/ZpVRMVpFIDXyTUSEDTgB8Cv7Y7SQnUCPhUgCiAgt9Bc/tUiG+hu4f+ t9g8+FNXyMt5+RzsxZEMn35dyfup1EANgRnHmdQ/bhLNFz7v4u9ayuBTgVR6goC/lTDfQvxRBHcq 0N864BX8W8nvNcQfhfo1+ccE/i3RoxmFgTMEo2gENDXS2Q+d9fAF0MsYBYzDy+zAY/w3NBXAAOyo IR/BzgPcz9dPJKdfg/151b6s2tdV+2PV/ozXr7F9jkbAPH8q1N9WuS86YiDrHlryDyzpcwm6DkKv TS5bRnj+N+X3pQzKaXip3q/h/+RanbfXQt57Hr/tUj1JUwP9PNUA6LTopUQDVy4CUKOgBnMmaQBR APA3mt+Pw2YV38L7z9I+iYe/jaGrDWYdsMMt4X0fjWgqhfLPOuiyZ00L/EpHXxz9JfelDgD8jeb3 Bv61eHsL9a19SoT25qksdNVVeH2HfpshyO1hkDMClzXw+wiAOgA5/7vA9/n9rXj6r5LX2/X3aAA+ ulDfBnJu2u6cP+eUsdWUwD/56B9eSqVMVeY1wvNvHZA2sAz8qYT5nyL8v0uzYt6t5KYXMlC3VfDP /TPXmQHfBx7+1EYmqYKgLoKy9QYYA+DfCr4NuEvx+Brme/A/CvgW5qcerQX6/VKBIqR3OPK7HI1q IoIQU4CAAQD+XcA3j38d8/ffHPRfJcdX8HWxThOP1Z67EQjh9Qamqf0M66YD/X0xAMCf9DRW3DPw Lcy3+fuvCfB1zn7kwMfbN5sKFFsMQS7sN9h1wdHZG4CSQfaquHfpwF97+j/Cy4IdK+p9CC9LdH1+ f+7FvKajgBBe70yUMgK5jUu9FhgA4A8S7pvHv4pgG/h/hpdq/peY4xv4Oo33nj3z0HYjkDvPwO9r MNzi9dkeDPhfhfq2au9Wcny/TNdCfQN/HN6/WSbaPQ3QGkpIGAL//dQDRv4x4OW5GoHyzMHXcF+n 83SNvoH/uQZ8wvzDpgG55x58H6R2HfJG4GwNQHmmg6guz7c5/FRxT8EfiQHB2x8nDch97v6wkdTR Ygb8IpzpMuDyjMEfOvAtz/8i8P+e8Pg2hw/4x08D7PMfZXJ8f+BI3RkBZ1cAPFfPr3m+X7br5/E/ JEJ9wD89A1CG+sNG/PFhudOCzkbDMxss6vF9Zd/W6mtl35bs6nQe4J9uCpCbZq07afg5nGnlvzyj QZLK829cnm8tV9UH/O5EAB70+R4RwFmE/+fi+XOVfcvx/xCv/1XCfVuyqwt4AP+0I4DUugCTVvpz BUBy/p56fT+f75/J14d0NNQfBubwuxIBFOLUfKjvjxjLRQFnYQTKMwLfT+tpdd/A18dyJ+H1yj3A 70YEoLMAmgKkzhfMnQ8YQs/n//se9g8S4FtlX9fs20YcWuAbO68P+N1OAYIL//0xY3bV1KDXuX/Z 80GQCvf9phy6q+512HwsdwD0ne5/M/x+6i91nuBTJgIo+moAhj0H38/nfwgvlX31+l/C5ny+FfhY ttsf768yY7DrGgDC/o51vm7MUffAjoX7N+H1tB7gd98ApIyAFfR0GnAWzqz4N+xpp+c25vgc0k/q WZ4/Ic/vbQTg39OZgPkWA4Dn74i0yKfTeraKT5/Us3A/Vd0PwN9rIxASdYB52DwIVAuAoW8RwLCH neyX8N4kwn17aOejhPsXhPu9D//1PV3y648Sn2XCfzx/B+A3r3+V8fr2tJ7O6ZeE+2fn+X3hb5Zo vTUAw551cBE2H9U1r29P6pnX18d0CffP0wjok3zP4vmfpPmTf4D/hDvW9nLzuf7vYXMDTqvu22Ie wv3zDP9D2Kz6m7fPzf33qvI/6KHnt73c9QjtW2m2426qsg/4/TcAqTUg0/ByBqO1m/D6wa5ejZFB zzrV79AzdfBrh/qz89D5aBDSezukxsqlGyu9MQB9gt/vxGsP8FzHjlTw9Tgt8vzzDP91z/+LhAFQ +P1j3cB/gkUcDfmn0pmpjiTcJ/z3ZzZMnbPIRYq9GDN98fwpKz6VDrx2IRwP7SCNGP1R7NeJcZPa 2wH4T8SKpwo41zUdCPwotRTce/9UgbgX3n/QE/C99Z6KBa/z+oT8hP4573+TSBlT27YD/5E7UZ/g u8zk+heJvA2hnPPYJfTH85+A1/dV/qtMyM/xWqhuDJVuDPnQ/6JPoX8fwn6z2qNEyH8l+dq4TyEb Ooj3v3IOpFdTfoMedNgw02lXfc3VUGu5f2rGaCpO5CL0aDn4oMMd5i32hYN/KtaaE3XRvlGkhf/T zFjq/JHsfcj5fbHPdxjTe2jf/F8jyUtp3pF0ejyVHe8sX+ybZMDH66NdI0l1JmoAJhL296Li3+Ww Pwe/ddQEr48aiCYnCQMw6kPe3/WwP2WlJ87rAz/aN5rU0P9CxtXEef5OL/UddLSDfCeNXCddhPyc LAYA1Y2r3CzSJOP5O+v9ux72D52FvnAdhNdHb/X+QxlDY+dUUrNHeP4jdJD3/LkOQuitKWXKsXS+ 4t/VsF8NQCnWeZwAf4DnR2/M+70BGEvO3/m5/r54fg9+LuTHAKB9HIsP/dUA4PmPlOvnOmfkwB8C PnqHARi6MTaqcS6dy/37lPP7kKx3Gy6igzuZfcYYnv9IOZm3ypy+g5oyAB7+UQL+ThqArof9pYPf h/x4ftSE5x8mxpiNvc6G/WWLH96hOqXcoVMQes9YKzPjbHjAvL86NfiLGuDb+BA89HUh/2DL34dQ bkxXLsWsC/3VCFQtgl9kDEF1SPiLxNVbvaKlThkkgB/vkIsBPnqr18/Vlvy4W8bfaetAz0qu2gr3 vdbg9zl34SBrM/zxG3f456x7s+YanaQB8CtJdfwt4s8sWoJfYV/Kdene28sAlHt8EEE+CB9+D523 HbSUBlgnrD983V3V79NHpR81aQBSW8XZ+JvHcfko8Ded3yvs6/YcXk4Wttf6/Z2MQLnHBzBIFD/G mSJIyus2Cf/a+q636vq4ah9Cz49VQkf3/KkDPdfj7in+zCS+bgN+9fgG/FzaLF4XsRW7GoByzw9A lzlOQvo55zYX2GhHrK3v+kDFz9EIXAeO40LtpZq2Tdx1HG+z+DPrsX8fv35uCP5t4M9ipKHtSQxB 2MUAlDuCr1tj2x55VxJyTwW83EYHRUOdoUcrXUcL/CkagmngaT7ULPwa8pvDMcAu4teP8b3nhvJ9 7/kttDfwH6LBWbefq/Yrvn6If/PcRSHVPvDXHWN0Hf/DH8LLWeaH2to4Z4lvBX4r/LGBB3rPONPx pmdALuL3RnHcP0Qg2yj2qedfxH/nKYK+Bv57bHchva9grQEo9/D4BtnH6GnX7TfJuXPwhwbh27a/ uv0NbOCBmnQ2wziulsLNJPLwJIW3qkH4tXqfgv9HhP5beH3svP5+1gCUO4Q75vFvI/BfVu33eP0U jcFNOMxxRoXL/f3jvL07RhmdTOg/krE3ilHnTMDfucr+jpx/7uBX7szh6u/5Vuv5vde3UOcmevk1 9H+s2tf4+nP0/L7YNpQ/pI35fj/7MHS1Bqr9qElHkzIEz+JVlw17fe/9teBnOb/OcKnD89OC2XUA Kc/vDy28ioB/Fvj/FM/vc+1S4AwtGYDgDIBfX0DIj5oeZ54ND1hoCfwg/8ZCvP80bJ4dWDgjYT+r KclzzvP7M8v81ManCP9XCfs/hpfz8Or2Mm/7QZ/c8mIMAHrv+KoSBqA2nG4Bfl/481uIF4m6gDU1 ABv1gDJj5Xw13abTPsdmuf5tItw/JHjFDq8RamqMqUEILeT42wxBFV4/TBQE/KfwMg1o03+PITMb kYNfPb8V+z5K0zx/El6fgFucQCchdIjxdahxVyXSXa0HzMLLvL9N/11GI5Cc/UqF/f4hBl3HrGvp 9ejr4ZHBR6jvjsYiDo2ubfpxnmE0d7RYtc3z6zHFuZNvAR+hwxsAndLLHSe+9YTqQeYfSK3l18Mw erFvOUIdjjpS51akOM0ueBskbpjbJssXGlg+i9DxDECO1TLUbzP2H++DjEXxC2kGQI9QZ4yAX/eS 3GVrsMONUzcBeoRO0wikmE1qsMNNQ2h/fz6EUHO1gJ1YHex589Q/gBA6vtffm8vBjjdECHU/Eniz 50cI9UjAjxDwI4SAHyEE/Agh4EcIAT9CCPgRQsCPEAJ+hBDwI4SAHyEE/Agh4EcIAT9CCPgRQsCP EAJ+hBDwI4SAHyEE/Agh4EcIAT9CCPgRQsCPEPAjhIAfIQT8CCHgRwgBP0II+BFCwI8QAn6EEPAj hIAfIQT8CCHgRwgBP0II+BFCwI8QAn6EEPAjhIAfIQT8CCHgRwgBP0II+BFCwI8Q8PMRIAT8CCHg RwgBP0II+BFCwI8QAn6EEPAjhIAfIQT8CCHgRwgBP0II+BFCwI8QAn6EEPAjhIAfIQT8CCHgRwgB P0II+BFCwI8QAn6EEPAjBPwIIeBHCAE/Qgj4EULAjxACfoQQ8COEgB8hBPwIIeBHCAE/Qgj4EULA jxA6Bfir2IJcEULdUZVg+c2ev9rlhgihg0P+Ji4HO9yYSAChbnr66q3w202WsVWuIYROy/vnmN0K f5W40VLac2xLjABCJwe9Z3SZYbXy8FcJb283WqzaPF4XGAGEThb6heM1xep/vA8yN7Ybrm8yW7Un aTO5+ZJaAEJHy+2XAnuO02fH6X8qt4C/vslDbPexrV9PV+1i1YarVsTfLeQ+BX2EUGvQVwnn7Bl9 iO9nDUCZCCXUmjzFm/1ctR+x3azaZNVGMXIo4u+ZIQD846o4wABExwd/EcF/XLVfwuePyOu9wL9I hP61nn8Wrcf6xt9X7d9Vu161y1UbR9jtd8bxXmoAMALHgb5qMAqrdniNDhvmm3M2b7+G/S7yae17 5PYhcrzV8/s8wuD/GW84jR5/LL9nVuhS3h9IREAacFj4C5eGvbUPUjM/qa9R+xFWlQDfPP7PCP4/ q/b3qv1ffP1v/J7Bv9gl7FegZ2JZLmIbicfXP2QmqUAp8BfAf1DoCzG+g0Q/bOuLbdO9rPc4DvzL sDnz9hjD+rWH/xah/59V+ysagbvIrXr+alvYH9w/9BTDB4N+4MB/in/IdXgpApbys4T/7Yf5Hnj7 /IeuL7Q+U2QGXGoKSaeMFglDQBrQrgFQj69FePX6a/j/NzaD/1f82YWE/WFb2O/hHoTNqr5PC9b/ yLoIeCVpwTDkZwJQs/Ar9GU01KPYD2N5b+jSsaImp1QvYxXledhc77GUAQX87cDvjbAxdy+5/j9i AP6OkYB5/aeQKfblPL+G/kX07IV730IPKwbeCvwXidAf+NsL9wfi5cfx85/EOswktudETSbUhJYz ySu1PUkO+Rx2WEKKGinyqdfX6r4V4r/Fq4X7v+LPLSTkD9s8f8r7h8wfovBb2L+t8Ieah9+iLAP/ Mhri63i9in2zFMMcwubqTr+241Giup/xei/eZCapAPC37/k9/H76/YdAfx9/Zl7n9bd5fm8A6uCf iqcZZTwMRqA9+M3rTyLsNzEa+xA2q73eqxQOfBtY6lnuZHDZwJo5rwL87RX7nsPref0HMc66sOdR Qv3Ftsis3LHgsAivVxbpAqCJ5JgjCn5Hg9+8/hr6j2FzqscX9IYC/9yFk3cSTn5z4eQD8B/c86eW 8Rro2hb7pGTlHhXH1JSDGYCxeHwt9jHXf5ic34p6Bv/3aJQfw+YiD2uX8XeK+D3rR8sh/5Zm88aa S24NKVFjnt9zp4VYX4Td64G7co8/JjUNNHfAD2tyfeBvxwBYwW8UI7BpwkP7R7Pn0WCH+P3HCPe3 8LJY5C+BX+eNa9eLo0bhDyH/aL22N02/lm/4g5YJA5BaVALs7YMfwuZU3ziTl3vwr+LPFvFr8/r/ ROj/Evhtueh9JpIIGICDhP+pRVdVyDyuu4vKN/4hOudfhPTSUnQY+DX3H4WXaboc+GvvvZ4JuIi/ P4+Rwl3C638Lm+vE55lcH/gPEw2kVle+uQ/Kd/4x+pow/7i5/6Im99NFW7/E8wfx/LpG/J8E+LNE ng/0x0kDQhNGt2zwD6vcgGRgHD4KyG3bpFN5P2JdYCQ5v60Ys6fC7gT8x0TtAG9/XAPQiMou/bGo 9vMuwua0bEjA/xChnkjfW8HPDMDP8PI8OOD3WCUfQe+8gwE6C+n9GfT5iyDf08Ujqao+lX3gRx0y AEEMgIX9uvw6hNePZutDPKzfP4NcEfWvX/3a/1KuAwe/GQD/CC+FPeBHHe5bW3uR2+Cjbv6Y/B74 UU+igNw6jLp5ZAT8qEd9nYMfT48QQggh1Ev9vwADANKk3n+B/CH6AAAAAElFTkSuQmCC"
                      transform="translate(535.962 213.785)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M768 297.2h-28.5c-.9-41.8-35.1-75.3-77.1-75.3-42 0-76.1 33.6-77.1 75.3h-28.5c-7.1 0-12.8 5.8-12.8 12.8v91.2c0 7.1 5.8 12.8 12.8 12.8h91c2.5 0 4.9.9 6.9 2.5l.7.6c6.5 7.4 6.5 7.4 14.1-.3 2-1.8 4.6-2.8 7.2-2.8H768c7.1 0 12.8-5.8 12.8-12.8V310c.1-7-5.7-12.8-12.8-12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M740.7 372.2c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M737.9 370.6c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM756.5 368.5c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M757.5 365.4c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM758.9 380.4V378c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-.9-1.4-2.1-1.4-3.4zM750.7 392.7c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(567.907 330.682)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Formadora"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Temperatura de Salida"}
                        </tspan>
                      </text>
                    </g>
                    <g transform="translate(585.363 230.662)">
                      {loadGauge(temp_formadora)}
                    </g>
                    <path
                      className="prefix__st152"
                      d="M709.6 394.5H564.2c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(567.907 380.478)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {formadoraTemperaturaSalida}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(690.414 380.478)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"\xB0C"}
                      </text>
                    </g>
                  </g> 
                  */}
                  
                  <g>
                    <image
                      width={256}
                      height={145}
                      xlinkHref="data:image/png;base64,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 QmCC"
                      transform="translate(535.16 433.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M768 558.5h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.7-.6c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8v-91.2c0-7.1 5.8-12.8 12.8-12.8H768c7.1 0 12.8 5.8 12.8 12.8v91.2c.1 7-5.7 12.8-12.8 12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M740.7 516.6c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M737.9 515c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM756.5 512.9c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M757.5 509.8c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM758.9 524.8v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-.9-1.4-2.1-1.4-3.4zM750.7 537.1c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(567.907 475.076)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Hamburguesas "}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Formadas"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M709.6 538.9H564.2c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(567.907 524.872)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {hamburguesasFormadas}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(657.24 524.872)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"unid/min"}
                      </text>
                    </g>
                  </g>
                  <g>
                    <image
                      width={256}
                      height={145}
                      xlinkHref="data:image/png;base64,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 /wswAA22m9ZG0Z1SAAAAAElFTkSuQmCC"
                      transform="translate(61.16 788.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M293.4 913.6h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.9-.7c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8v-91.2c0-7.1 5.8-12.8 12.8-12.8h211.2c7.1 0 12.8 5.8 12.8 12.8v91.2c.1 7.1-5.7 12.9-12.7 12.9z"
                    />
                    <path
                      className="prefix__st67"
                      d="M266 871.7c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.1 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M263.2 870.1c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5s2.9-3.6 5-4.2c.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.6-6.1 5.1zM281.8 868c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M282.8 864.9c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.4-3.7-4.1-6.1-5.1zM284.2 879.9v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-.9-1.4-2.1-1.4-3.4zM276 892.2c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(93.227 830.16)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Envasadora 1"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Conteo de Flow Pack"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M234.9 894H89.5c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(93.227 879.957)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {envasadora1Conteo}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(173.561 879.957)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"unid/min"}
                      </text>
                    </g>
                  </g>
                  <g>
                    <image
                      width={256}
                      height={220}
                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADcCAYAAACf+X+GAAAACXBIWXMAAAsSAAALEgHS3X78AAAA GXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAFWdJREFUeNrsnQlzGksShHuYAXT7 9nv7///dHrZl6xYwC7FdS6roHg4xHMOXER2DkAyY6czKqr5CAACcLAq+Au65Q81XRGcA3bqnxYr3 vV5BDBAIBAAc4L0rEo8L93gdB6DXOiMANeKAAIDd3ytP8NTPy1qO/MtayDyuVxAIgACADe5PiuS9 xOPU1bdVBGDiWi3XVR+HBmEACABYkfSFI7M9LuW5MvNcmXicEwFP/nHm6ts48bh24lEjBggA2Jz0 ZaJVsZWJa+73XgS8ACiRZ20kj3NtJNfc3yMGCADYkPSVtL5rg3it5Folfu4nRCAnAGNH6NcE0cfx ef2bl3jVNkoIg08rfKoAEICTIX5vCemN5NaGsQ3kOhAhGDjC993jdQTgVcjto/xISP4i7Vmuz+53 XhDsvXK1A7ADVHwFOyV+LtJXGdLPSH7m2rk8P3RC0E+QfhsOICUALyIARvineH2Mjx/lORWF14Sz 8K4AIcABdJb4ZcLWa4RXss/ahXusgjBICECVaFo/8MOBmpfn8vuUMGiEf5L2EMlvV21PIgopMWiq FwAE4KiJb0TUKG+R/Ny1C2mX8vhcyD/MRP4yU/wr5bMEJwBBiDd2bmCSEAafBjwLuY38s3bvrg8i DCkxGDW4AoSAFOBoRLWXiPje2p8nSK7XSycE55ICDF0R0Ed5rfj7IcSmeQB+GC839JdyA8+SAngR sHYnjx+cS3hK1AzG8fMiAjiAo4n6Pr/vC2nPheBXsfnHSn5v+33U10ifI/u2ZgJOXK1gEt6OCqTc gBeBO9fsOfsbEwMTk9eEIyAtQAAO1u6niK/R3oh+M23X0lQAvN0fJoi/CulDWG89QN1wrZe4hPGS tMALwZ9IfL3+cQ5BXYEKAWkBKcDBRn2t5J+5aH8dif9BriYAPuqfZUjvie9tvY/wxQaC37TIZ5kY 5AqFKSFQ4v9OtDsRAq0TkBYgAAeV6/ekuNeXiH/pSD9rH+WxRn8l/iBh83PTeYsVSV5s8H+rM/+2 bkgbcnUCLwSPzg0Y6X9N22387m6dK3jMpAUIAQKwN8vv7f65RPybSHhrn0QArp3l14ivw3dNi3mK d5D8PSlikRAHny749OAsEvdC0oNHEQITgZsoApYSmSAMRTB8WpBKWwAC0LrlLxN2/0oi/qfYPmfI r8W9QcbiN5G+2PP30CQOvYQY9F2t4CKS+UpSpFxN5DwKxCDMRxB8WoATQAB2ZvlTUf9aiP9Zmif/ pbP7/Uxuf2ikX1cQTAxUMCfh7cSns0hkHR25DOmRERPM2/ga9/KdmRsgJVgDJV/BxlHfiG8Rf0by L9P2Pba/pu3v+PjbtH2Nf2MikLL9uci/bPjukFOkEPJ7FGj65Nc9+PUOudGPEBjNQgB2RP5KOuaF RPzPkeB/CfGV/F/CvPJv0T9H/GMl/Tpi4AW1F/LrIfxU51RtBAEgBdgJ+X3kt6r+50jyr7Gp7b9y pE+tylt1v76upFH6uA6Lk6f8VOnzRPNzI7yIakpAOoAAbEx+I6sW+jTyf4ntmyP/TXhb6NNoX54Y 8ZfVC0rnCMqw2srIYVgcOfGrHW04EhFAADYiv3VEK/TdSNT/Gon/TYTgY8bqlyG/GOfUv2sdNfDC mxOCobR+gwC8ihAgAgjA2uS3yG+W/5NE/O8u8vsq/8DlrKcc9ddJDXzR0IuBjiL4+oAXAH1tRAAB WJv8mu9b1P8uzZP/IqQLfBB/sxpB06iBXwZdJWor/vtGBBCAjcivUf8vif5G/ishf59cv5W0wG+Q mtrwZJWRAUQAAViZ/JbvG/GtfQ3z4b0ryfcZp27PDTTtltxbQwAQAQRgI/L/Ha8W+T8K+bH87buB 3L6KuaXQARFAALZN/u9LyI/lb08Elm1ysgr5U6sXT1YEKsj/ZvKJVvs9+f8Ob2f1XTvyY/n3lxJs sumJ4aQnC1WQP1vwy5E/Ffkh/35SglQfLjJkX/XgUwTghDqSRv5LifzfEjk/5D8eEUhF/dwGp0r+ yakJQXWincev6psN39mKvq/hbcX/O+Q/ShFYtlNR7tzCk0oFqhPsNCnrfx0J/sWR34/zQ/7jcwK5 E4/0iDJ/xPnJiEAF+d8U/Wyij87w+xgo+B2rCHgHoLsRNR1aejIOoDyxjqLLeo38avv/IXm/beBh 03sh/2HfW39NjRA0uYHJKdYAyhMjf2q4z6b4/t1A/iHkP3oR8CmBP7p8dIou4FQEQPfx06Lf5wz5 P8ff69x+yH/cIqACME6IwOgURaA8kU6RyvvN+vtZfl/CfD2/LuyB/McnAqnH/hRkPc3IiwAOoAOd ITfebxV/T/4P8W/OwnyZKeQ/ThFIuQIvAK+undSBI6cgAKVYfxvy08k+urovV/EvIH8n0oGQEIFR QgBOpihYdrwDpAp/tqOPkv9bmO/jpxX/EvJ30g0EIbg/0PQl4QJwAEcIX/iz/fz8PH+d5kvefxr1 AHMBOjfAyK9uwB9JjgAcYfRPFf50Vx9v/ZX8RP/uOoBUGvDihECdAA7gyKO/X+Kra/ux/qcjAiGR BowTAvAS0qMCNQJwXNHf9vH/FN4W/vwiH92+G+vfXSFYxwX4ekDn0oAuCoBFfyv8XcTo/9UJgM72 s/38sP64ADu6/LkhFagRgOPJ/Zui/weJ/jrVF/KfRj2gbnABKgKaCpACHEn019z/S0P0Z8IPgqDr A16F/F4EOpcKlB27mTrur5V/v5+/Fv7OAhN+Tj0VqDNpwJOIwGsXBaDXwZvrd/q5jmT/IJbfpvoO yPtPFnqugD/49UaaHvjiV4QiAAdEfL/ox+b9Xwv5r+MN1dN6yflP1wWkpoprn/ECYKliZ4JFlxxA L6RX/ZmiX4e3x3Uz4QcR8JvEmAuwfmPtIszXh3Sqz3TNAZRLbuQl0R8k+o4PHJfSd67C26PffOBA AA5QyS3/vxTy++hP4Q8UieDhUwELHL7vdOL0py45gJyKX7kbSPQH6/afK9d/9EBSHMAB2X8t5lw4 AfCn9656lhw4HQFIuYBUH+p3xT32OkL+3M27JPqDNdIAP4p00SAAnSgGdsUB6I1TB5Aif4kAgDVc wEUikPS7Eki64gD88d5K/lz0x/6DlAvQVPLM9SVzAJ3ZLq7XgZvmVftMRMDI37nhG9C6m1QXcC4C kEslCwTgsGxb6oZ1onILdhJUtBZwLq1T6WTVoZuVE4Ah9h+s2J9CIqVUETiT/mSOkhTgQCzbwKUA esMo/oF1A0vpXIAXgU5MJusd+U3qJW6Ukp+hP7BpUEkFFu1T5gBKHMDhKHXqRlXYf7Bmn8oFl7OM AzhaF3DsAtBL1ACGLldjqy+wad+y4nJfRGDo+tZR1wGOOQUIzgH0xQUMXPRnm2+wSR/z7lLJ34nJ QF1wAL5iOxSLlqrUIgJgHXeZCzD9sFhcJgXYU56mNq3vyM+mH2ATd5lzmIOEAzhaF9AlB9BP3BzI D94TZLwLqCS4VOHtKMBROszekZPfC0A/IQCQH7xXBHwf8wGGFODAbg72H7TVz9QJMAqwxxxtmTqz 5RfYFkdyKUAuDTgaVC0SdFf2v0yocq44gxCAdaP/oaUB9SEJQLHC4zYUOUd+X5xh9h/YZgqQG23S PleH9k4OqsPi6cbvEobqnV+Mr362TTS/+i9V+af6D7bRz+pM/q/zAYau/03C20NH23QAtWsbCUH1 DuL3nPXxlrtoWQB0dVZqmSYiALbhbr0DSK06nbVR/LtRiwKghJ9Iq+Var/P+1ZpfhhFK7Xe5Qi60 TQKqANjhDX7DRgqAoK0UwO8YfCPkfw7zY8TbyPeV+GNpI3k8ce9fv1cA/H5pZcJ+5yJvmwJgx3/P Tv+1c//0DDccANi269QzA2bEvw//OzW4iAHpWUi4bQGwqK6kt5OM9Zo6xrzeVABySyNzG2/sYnqk fZZBJPyM/J/D/ORfO8ONPQDANh2ACsAs2Hx05H+IJNymAHjy+yPMZ212hPljvD7J8yPnBup1BWCV Pfd1z3S/+WZb0yP9GYBXIgI3URQGgR2AwHb7m7rOD5FgRXzuJpLvNRK03iLxDUZmi/xG/IfoRO7i 9SH2e3MEoUkEqhXJ7w9KuIlfwscwP0L5MuECQgsETCmyfaYblwYwDAje089CeLvnhJ05OYq/68d+ /+ii7rYLgLUTgBch/59p+x3brQvA6h42cgAa+S8iwT7GaGvNRMBcgD9DvQ0ByO3ffiECgAMA2w44 Q4mmVoi+CfPi3zhsfwTAV/5H8f2eYsSfEf/XtP0M8/0vCyccda4eUK2Q9yj5Z4T/Mm3fYvsSi3AW ec9cAa4tBxDC8r0ASsgPWkg7re/1o/t8cYW30IIA2NUKgC9OAKz21Rfe1eHtqECdcifVkkKbz3tm AvBXbN+n7Wt0ANchf/hm28WZnrynjkQwCgC2GWxSYjB2xba2x/8n8p7PMQW4cnWv4GoFI5eaFPoZ qxVyf8uxP0bCfxcR0Or7MFN828XMQN8K7D9ooZ/54Ogn44SWyB8SacBrWDyyPIT5KMFzbFYMTI5O VCvkPJr7f4ki8C1eP0n0z52XtovFQbmpyQERAFvoX3VCBNaedfdOAdCc3kRA598ESQ8ew3xE4DEK wWsqTakaIqoW/8wBfIpR3ybfpKruu468+1iQBE4zFfCiEFrI+VdJBeqweNSdkX9G+rtYG/gTHz/E v39dlgL4HMfG/a/DfOjPhtus8LCLwt+mNwqAXfSvXfa7WhxJITm/zQ24i/y8TqQIC8G5yljp1HHb V9L03L3+jvN+AA5ZDHb13vb+/kxMm6R3Ial5amp8Ywrgj9vWMfbUEclU2wHYvfD4jUr0ZKyVTjLu Zd7AH4+cOxaJoTYA9u8EjK+6Vkc3LclOiutlXix1GII/EgniA7B/8jdtkZfbHev/TqLXoCip/far jJ1ABAA4DCHQfTl8er7A16YUILUVMjk/AIcvBMWqPPXDdk22ogyLu/4Q/QE4LBEIYY2JeL2Gf1yE 5im2OAAADiv6h3V52VvDUkB4AI7fEawsACGk59UjAgB0BOscDVZkLAcAoGMCcLTHHQMA2nEAAAAE AACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAABAAAgAAAA BAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAIAAAAAQAA IAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAABAAAgAAAABAAAgAAAABAAAAACAABAAAAACAAAAAEA ACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAAB AAAgAAAABAAAgAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAOioAdWxBrgCAE3YA dUYgAAAdFYA6cYX4AJyAANSZBgDooADUCeJPXKvliiAAcNhY6tx7K5B/7JqKAADgMIi+UZrey7yY J/8oNhUBXAAAhx/x63UEQKO/Ef9VmheBsMqbAAB25gK8g28M0r3MC6gAvMT2KtexewMAwP6JP3Hc 9CKw4ApSKUCK/M/T9iQCMJI3QgAA2D/xUym7OvZJSgSaUgCz/0b+WXt0QsCIAAD7F4GJEN4C9ouk 7tlgnRIAUxKz/DPCP0zbfbx6ERgjBADs1fIvC9ZZx165Fy7i1V70Ob7QjPh30q6m7Wza+tNWymsV sYH9oNhxRwT7jfpjIf6jBGoN1rlAvSAAKUvxEl9kRvo/03Y7bdfTdjFtw/jve/LvShEBhGD3xK/d 9160RHhGgPYf/Y38TxKgf0v7E583F7DUAfg0QB3A7MV/xch/IdG/Jx9GBaHXYkcEaQFQ0U0JcLEF 0qcmnCAAu3NaWvAzfj5Ewv+K7We8/o5O4DHMC/f1MgFIOYCHqCbnsQ0d+S3/OI/PVyIABQKwk8hv 37deexk3VqzR6ZrGlvWKE2hfAFIFeg3O/5m2f8XrzygAdxkHUK/iANRizF5oEJsnvxUeNC0oEyIA 2ov6PfnOS3cPyjUFuQ75seWxKyhRAN5P3p+K/jPy/zNef8R0/T5y02oAC/enangzLTA8SKcqHPkt /7iMqcEg/l2JA9hJ5LdWxdYXobafSxGCXsYN1AmbOZZ+YFFH54KMwtsJJziBdh2A3Q8bnbuPAvBT HIAJgNUAXuQ+LU0BUiLwkogg9rxZkBsRgGEiDUAA2ov+pSP+IN4HuxdDJwiaMujITwjpoSUbV9Yh ppewOCkMF9B+4W/iXPe9OICfkfg/4s93ywqAywRgIp3tWX6XKkDYyMB57Gy5YiDYrgCYxTfyD+M9 uIjtUu7LmQiBuoFa7mtqDogOLz2E+fCSTjYZhxXmnYN3icAkLI7OWX3OKv+38ee7VaJ/kwAEZzv8 B9Hhh9+uk/WdAKxTfALrC4BG/7NI+ssoyjfxeh07wnm8h/3EvdfikhH/PnYo62R/wnyc2U8NRwDa s//BCcBrQpzvRKRTs3WTqFZ480lChV5dCnDmioQUAXcrAJVE/xn5Z8O1H2L7FKP1a8Kqa01Hi75G /Fuxl7exWUczFzBCAHZeBHyVNExn/Wl6pvWZ7H2pVlSgScivE3hwOaYWAJkL0H4RsHQO4CJG/Bn5 PwtR/SrOM3FqE7mfd5JX/ojFJcstb8PiBBN9XYqA7TmA2hUCfVE2t1Cv3tQBpKqQKSVS0pcNuT8C 0I4LsO9dawBXQlQ/HVQ70EAE4CUsVpX/HeZjyz/CfGxZawB+kxjQjgB4F+7v5Tikl+k33pNqgw8y SYhALzRPPgHtOACd9FOJCGgu+BwWN3OxQtIwisc4zOd7+CElE4BfUgN4zthMHMBuUgG/X2dqr86V 7kO14QcoRAyKkJ6KCnYrAqWIwHN4W6UfuWb1m7P470bx5z8x0s8i/z/D4swyLf6lVphB/t25gtyO 3Wvdg+qdH0IfY/n3mwpYOuC3cBs5u2iFvuuYLvTi8zai8yMsTiu9zZCfsf/9pwThPeJbbfED1a5T 0il27wZ8bjhxOaPO37iODqDnHICfUKKLSrztJ+rvXwTeheoYPiRY6fsuQnrHZj+JxIb5LmMNwByA jfvbcJ+O+z9B/m6i4ivoXGQwco7c73QC132Yz9o04XgWEdBJJVrtZyNYBAAcgRD4wpzfPeY+zNds FOHtPACbWOKLiEz0QQDAkbkBnxLoIq7U6k4rHprdT00qAR0Clfru318/YciGC3WthroEX0Sk0o8A gA7c49xuQUFqB3XiGiA/AgC65QZy9/5dk0oAAgC6cc8hPgAAAABAZ/FfAQYAr91T/KCRerkAAAAA SUVORK5CYII="
                      transform="translate(1194.962 349.785)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M1427.9 433.8h-28.5c-.9-41.8-35.1-75.3-77.1-75.3s-76.1 33.6-77.1 75.3h-28.5c-7.1 0-12.8 5.8-12.8 12.8v91.2c0 7.1 5.8 12.8 12.8 12.8h91c2.5 0 4.9.9 6.9 2.5l.8.6c6.5 7.4 6.5 7.4 14.1-.3 2-1.8 4.6-2.8 7.2-2.8h91.2c7.1 0 12.8-5.8 12.8-12.8v-91.2c.1-7-5.7-12.8-12.8-12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1400.6 508.8c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1397.8 507.2c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM1416.4 505.1c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1417.4 502c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM1418.8 517v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-.9-1.4-2.1-1.4-3.4zM1410.6 529.3c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(1227.8 467.282)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"IQF"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Temperatura de Salida"}
                        </tspan>
                      </text>
                    </g>
                    <g transform="translate(1245.363 370.662)">
                      {loadGauge(temp_iqf)}
                    </g>
                    <path
                      className="prefix__st152"
                      d="M1369.5 531.1h-145.4c-2.1 0-3.8-1.7-3.8-3.8V499c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(1227.8 517.078)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {iqfTemperaturaSalida}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(1348.356 517.079)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"\xB0C"}
                      </text>
                    </g>
                  </g>
           {/*       <g>
                    <image
                      width={256}
                      height={144}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(1195.16 570.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M1427.9 695.1h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.7-.6c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8v-91.2c0-7.1 5.8-12.8 12.8-12.8H1428c7.1 0 12.8 5.8 12.8 12.8v91.2c0 7-5.8 12.8-12.9 12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1400.6 653.2c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1397.8 651.6c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM1416.4 649.5c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1417.4 646.4c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM1418.8 661.4V659c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-.9-1.4-2.1-1.4-3.4zM1410.6 673.7c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(1227.8 611.677)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"IQF Velocidad"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"de Giro"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M1369.5 675.5h-145.4c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(1227.8 661.473)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {iqfVelocidadGiro}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(1335.671 661.473)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"rpm"}
                      </text>
                    </g>
                  </g>
                  */}<g>
                    <image
                      width={181}
                      height={115}
                      xlinkHref="data:image/png;base64,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 TkSuQmCC"
                      transform="translate(1017.16 1080.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M1186.2 1110.3l-126.9 73.7c-1.9 1.1-4.3 1.1-6.1 0l-25.5-15.1c-2.3-1.3-2.2-4.6 0-5.9l126.6-73.5c1.9-1.1 4.3-1.1 6.1 0l25.8 15.3c2.2 1.2 2.2 4.3 0 5.5z"
                    />
                    <g>
                      <path
                        className="prefix__st3"
                        d="M1060 1157.9l1.5.8-3.7 2.2 2.4 1.3 3.3-1.9 1.4.9-3.3 1.9 2.5 1.4 3.7-2.1 1.4.8-5.5 3.2-9.2-5.3zM1080.8 1146l5.9 7.2-2.4 1.4-12.4-3.4 1.9-1.2 9.8 2.8-4.8-5.6zM1070.1 1152.1l9.2 5.3-1.9 1.1-10.4-1.2 6.3 3.6-1.9 1.1-9.1-5.4 1.8-1 10.4 1.2-6.3-3.6zM1085.9 1143.1l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.4 4.8l2.7-1.6-5.2-1.5 2.5 3.1M1092.9 1138.8c1-.6 2-.9 3-.9 1-.1 2 .1 2.9.5l-2 1.2c-.4-.2-.8-.2-1.2-.2-.4 0-.9.1-1.3.4-.3.2-.5.4-.6.6 0 .2.1.4.5.6.3.2.6.2.9.2.3 0 .7 0 1.1-.1.4-.1.8-.2 1.4-.4.8-.2 1.5-.4 2-.5.5-.1 1.1-.1 1.8-.1.6.1 1.2.3 1.8.6.5.3.8.6.9 1 .2.4.1.8-.1 1.2-.2.4-.7.8-1.3 1.2-.6.4-1.3.7-2.1.8-.7.2-1.5.2-2.2.2s-1.4-.2-2-.5l2-1.1c.4.2.9.3 1.4.3.5 0 1-.1 1.4-.4.4-.2.6-.5.6-.7 0-.2-.2-.5-.5-.6-.3-.2-.6-.3-1-.3s-.7 0-1.1.1c-.4.1-.8.2-1.4.4-.8.2-1.4.4-2 .5-.6.1-1.1.1-1.7.1-.6-.1-1.2-.3-1.8-.6-.8-.5-1.1-1-1-1.6.1-.8.7-1.4 1.6-1.9zM1116.8 1127.6c1.1.2 2.1.5 3 1.1.9.5 1.5 1.1 1.8 1.7.3.6.3 1.3 0 1.9-.3.6-1 1.3-2 1.8l-3.3 1.9-9.2-5.3 3.3-1.9c1-.6 2.1-1 3.2-1.2 1.1-.1 2.2-.2 3.2 0zm2.5 3.9c0-.6-.4-1.2-1.4-1.7-.9-.5-1.9-.8-3-.8s-2.1.3-3.1.9l-1.3.7 5.9 3.5 1.3-.7c1.1-.7 1.6-1.3 1.6-1.9M1102.8 1133.3l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.5 4.8l2.7-1.6-5.2-1.5 2.5 3.1M1140 1111.9l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-1.9 1.1-5.7-7.2 2.1-1.2zm3.4 4.8l2.7-1.6-5.2-1.5 2.5 3.1M1137 1119.8l6 .8-2 1.2-5.7-.8-.8.5 3.6 2.1-1.9 1.1-9.2-5.3 3.5-2c1.1-.6 2.1-.9 3.2-1 1.1 0 2.1.2 2.9.7.7.4 1.1.9 1.1 1.4.2.3-.1.8-.7 1.3zm-3.8.9l1.5-.9c1.1-.6 1.1-1.2.2-1.7-.4-.3-.9-.4-1.4-.4-.5 0-1 .2-1.6.5l-1.5.9 2.8 1.6M1127.1 1121.7c1.1.2 2.1.5 3 1.1.9.5 1.5 1.1 1.8 1.8.3.7.3 1.3 0 1.9-.3.6-.9 1.2-1.7 1.7-.9.5-1.8.8-2.9 1-1.1.2-2.2.2-3.3 0-1.1-.2-2.1-.5-3-1.1-.9-.5-1.5-1.1-1.8-1.8-.3-.7-.3-1.3 0-1.9.3-.6.9-1.2 1.7-1.7.9-.5 1.8-.8 2.9-1 1.1-.2 2.2-.2 3.3 0zm2.4 3.2c-.2-.4-.6-.8-1.2-1.1-.6-.4-1.2-.6-1.9-.7-.7-.1-1.4-.1-2-.1-.7.1-1.3.3-1.8.6s-.9.7-1.1 1c-.2.4-.1.8.1 1.2.2.4.6.8 1.3 1.1.6.3 1.3.6 1.9.7.7.1 1.4.2 2 .1.6-.1 1.2-.3 1.8-.6.5-.3.9-.7 1.1-1 .1-.4.1-.8-.2-1.2M1151.5 1104.7c.6-.4 1.3-.6 1.9-.7.7-.1 1.3-.2 1.9-.1.6.1 1.1.3 1.6.5.6.3.9.7 1 1.1.1.4-.1.8-.6 1.1h.1c1.7-.5 3.1-.5 4.2.2.8.5 1.2 1 1.1 1.6 0 .6-.5 1.2-1.5 1.7-1 .6-2.1.9-3.2 1-1.1.1-2.2-.2-3.3-.7l1.8-1c.5.2 1 .4 1.6.4.5 0 1-.1 1.5-.4.4-.2.6-.5.6-.8 0-.3-.2-.5-.5-.7-.4-.3-.9-.4-1.5-.3-.6.1-1.2.3-1.8.7l-.4.2-1.5-.9.4-.2h.1c1.2-.7 1.3-1.3.5-1.7-.4-.2-.8-.3-1.2-.3-.4 0-.8.1-1.2.3-.4.2-.6.5-.6.8 0 .3.2.6.6.9l-1.8 1c-.9-.6-1.3-1.2-1.3-1.8 0-.8.5-1.4 1.5-1.9z"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={266}
                      height={277}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(338.16 584.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <g id="prefix__Axonometric_Cube_73_">
                      <path
                        id="prefix__Cube_face_-_left_91_"
                        className="prefix__st69"
                        d="M563.5 766.9l-81.3-48.2V611l81.3 48.2z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_91_"
                        className="prefix__st70"
                        d="M594 777.7L563.5 796V659.2l30.5-18.3z"
                      />
                      <path
                        id="prefix__Cube_face_-_top_99_"
                        className="prefix__st3"
                        d="M563.5 659.2L482.2 611l30.5-18.3 81.3 48.2z"
                      />
                    </g>
                    <g id="prefix__Axonometric_Cube_72_">
                      <path
                        id="prefix__Cube_face_-_left_90_"
                        className="prefix__st69"
                        d="M474.9 847.1l-81.4-46.9V692.5l81.4 46.9z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_90_"
                        className="prefix__st70"
                        d="M563.4 796.1l-88.5 51V739.4l88.5-51z"
                      />
                      <path
                        className="prefix__st67 colorTechoEnvasadora1"
                        d="M474.9 739.4l-81.4-46.9 88.5-51.1 81.4 47z"
                        id="prefix__Cube_face_-_top_98_"
                      />
                    </g>
                    <g className="prefix__st72">
                      <path
                        className="prefix__st70"
                        d="M537.8 749l46.1-26.5v85.8l-46 26.4z"
                      />
                      <path
                        className="prefix__st3"
                        d="M583.9 722.5l-17.3-32.3-46 26.5 17.2 32.3z"
                      />
                      <path
                        className="prefix__st73"
                        d="M572.4 711.9l-9.6-18-36.6 21.3 9.6 18z"
                      />
                      <path
                        className="prefix__st3"
                        d="M517.3 714.9l46.1-26.5 3.2 1.8-46 26.5z"
                      />
                      <path
                        className="prefix__st69"
                        d="M537.8 749l-17.2-32.3-3.3-1.8v108l20.6 11.8z"
                      />
                    </g>
                    <path
                      className="prefix__st74"
                      d="M540.9 716.9c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8.5 1.1.2 2.3-.8 2.9zM546.6 713.6c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM552.3 710.3c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM558 707c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM545.2 720.6c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.8.8-2.9zM550.9 717.3c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.8.8-2.9zM556.6 714c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.8.8-2.9zM559.5 709.9c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.7-1.4-2.7-.8z"
                    />
                    <g>
                      <path
                        className="prefix__st75"
                        d="M541.3 716.7c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8.5 1.1.2 2.4-.8 2.9zM547 713.4c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM552.6 710.1c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8zM558.3 706.8c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.4 2.7.8zM545.6 720.4c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.8.8-2.9zM551.2 717.1c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.4-1.8.8-2.9zM556.9 713.8c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.4-1.8.8-2.9zM559.9 709.7c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9-.6-1-1.8-1.4-2.7-.8z"
                      />
                    </g>
                    <g>
                      <path className="prefix__st73" d="M404.9 717.2V768l57.8-17.4z" />
                      <path
                        className="prefix__st70"
                        d="M404.9 768l57.8 33.7v-51.1l-14.9-8.6z"
                      />
                    </g>
                    <g id="prefix__Axonometric_Cube_71_">
                      <path
                        id="prefix__Cube_face_-_left_89_"
                        className="prefix__st69"
                        d="M404.6 850l-57.8-35.2V801l57.8 35.2z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_89_"
                        className="prefix__st70"
                        d="M462.7 814.4l-58.1 35.8v-14l58.1-34.9z"
                      />
                      <path
                        id="prefix__Cube_face_-_top_97_"
                        className="prefix__st3"
                        d="M404.6 836.2L346.8 801l58.6-33.2 57.3 33.5z"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={266}
                      height={277}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(598.16 736.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <g id="prefix__Axonometric_Cube_68_">
                      <path
                        id="prefix__Cube_face_-_left_88_"
                        className="prefix__st69"
                        d="M823 918.9l-81.3-48.3V762.9l81.3 48.3z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_88_"
                        className="prefix__st70"
                        d="M853.5 929.6L823 947.9V811.2l30.5-18.3z"
                      />
                      <path
                        id="prefix__Cube_face_-_top_96_"
                        className="prefix__st3"
                        d="M823 811.2l-81.3-48.3 30.4-18.3 81.4 48.3z"
                      />
                    </g>
                    <g id="prefix__Axonometric_Cube_67_">
                      <path
                        id="prefix__Cube_face_-_left_87_"
                        className="prefix__st69"
                        d="M734.3 999.1l-81.3-47V844.4l81.3 47z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_87_"
                        className="prefix__st70"
                        d="M822.8 948l-88.5 51.1V891.4l88.5-51.1z"
                      />
                      <path
                        className="prefix__st67 colorTechoEnvasadora2"
                        d="M734.3 891.4l-81.3-47 88.4-51 81.4 46.9z"
                        id="prefix__Cube_face_-_top_95_"
                      />
                    </g>
                    <g className="prefix__st72">
                      <path
                        className="prefix__st70"
                        d="M797.3 900.9l46.1-26.5v85.8l-46.1 26.5z"
                      />
                      <path
                        className="prefix__st3"
                        d="M843.3 874.4l-17.2-32.2-46.1 26.5 17.3 32.2z"
                      />
                      <path
                        className="prefix__st73"
                        d="M831.9 863.9l-9.6-18-36.7 21.3 9.7 18z"
                      />
                      <path
                        className="prefix__st3"
                        d="M776.8 866.8l46-26.5 3.3 1.9-46.1 26.5z"
                      />
                      <path
                        className="prefix__st69"
                        d="M797.3 900.9L780 868.7l-3.2-1.9-.1 108 20.6 11.9z"
                      />
                    </g>
                    <path
                      className="prefix__st74"
                      d="M800.4 868.9c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8s.2 2.3-.8 2.9zM806.1 865.6c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.5.9 1.7 1.3 2.7.8zM811.7 862.3c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.5.9 1.8 1.3 2.7.8zM817.4 859c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9.5.9 1.8 1.3 2.7.8zM804.7 872.6c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM810.4 869.3c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM816 866c-.5-1-1.8-1.4-2.7-.8s-1.3 1.9-.8 2.9 1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM819 861.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.8-1.3-2.7-.8z"
                    />
                    <g>
                      <path
                        className="prefix__st75"
                        d="M800.7 868.7c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8s.2 2.3-.8 2.9zM806.4 865.4c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.3 2.7.8zM812.1 862.1c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.3 2.7.8zM817.8 858.8c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.3 2.7.8zM805 872.4c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.4-1.9.8-2.9zM810.7 869.1c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM816.4 865.8c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM819.3 861.7c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.7-1.4-2.7-.8z"
                      />
                    </g>
                    <g>
                      <path className="prefix__st73" d="M664.3 869.2V920l57.8-17.4z" />
                      <path
                        className="prefix__st70"
                        d="M664.3 920l57.8 33.6v-51l-14.9-8.6z"
                      />
                    </g>
                    <g id="prefix__Axonometric_Cube_66_">
                      <path
                        id="prefix__Cube_face_-_left_85_"
                        className="prefix__st69"
                        d="M664 1002l-57.7-35.3v-13.8l57.7 35.3z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_85_"
                        className="prefix__st70"
                        d="M722.1 966.4l-58.1 35.8v-14l58.1-35z"
                      />
                      <path
                        id="prefix__Cube_face_-_top_94_"
                        className="prefix__st3"
                        d="M664 988.2l-57.7-35.3 58.5-33.2 57.3 33.5z"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={181}
                      height={115}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(757.16 929.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M925.7 959.5l-126.9 73.7c-1.9 1.1-4.3 1.1-6.1 0l-25.5-15.1c-2.3-1.3-2.2-4.6 0-5.9l126.6-73.5c1.9-1.1 4.3-1.1 6.1 0l25.8 15.3c2.1 1.2 2.1 4.3 0 5.5z"
                    />
                    <g>
                      <path
                        className="prefix__st3"
                        d="M810.2 1001.8l9.2 5.3-1.9 1.1-10.3-1.3 6.2 3.6-1.9 1.1-9.1-5.3 1.8-1.1 10.4 1.3-6.2-3.7zM799.9 1007.7l1.4.9-3.7 2.1 2.4 1.4 3.3-1.9 1.4.8-3.3 1.9 2.5 1.4 3.7-2.1 1.4.8-5.5 3.2-9.2-5.3zM843 983l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-1.9 1.1-5.7-7.2 2.1-1.2zm3.4 4.7l2.7-1.6-5.2-1.5 2.5 3.1M833 988.4c1-.6 2-.9 3-.9 1-.1 2 .1 2.9.5l-2 1.1c-.4-.2-.8-.2-1.2-.2-.4 0-.9.1-1.3.4-.3.2-.5.4-.6.6 0 .2.1.4.5.6.3.2.6.2.9.2.3 0 .7 0 1-.1.4-.1.8-.2 1.4-.4.8-.2 1.5-.4 2-.5.6-.1 1.1-.1 1.8-.1.6.1 1.2.3 1.8.6.5.3.8.6.9 1 .2.4.1.8-.1 1.2-.2.4-.7.8-1.3 1.2-.7.4-1.4.7-2.1.8-.7.2-1.5.2-2.2.2-.7-.1-1.4-.2-2-.5l2-1.1c.4.2.9.3 1.4.3.5 0 1-.1 1.4-.4.4-.2.6-.5.6-.7 0-.2-.2-.5-.5-.6-.3-.2-.6-.3-1-.3-.3 0-.7 0-1.1.1-.4.1-.8.2-1.4.4-.8.2-1.4.4-2 .5-.5.1-1.1.1-1.7.1-.6-.1-1.2-.3-1.8-.6-.8-.5-1.1-1-1-1.6.3-.7.8-1.2 1.7-1.8zM826 992.7l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.5 4.8l2.7-1.6-5.2-1.5 2.5 3.1M820.9 995.6l5.9 7.2-2.4 1.4-12.4-3.4 1.9-1.2 9.8 2.8-4.8-5.6zM867.2 971.3c1.1.2 2.1.5 3 1.1.9.5 1.5 1.1 1.8 1.8.3.7.3 1.3 0 1.9-.3.6-.9 1.2-1.8 1.7s-1.8.8-2.9 1c-1.1.2-2.2.2-3.3 0-1.1-.2-2.1-.5-3-1.1s-1.5-1.1-1.8-1.8c-.3-.7-.3-1.3 0-1.9.3-.6.9-1.2 1.8-1.7s1.8-.8 2.9-1c1.1-.2 2.2-.2 3.3 0zm2.4 3.3c-.2-.4-.6-.8-1.2-1.1-.6-.3-1.3-.6-1.9-.7-.7-.1-1.4-.2-2-.1-.7.1-1.2.3-1.8.6-.5.3-.9.7-1.1 1-.2.4-.1.8.1 1.2.2.4.6.8 1.2 1.1.6.4 1.3.6 1.9.7.7.1 1.3.2 2 .1s1.2-.3 1.8-.6c.5-.3.9-.7 1.1-1 .2-.4.2-.8-.1-1.2M857 977.3c1.1.2 2.1.5 3 1.1.9.5 1.5 1.1 1.8 1.7.3.6.3 1.3 0 1.9-.3.6-1 1.3-2 1.8l-3.3 1.9-9.2-5.3 3.3-1.9c1-.6 2.1-1 3.2-1.2 1-.2 2.1-.2 3.2 0zm2.4 3.9c0-.6-.4-1.2-1.4-1.7-.9-.5-1.9-.8-3-.8s-2.1.3-3.1.9l-1.3.7 5.9 3.5 1.3-.7c1.1-.7 1.6-1.3 1.6-1.9M892.2 954.2c1-.5 1.9-.8 2.9-.8s1.9.2 2.7.7c.6.4 1.1.9 1.4 1.4.3.6.4 1.2.3 1.9 0 .7-.2 1.3-.5 1.9l4-2.3 1.5.9-6.5 3.8-1.4-.8c.9-2.9.7-4.7-.6-5.5-.4-.2-.8-.4-1.3-.4-.4 0-.9.1-1.3.3-.9.5-.7 1.1.4 1.8l-1.8 1c-1-.7-1.5-1.3-1.5-2 .3-.8.8-1.4 1.7-1.9zM880.1 961.5l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.4-2 1.1-5.7-7.2 2.2-1.1zm3.4 4.8l2.7-1.6-5.2-1.5 2.5 3.1M877.2 969.5l6 .8-2 1.2-5.7-.8-.8.5 3.6 2.1-1.8 1.1-9.2-5.3 3.5-2c1.1-.6 2.2-.9 3.2-1 1.1 0 2.1.2 2.9.7.7.4 1.1.9 1.2 1.4-.1.3-.4.8-.9 1.3zm-3.9.9l1.5-.9c1.1-.6 1.1-1.2.2-1.7-.4-.3-.9-.4-1.4-.4-.5 0-1 .2-1.6.5l-1.5.9 2.8 1.6"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={181}
                      height={115}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(494.16 778.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M663.2 808.2l-126.9 73.7c-1.9 1.1-4.3 1.1-6.1 0l-25.5-15.1c-2.3-1.3-2.2-4.6 0-5.9l126.6-73.5c1.9-1.1 4.3-1.1 6.1 0l25.8 15.3c2.1 1.2 2.1 4.2 0 5.5z"
                    />
                    <g>
                      <path
                        className="prefix__st3"
                        d="M564.2 841.4l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.4-2 1.1-5.7-7.2 2.2-1.1zm3.5 4.8l2.7-1.6-5.2-1.5 2.5 3.1M559.1 844.2l5.9 7.2-2.4 1.4-12.4-3.4 1.9-1.2 9.8 2.8-4.8-5.6zM548.4 850.4l9.2 5.4-1.9 1-10.3-1.2 6.2 3.6-1.8 1.1-9.2-5.3 1.8-1.1 10.5 1.3-6.3-3.7zM538.2 856.3l1.4.9-3.6 2.1 2.4 1.4 3.2-1.9 1.4.8-3.2 1.9 2.4 1.4 3.7-2.1 1.5.9-5.5 3.1-9.2-5.3zM571.2 837.1c1-.6 2-.9 3-.9 1-.1 2 .1 2.9.5l-2 1.2c-.4-.2-.8-.2-1.2-.2-.4 0-.8.1-1.2.3-.3.2-.5.4-.6.6s.1.4.5.6c.3.2.6.2.9.3.3 0 .7 0 1-.1.4-.1.8-.2 1.4-.4.8-.2 1.5-.4 2-.5.5-.1 1.1-.1 1.8-.1.6.1 1.2.3 1.8.6.5.3.8.6.9 1 .2.4.1.7-.1 1.2-.2.4-.7.8-1.3 1.2-.7.4-1.3.7-2.1.8-.7.2-1.5.2-2.2.2-.7-.1-1.4-.2-2-.5l2-1.1c.4.2.9.3 1.4.3.5 0 1-.1 1.4-.4.4-.2.6-.4.6-.7 0-.2-.2-.4-.5-.6-.3-.2-.6-.3-1-.3s-.7 0-1.1.1c-.4.1-.8.2-1.4.4-.8.2-1.4.4-2 .5-.6.1-1.1.1-1.7.1-.6-.1-1.2-.3-1.8-.6-.8-.5-1.1-1-1-1.6.2-.8.7-1.3 1.6-1.9zM595.2 826c1.1.2 2.1.5 3 1.1.9.5 1.5 1.1 1.8 1.7.3.6.3 1.3 0 1.9-.3.6-1 1.3-2 1.8l-3.3 1.9-9.2-5.3 3.3-1.9c1-.6 2.1-1 3.2-1.2 1-.2 2.1-.2 3.2 0zm2.5 3.8c0-.6-.4-1.2-1.4-1.7-.9-.5-1.9-.8-3-.8s-2.1.3-3.1.9l-1.3.7 5.9 3.5 1.3-.7c1-.6 1.5-1.2 1.6-1.9M581.2 831.6l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.4 4.8l2.7-1.6-5.2-1.5 2.5 3.1M615.4 818.2l6 .8-2 1.2-5.7-.8-.8.5 3.6 2.1-1.8 1.1-9.2-5.3 3.5-2c1.1-.6 2.2-.9 3.2-1s2 .2 2.9.7c.7.4 1.1.9 1.2 1.3-.1.3-.4.9-.9 1.4zm-3.9.9l1.5-.9c1.1-.6 1.1-1.2.2-1.7-.4-.3-.9-.4-1.4-.4-.5 0-1 .2-1.6.5l-1.5.9 2.8 1.6"
                      />
                      <g className="prefix__st72">
                        <path
                          className="prefix__st3"
                          d="M630.8 802.9l9.2 5.3-2 1.1-7.4-4.3-1.4.8-1.7-1zM618.3 810.2l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.4 4.8l2.7-1.6-5.2-1.5 2.5 3.1"
                        />
                      </g>
                      <path
                        className="prefix__st3"
                        d="M605.4 820c1.1.2 2.1.5 3 1.1s1.5 1.1 1.8 1.8c.3.7.3 1.3 0 1.9-.3.6-.9 1.2-1.7 1.7-.9.5-1.8.8-2.9 1-1.1.2-2.2.2-3.3 0-1.1-.2-2.1-.5-3-1.1-.9-.5-1.5-1.1-1.8-1.8-.3-.7-.3-1.3 0-1.9.3-.6.9-1.2 1.7-1.7.9-.5 1.8-.8 2.9-1 1.1-.2 2.2-.2 3.3 0zm2.4 3.3c-.2-.4-.6-.8-1.2-1.1-.6-.4-1.3-.6-1.9-.7-.7-.1-1.4-.1-2-.1-.7.1-1.3.3-1.8.6s-.9.7-1.1 1c-.2.4-.1.8.1 1.2.2.4.6.8 1.3 1.1.6.3 1.3.6 1.9.7.7.1 1.4.2 2 .1.7-.1 1.3-.3 1.8-.6s.9-.7 1.1-1c.1-.4.1-.8-.2-1.2"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={180}
                      height={115}
                      xlinkHref="data:image/png;base64,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 GAxGk+IfAQYAg5mz2Q9e74UAAAAASUVORK5CYII="
                      transform="translate(1282.16 1233.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M1450.4 1262.8l-126.9 73.7c-1.9 1.1-4.3 1.1-6.1 0l-25.5-15.1c-2.3-1.3-2.2-4.6 0-5.9l126.6-73.5c1.9-1.1 4.3-1.1 6.1 0l25.8 15.3c2.2 1.2 2.1 4.3 0 5.5z"
                    />
                    <g>
                      <path
                        className="prefix__st3"
                        d="M1322.7 1310.9l1.4.9-3.6 2.1 2.3 1.4 3.3-1.9 1.4.8-3.3 1.9 2.5 1.4 3.7-2.1 1.5.9-5.6 3.1-9.1-5.3zM1333.2 1304.9l9.2 5.3-1.9 1.1-10.4-1.3 6.3 3.7-1.9 1-9.1-5.3 1.8-1.1 10.4 1.3-6.3-3.6zM1343.9 1298.7l5.9 7.2-2.4 1.4-12.5-3.5 2-1.1 9.8 2.8-4.8-5.7zM1356 1291.6c1-.6 2-.9 3-.9 1-.1 2 .1 2.8.5l-2 1.1c-.4-.2-.8-.2-1.2-.2-.4 0-.9.1-1.2.3-.3.2-.5.4-.6.6 0 .2.1.4.5.6.3.2.6.2.9.2.3 0 .7 0 1-.1.4-.1.8-.2 1.4-.4.8-.2 1.5-.4 2-.5.6-.1 1.1-.1 1.8-.1.6.1 1.2.3 1.8.6.5.3.8.6.9 1 .2.4.1.7-.1 1.2-.2.4-.7.8-1.3 1.2-.7.4-1.3.7-2.1.8-.7.2-1.5.2-2.2.2-.7-.1-1.4-.2-2-.5l2-1.1c.4.2.9.3 1.4.3.5 0 1-.1 1.4-.4.4-.2.6-.4.6-.7 0-.2-.2-.4-.5-.6-.3-.2-.6-.3-1-.3s-.7 0-1.1.1c-.4.1-.8.2-1.4.4-.8.2-1.4.4-2 .5-.6.1-1.1.1-1.8.1-.6-.1-1.2-.3-1.8-.6-.8-.5-1.1-1-1-1.6.3-.6.9-1.2 1.8-1.7zM1379.9 1280.4c1.1.2 2.1.5 3 1.1.9.5 1.5 1.1 1.8 1.7.3.6.3 1.3-.1 1.9-.3.6-1 1.3-2 1.8l-3.3 1.9-9.2-5.3 3.3-1.9c1-.6 2.1-1 3.2-1.2 1.2-.2 2.3-.2 3.3 0zm2.5 3.9c0-.6-.4-1.2-1.4-1.7-.9-.5-2-.8-3-.8-1.1 0-2.1.3-3.1.9l-1.3.7 5.9 3.5 1.3-.7c1.1-.7 1.6-1.3 1.6-1.9M1365.9 1286.1l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.5 4.8l2.7-1.6-5.2-1.5 2.5 3.1M1349 1295.9l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-1.9 1.1-5.7-7.2 2.1-1.2zm3.4 4.8l2.7-1.6-5.2-1.5 2.5 3.1M1423.4 1259.2l1.2-.7 1.6.9-1.2.7 1.8 1.1-1.9 1.1-1.8-1.1-4.5 2.6-1.5-.9-1.5-6 2-1.1 5.8 3.4zm-1.8 1l-3.7-2.2.9 3.8 2.8-1.6M1403.1 1264.7l12.5 3.3-2 1.1-2.5-.7-3.7 2.1 1.2 1.5-2 1.1-5.7-7.2 2.2-1.2zm3.4 4.7l2.7-1.6-5.2-1.5 2.5 3.1M1400.1 1272.6l6 .8-2 1.2-5.7-.8-.8.5 3.6 2.1-1.8 1.1-9.2-5.3 3.5-2c1.1-.6 2.2-.9 3.2-1 1.1 0 2.1.2 2.9.7.7.4 1.1.9 1.2 1.4 0 .3-.3.8-.9 1.3zm-3.8.9l1.5-.9c1.1-.6 1.1-1.2.2-1.7-.4-.3-.9-.4-1.4-.4-.5 0-1 .2-1.6.5l-1.5.9 2.8 1.6M1390.2 1274.4c1.1.2 2.1.5 3 1.1s1.5 1.1 1.8 1.8c.3.7.3 1.3 0 1.9-.3.6-.9 1.2-1.8 1.7s-1.8.8-2.9 1c-1.1.2-2.2.2-3.3 0-1.1-.2-2.1-.5-3-1.1-.9-.5-1.5-1.1-1.8-1.8-.3-.7-.3-1.3 0-1.9.3-.6.9-1.2 1.8-1.7s1.8-.8 2.9-1c1.1-.2 2.2-.2 3.3 0zm2.4 3.3c-.2-.4-.6-.8-1.3-1.1-.6-.4-1.3-.6-1.9-.7-.7-.1-1.4-.2-2-.1-.6.1-1.2.3-1.8.6-.5.3-.9.7-1.1 1-.2.4-.1.8.1 1.2.2.4.6.8 1.2 1.1.6.4 1.2.6 1.9.7.7.1 1.4.1 2 .1.7-.1 1.2-.3 1.8-.6.5-.3.9-.7 1.1-1 .3-.4.2-.8 0-1.2"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={309}
                      height={309}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(854.16 198.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st69"
                      d="M894.4 329.4v101.7l113.5 65.5V395l-22.1-64.7-69.2-40-22.2 39.1z"
                    />
                    <path className="prefix__st73" d="M918 328.4v65.8l59.4-31.5z" />
                    <path
                      className="prefix__st70"
                      d="M918 394.2l59.4 34.6v-66.1l-3.8-2.2z"
                    />
                    <path
                      className="prefix__st67 colorTechoIQF"
                      d="M985.8 330.2l144.7-83.4-69.2-40-144.8 83.5z"
                    />
                    <path
                      className="prefix__st3"
                      d="M1007.9 395l144.7-83.5-22.1-64.7-144.7 83.4z"
                    />
                    <path
                      className="prefix__st70"
                      d="M1007.9 496.6l144.7-83.4V311.5L1007.9 395z"
                    />
                    <path
                      id="prefix__Cube_face_-_left_43_"
                      className="prefix__st69"
                      d="M922.1 476.6l-59.3-36.2v-13.3l59.3 35.4z"
                    />
                    <path
                      id="prefix__Cube_face_-_right_43_"
                      className="prefix__st70"
                      d="M977.4 442.3l-55.3 34.5v-14.3l55.3-33.7z"
                    />
                    <path
                      id="prefix__Cube_face_-_top_58_"
                      className="prefix__st3"
                      d="M922.1 462.5l-59.3-35.4 55.2-32.8 59.4 34.5z"
                    />
                    <g className="prefix__st72">
                      <path
                        className="prefix__st70"
                        d="M1089.7 394.4l47.3-27.2.1 80-47.4 27.2z"
                      />
                      <path
                        className="prefix__st3"
                        d="M1137 367.2l-17.7-33.2-47.4 27.3 17.8 33.1z"
                      />
                      <path
                        className="prefix__st73"
                        d="M1125.2 356.3l-9.9-18.5-37.6 21.9 9.9 18.5z"
                      />
                      <path
                        className="prefix__st3"
                        d="M1068.6 359.3l47.3-27.2 3.4 1.9-47.4 27.3z"
                      />
                      <path
                        className="prefix__st69"
                        d="M1089.7 394.4l-17.8-33.1-3.3-2v102.9l21.1 12.2z"
                      />
                    </g>
                    <path
                      className="prefix__st75"
                      d="M1092.9 361.4c-1 .6-2.3.2-2.8-.9-.6-1.1-.2-2.4.8-3 1-.6 2.3-.2 2.8.9s.2 2.5-.8 3zM1098.7 358c1-.6 1.3-1.9.8-3-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3s1.8 1.5 2.8.9zM1104.5 354.6c1-.6 1.3-1.9.8-3s-1.8-1.4-2.8-.9c-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.5 2.8.9zM1110.4 351.3c1-.6 1.3-1.9.8-3-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .5 1 1.8 1.4 2.8.9zM1097.3 365.3c-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.7 1.3-2 .8-3zM1103.1 361.9c-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.6 1.4-2 .8-3zM1108.9 358.5c-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1.1-.6 1.4-2 .8-3zM1112 354.2c-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.6 1.3-1.9.8-3s-1.9-1.5-2.8-.9z"
                    />
                    <g>
                      <path
                        className="prefix__st75"
                        d="M1093.2 361.2c-1 .6-2.3.2-2.8-.9-.6-1.1-.2-2.4.8-3 1-.6 2.3-.2 2.8.9.6 1.1.2 2.5-.8 3zM1099.1 357.8c1-.6 1.3-1.9.8-3-.6-1.1-1.8-1.4-2.8-.9s-1.3 1.9-.8 3 1.8 1.5 2.8.9zM1104.9 354.5c1-.6 1.3-1.9.8-3-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .5 1 1.8 1.4 2.8.9zM1110.7 351.1c1-.6 1.3-1.9.8-3-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9zM1097.6 365.1c-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.7 1.4-2 .8-3zM1103.5 361.7c-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.6 1.3-2 .8-3zM1109.3 358.3c-.6-1.1-1.8-1.4-2.8-.9-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.6 1.4-2 .8-3zM1112.3 354c-1 .6-1.3 1.9-.8 3 .6 1.1 1.8 1.4 2.8.9 1-.6 1.3-1.9.8-3s-1.8-1.4-2.8-.9z"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={302}
                      height={266}
                      xlinkHref="data:image/png;base64,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 RK5CYII="
                      transform="translate(481.16 1347.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <g id="prefix__Axonometric_Cube_49_">
                      <path
                        id="prefix__Cube_face_-_left_68_"
                        className="prefix__st69"
                        d="M618 1599.9l-81.4-47v-107.7l81.4 47z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_68_"
                        className="prefix__st70"
                        d="M772.6 1510.1L618 1599.9v-107.7l154.6-89.7z"
                      />
                      <path
                        className="prefix__st67 colorTechoEmpaquetadora"
                        d="M618 1492.2l-81.4-47 154.6-89.7 81.4 47z"
                        id="prefix__Cube_face_-_top_67_"
                      />
                    </g>
                    <g className="prefix__st72">
                      <path
                        className="prefix__st70"
                        d="M694.3 1493.5l46-26.4.1 85.7-46.1 26.5z"
                      />
                      <path
                        className="prefix__st3"
                        d="M740.3 1467.1l-17.2-32.3-46.1 26.5 17.2 32.2z"
                      />
                      <path
                        className="prefix__st73"
                        d="M728.9 1456.5l-9.7-18-36.6 21.3 9.6 18z"
                      />
                      <path
                        className="prefix__st3"
                        d="M673.7 1459.4l46.1-26.5 3.3 1.9-46.1 26.5z"
                      />
                      <path
                        className="prefix__st69"
                        d="M694.3 1493.5l-17.3-32.2-3.3-1.9v108l20.6 11.9z"
                      />
                    </g>
                    <path
                      className="prefix__st82"
                      d="M697.4 1461.5c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8s.1 2.3-.8 2.9zM703 1458.2c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.3 2.7.8zM708.7 1454.9c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.3 2.7.8zM714.4 1451.6c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.3 2.7.8zM701.7 1465.2c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM707.3 1461.9c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.4-1.9.8-2.9zM713 1458.6c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.4-1.9.8-2.9zM715.9 1454.5c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.7-1.4-2.7-.8z"
                    />
                    <g>
                      <path
                        className="prefix__st70"
                        d="M697.7 1461.3c-1 .6-2.2.2-2.7-.8s-.2-2.3.8-2.9c1-.6 2.2-.2 2.7.8s.2 2.3-.8 2.9zM703.4 1458c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.3 2.7.8zM709.1 1454.7c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.7 1.3 2.7.8zM714.7 1451.4c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8c-1 .6-1.3 1.9-.8 2.9s1.8 1.3 2.7.8zM702 1465c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM707.7 1461.7c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM713.4 1458.4c-.5-1-1.8-1.4-2.7-.8-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8 1.3-1.9.8-2.9zM716.3 1454.3c-1 .6-1.3 1.9-.8 2.9s1.8 1.4 2.7.8c1-.6 1.3-1.9.8-2.9s-1.8-1.4-2.7-.8z"
                      />
                    </g>
                    <g>
                      <path className="prefix__st73" d="M547.9 1470v50.8l57.8-17.4z" />
                      <path
                        className="prefix__st70"
                        d="M547.9 1520.8l57.8 33.6v-51l-14.9-8.6z"
                      />
                    </g>
                    <g id="prefix__Axonometric_Cube_48_">
                      <path
                        id="prefix__Cube_face_-_left_64_"
                        className="prefix__st69"
                        d="M547.6 1602.8l-57.7-35.3v-13.8l57.7 35.3z"
                      />
                      <path
                        id="prefix__Cube_face_-_right_64_"
                        className="prefix__st70"
                        d="M605.7 1567.2l-58.1 35.8v-14l58.1-34.9z"
                      />
                      <path
                        id="prefix__Cube_face_-_top_66_"
                        className="prefix__st3"
                        d="M547.6 1589l-57.7-35.3 58.6-33.2 57.2 33.6z"
                      />
                    </g>
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M1401.2 1146c.9.5.3 1.6-1 1.6l-10.6.5c-.4 0-.7-.1-1-.2-.3-.2-.5-.4-.5-.6v-6.7c0-.8 1.6-1.3 2.5-.8l10.6 6.2z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M1139.4 994.3c.9.5.3 1.6-1 1.6l-10.6.5c-.4 0-.7-.1-1-.2-.3-.2-.5-.4-.5-.6v-6.7c0-.8 1.6-1.3 2.5-.8l10.6 6.2z"
                    />
                  </g>
                  <path
                    transform="rotate(-30.006 908.581 819.362)"
                    className="prefix__st67"
                    d="M866.9 817.4h83.5v4h-83.5z"
                  />
                  <g>
                    <path
                      className="prefix__st67"
                      d="M879.1 842.3c.9.5.3 1.6-1 1.6l-10.6.5c-.4 0-.7-.1-1-.2-.3-.2-.5-.4-.5-.6v-6.7c0-.8 1.6-1.3 2.5-.8l10.6 6.2z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M617.6 691.5c.9.5.3 1.6-1 1.6l-10.6.5c-.4 0-.7-.1-1-.2-.3-.2-.5-.4-.5-.6v-6.7c0-.8 1.6-1.3 2.5-.8l10.6 6.2z"
                    />
                  </g>
                  <path
                    transform="rotate(-30.006 786.749 1192.366)"
                    className="prefix__st67"
                    d="M691.2 1190.5h191.2v4H691.2z"
                  />
                  <path
                    transform="rotate(-30.006 525.915 1040.882)"
                    className="prefix__st67"
                    d="M430.5 1039h191v4h-191z"
                  />
                  <g>
                    <path
                      className="prefix__st67"
                      d="M610.9 991.8c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.3-1.2 7.4 0z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M349.7 839.6c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.4-1.2 7.4 0z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M1139.5 465.7c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.3-1.2 7.4 0z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M447.6 463.9c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.4-1.2 7.4 0z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M863.4 470.7c-.9-.5-.3-1.6 1-1.6l10.6-.5c.4 0 .7.1 1 .2.3.2.5.4.5.6v6.7c0 .8-1.6 1.3-2.5.8l-10.6-6.2z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M523.8 1441.7c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.3-1.2 7.4 0z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M948.2 1698.5c-.9.5-.3 1.6 1 1.6l10.6.5c.4 0 .7-.1 1-.2.3-.2.5-.4.5-.6v-6.7c0-.8-1.6-1.3-2.5-.8l-10.6 6.2z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st67"
                      d="M747.8 1571.9c2.1 1.2 2.1 3.1 0 4.3-2 1.2-5.4 1.2-7.4 0-2.1-1.2-2.1-3.1 0-4.3 2-1.2 5.4-1.2 7.4 0z"
                    />
                  </g>
                  <g>
                    <image
                      width={198}
                      height={125}
                      xlinkHref="data:image/png;base64,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 /SvAANz0wl37ICzsAAAAAElFTkSuQmCC"
                      transform="translate(401.16 1544.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M411.4 1574.5l143.5 83c1.9 1.1 4.3 1.1 6.1 0l25.5-15.1c2.3-1.3 2.2-4.6 0-5.9l-143.2-82.9c-1.9-1.1-4.3-1.1-6.1 0l-25.8 15.3c-2.1 1.3-2.1 4.4 0 5.6z"
                    />
                    <g>
                      <path
                        className="prefix__st3"
                        d="M442.4 1567.9l-1.7 1-3.6-2-1.9 1.1 3.1 1.8-1.6 1-3.2-1.8-2 1.2 3.5 2-1.8 1-5.7-3.3 9.2-5.3zM455.3 1575.4l-9.1 5.3-2.2-1.3 5.7-3.3-7.7 2.2-1.9-1.1 3.7-4.5-5.8 3.3-2.2-1.3 9.1-5.3 2.8 1.6-3.9 5.1 8.8-2.3zM463.6 1581c0 .6-.4 1.2-1.3 1.8-.6.3-1.2.6-1.9.7-.7.1-1.4.1-2.2 0-.8-.2-1.5-.4-2.2-.9l-1.4-.8-3.2 1.9-2.2-1.3 9.2-5.3 3.6 2.1c1 .5 1.5 1.2 1.6 1.8zm-6.1.4c.9.5 1.7.5 2.5.1.8-.5.8-1-.1-1.5l-1.1-.7-2.4 1.4 1.1.7M497.8 1599.8l-5.3 3.1c-.9.5-1.8.8-2.7 1-.9.1-1.9.1-2.7 0-.9-.2-1.7-.5-2.4-.9s-1.3-.9-1.5-1.4c-.3-.5-.3-1 0-1.5s.8-1.1 1.7-1.6l5.3-3.1 2.2 1.3-5.3 3.1c-.6.4-.9.7-1 1 0 .3.2.7.7 1 .5.3 1.1.4 1.7.4.6 0 1.2-.2 1.8-.6l5.3-3.1 2.2 1.3zM477.4 1597.8l-.4 2.6-2.7-1.5.4-1.6c-.4-.2-.8-.3-1.1-.5-.9-.5-1.4-1.1-1.8-1.7-.3-.7-.3-1.3 0-2s.9-1.2 1.8-1.8c.9-.5 1.9-.9 3-1 1.1-.2 2.2-.2 3.4 0 1.1.2 2.1.5 3 1 .9.5 1.5 1.1 1.8 1.7.3.6.3 1.3 0 1.9-.3.7-.9 1.2-1.8 1.8-.8.5-1.7.8-2.7 1-.9.1-1.9.1-2.9.1zm.8-1.8c.9 0 1.8-.3 2.6-.7.8-.5 1.2-1 1.3-1.5 0-.5-.3-1-1-1.4-.7-.4-1.5-.6-2.4-.6-.9 0-1.8.3-2.6.7s-1.2 1-1.3 1.5c0 .5.3 1 1 1.4.7.5 1.5.7 2.4.6M472.9 1585.6l-5.7 7.3-2.4-1.4 1.1-1.3-3.5-2-2.3.6-2.4-1.4 12.5-3.3 2.7 1.5zm-8.2 1.9l2.3 1.3 2.2-2.6-4.5 1.3M515.6 1610.1l-1.8 1-2.5-1.4-7.4 4.3-2.3-1.3 7.4-4.3-2.4-1.4 1.7-1.1zM506.4 1604.8l-1.8 1-3.5-2-2 1.1 3.2 1.8-1.7 1-3.1-1.8-2.1 1.2 3.5 2-1.7 1-5.8-3.3 9.2-5.3zM545.9 1630.1c-.3.7-.9 1.2-1.8 1.8-.9.5-1.9.9-3.1 1.1-1.1.2-2.3.2-3.4 0s-2.1-.5-3-1c-.9-.5-1.4-1.1-1.8-1.7-.3-.7-.3-1.3 0-2s.9-1.2 1.8-1.8c.9-.5 1.9-.9 3-1 1.1-.2 2.2-.2 3.4 0 1.1.2 2.1.5 3 1 .9.5 1.5 1.1 1.8 1.7.4.6.4 1.3.1 1.9zm-6.7 1.2c.9 0 1.8-.3 2.6-.7.8-.5 1.2-1 1.3-1.5 0-.5-.3-1-1-1.4-.7-.4-1.5-.6-2.4-.6-.9 0-1.8.3-2.6.7s-1.2 1-1.3 1.5c0 .5.3 1 1 1.4.7.4 1.5.6 2.4.6M534.2 1623.4c-.3.6-.9 1.2-1.8 1.7s-1.9.9-3 1.1c-1.1.2-2.2.2-3.3 0-1.1-.2-2.2-.6-3.2-1.1l-3.5-2 9.2-5.3 3.5 2c1 .6 1.7 1.2 2 1.8.4.6.5 1.2.1 1.8zm-6.7 1.2c.9 0 1.8-.2 2.7-.7.8-.5 1.2-1 1.2-1.5s-.5-1.1-1.4-1.6l-1.1-.6-5.2 3.1 1.1.6c.9.4 1.8.6 2.7.7M523.1 1614.5l-5.7 7.3-2.4-1.4 1.1-1.3-3.5-2-2.2.6-2.4-1.4 12.5-3.3 2.6 1.5zm-8.2 1.9l2.3 1.3 2.2-2.6-4.5 1.3M566.1 1639.4l-5.7 7.3-2.4-1.4 1.1-1.3-3.5-2-2.3.6-2.4-1.4 12.5-3.3 2.7 1.5zm-8.2 1.9l2.3 1.3 2.2-2.6-4.5 1.3M550.7 1636.8l-1.4 3.4-2.5-1.4 1.5-3.2-.5-.3-3.5 2-2.2-1.3 9.2-5.3 3.8 2.2c.7.4 1.2.9 1.5 1.3.3.4.3.9.1 1.3-.2.4-.6.8-1.1 1.1-.7.4-1.4.6-2.3.7-.9 0-1.7-.1-2.6-.5zm1.2-1.2c.4 0 .8-.1 1.2-.3.4-.2.5-.4.5-.7 0-.2-.2-.5-.7-.7l-1.4-.8-2.3 1.4 1.4.8c.5.2.9.3 1.3.3"
                      />
                    </g>
                  </g>
                  <g>
                    <image
                      width={177}
                      height={113}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(144.16 427.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M154.2 457.5L277 528.6c1.9 1.1 4.3 1.1 6.1 0l25.5-15.1c2.3-1.3 2.2-4.6 0-5.9l-122.5-71c-1.9-1.1-4.3-1.1-6.1 0l-25.8 15.3c-2.1 1.3-2.1 4.3 0 5.6z"
                    />
                  </g>
                  <g>
                    <image
                      width={118}
                      height={78}
                      xlinkHref="data:image/png;base64,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 K8AACcRX1Q6TDZkAAAAASUVORK5CYII="
                      transform="translate(856.16 476.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st107"
                      d="M866.4 506.3l64.1 36.5c1.9 1.1 4.3 1.1 6.1 0l25.5-15.1c2.3-1.3 2.2-4.6 0-5.9l-63.8-36.3c-1.9-1.1-4.3-1.1-6.1 0l-25.8 15.3c-2.1 1.2-2.1 4.3 0 5.5z"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st3"
                      d="M195.2 456.2l-1.8 1-3.8-2.2-2 1.2 3 1.7-1.7 1-3-1.7-3.7 2.1-2.2-1.3 9.2-5.3zM237.4 480.6l-5.7 7.3-2.4-1.4 1.1-1.3-3.5-2-2.2.6-2.4-1.4 12.5-3.3 2.6 1.5zm-8.2 2l2.3 1.3 2.2-2.6-4.5 1.3M229.3 475.9l-9.1 5.3-2.3-1.3 5.7-3.3-7.7 2.2-1.9-1.1 3.7-4.5-5.7 3.3-2.3-1.3 9.2-5.3 2.7 1.6-3.8 5.1 8.8-2.2zM208.8 470.5l-1.4 3.4-2.5-1.4 1.5-3.2-.5-.3-3.5 2-2.2-1.3 9.2-5.3 3.8 2.2c.7.4 1.2.9 1.5 1.3.3.4.3.9.1 1.3-.2.4-.6.8-1.1 1.1-.7.4-1.4.6-2.3.7-.9-.1-1.8-.2-2.6-.5zm1.2-1.2c.4 0 .8-.1 1.2-.3.4-.2.5-.4.5-.7 0-.2-.2-.5-.7-.7l-1.4-.8-2.3 1.4 1.4.8c.5.1.9.2 1.3.3M204 463.7c-.3.7-.9 1.2-1.8 1.8-.9.5-1.9.9-3.1 1.1-1.1.2-2.3.2-3.4 0s-2.1-.5-3-1c-.9-.5-1.4-1.1-1.8-1.7-.3-.6-.3-1.3 0-2s.9-1.2 1.8-1.8c.9-.5 1.9-.9 3-1 1.1-.2 2.2-.2 3.4 0 1.1.2 2.1.5 3 1 .9.5 1.5 1.1 1.8 1.7.4.6.4 1.3.1 1.9zm-6.7 1.2c.9 0 1.8-.3 2.6-.7.8-.5 1.2-1 1.3-1.5 0-.5-.3-1-1-1.4-.7-.4-1.5-.6-2.4-.6-.9 0-1.8.3-2.6.7-.8.5-1.2 1-1.3 1.5 0 .5.3 1 1 1.4.7.4 1.5.6 2.4.6M265 503l-1.4 3.4-2.5-1.4 1.5-3.2-.5-.3-3.5 2-2.2-1.3 9.2-5.3 3.8 2.2c.7.4 1.2.9 1.5 1.3.3.4.3.9.1 1.3-.2.4-.6.8-1.1 1.1-.7.4-1.4.6-2.3.7-.8-.1-1.7-.2-2.6-.5zm1.3-1.2c.4 0 .8-.1 1.2-.3.4-.2.5-.4.5-.7 0-.2-.2-.5-.7-.7l-1.4-.8-2.3 1.4 1.4.8c.5.1.9.2 1.3.3M260.3 496.2c-.3.7-.9 1.2-1.8 1.8-.9.5-1.9.9-3.1 1.1-1.1.2-2.3.2-3.4 0s-2.1-.5-3-1c-.9-.5-1.5-1.1-1.8-1.7-.3-.6-.3-1.3 0-2s.9-1.2 1.8-1.8c.9-.5 1.9-.9 3-1 1.1-.2 2.2-.2 3.4 0 1.1.2 2.1.5 3 1 .9.5 1.5 1.1 1.8 1.7.4.6.4 1.3.1 1.9zm-6.7 1.2c.9 0 1.8-.3 2.6-.7.8-.5 1.2-1 1.3-1.5 0-.5-.3-1-1-1.4-.7-.4-1.6-.6-2.5-.6-.9 0-1.8.3-2.6.7-.8.5-1.2 1-1.3 1.5 0 .5.3 1 1 1.4.8.4 1.6.6 2.5.6M248.6 489.5c-.3.6-.9 1.2-1.8 1.7s-1.9.9-3 1.1c-1.1.2-2.2.2-3.3 0-1.1-.2-2.2-.6-3.2-1.1l-3.5-2 9.2-5.3 3.5 2c1 .6 1.7 1.2 2 1.8.4.6.4 1.2.1 1.8zm-6.7 1.2c.9 0 1.8-.2 2.7-.7.8-.5 1.2-1 1.2-1.5s-.5-1.1-1.4-1.6l-1.1-.6-5.2 3.1 1.1.6c.8.4 1.7.7 2.7.7M280.5 505.5l-5.7 7.3-2.4-1.4 1.1-1.3-3.5-2-2.3.6-2.4-1.4 12.5-3.3 2.7 1.5zm-8.3 1.9l2.3 1.3 2.2-2.6-4.5 1.3"
                    />
                  </g>
                  <g>
                    <path
                      className="prefix__st3"
                      d="M911.2 515.2l-.4 2.6-2.7-1.5.4-1.6c-.4-.2-.8-.3-1.1-.5-.9-.5-1.4-1.1-1.8-1.7-.3-.6-.3-1.3 0-1.9.3-.7.9-1.2 1.8-1.8.9-.5 1.9-.9 3-1 1.1-.2 2.2-.2 3.4 0 1.1.2 2.1.5 3 1 .9.5 1.5 1.1 1.8 1.7.3.7.3 1.3 0 1.9-.3.7-.9 1.2-1.8 1.8-.8.5-1.7.8-2.7 1h-2.9zm.8-1.8c.9 0 1.8-.3 2.6-.7.8-.5 1.2-1 1.3-1.5 0-.5-.3-1-1-1.4-.7-.4-1.6-.6-2.5-.6-.9 0-1.8.3-2.6.7-.8.5-1.2 1-1.3 1.5 0 .5.3 1 1 1.4.7.5 1.6.7 2.5.6M909.5 504.5l-9.2 5.3-2.3-1.3 9.2-5.3zM930 516.3l-1.8 1-3.8-2.1-2 1.1 2.9 1.7-1.6 1-3-1.7-3.7 2.2-2.2-1.3 9.2-5.4z"
                    />
                  </g>
                  <g>
                    <image
                      width={256}
                      height={144}
                      xlinkHref="data:image/png;base64,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 m38EGABjsHhSy7dcYAAAAABJRU5ErkJggg=="
                      transform="translate(317.16 940.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M550 1065.1h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.7-.6c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8v-91.2c0-7.1 5.8-12.8 12.8-12.8H550c7.1 0 12.8 5.8 12.8 12.8v91.2c0 7-5.8 12.8-12.8 12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M522.6 1023.2c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.1 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M519.9 1021.6c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.6.9-4.9 2.7-6.1 5.1zM538.4 1019.5c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.4-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M539.4 1016.4c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM540.9 1031.4v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-1-.9-1.4-2.1-1.4-3.4zM532.6 1043.7c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.4 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(349.841 981.677)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Envasadora 2"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Conteo de Flow Pack"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M491.6 1045.5H346.1c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.7 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(349.842 1031.473)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {envasadora2Conteo}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(429.175 1031.474)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"unid/min"}
                      </text>
                    </g>
                  </g>
                  <g>
                    <image
                      width={256}
                      height={144}
                      xlinkHref="data:image/png;base64,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 m38EGABjsHhSy7dcYAAAAABJRU5ErkJggg=="
                      transform="translate(576.322 1085.977)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M809.1 1211h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.7-.6c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8V1107c0-7.1 5.8-12.8 12.8-12.8h211.2c7.1 0 12.8 5.8 12.8 12.8v91.2c0 7.1-5.8 12.8-12.9 12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M781.8 1169.1c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.9-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M779 1167.5c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM797.6 1165.4c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.6-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M798.6 1162.4c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.4-3.7-4.2-6.1-5.1zM800 1177.4v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-1-1.4-2.1-1.4-3.4zM791.8 1189.7c1.5 0 2.7-1.3 2.7-2.7H789c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(609.002 1127.621)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Envasadora 3"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Conteo de Flow Pack"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M750.7 1191.4H605.3c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(609.003 1177.417)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {envasadora3Conteo}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(688.336 1177.418)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"unid/min"}
                      </text>
                    </g>
                  </g>
                  <g>
                    <image
                      width={255}
                      height={145}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(839.16 1243.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M1071.1 1368.5h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.7-.6c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8v-91.2c0-7.1 5.8-12.8 12.8-12.8h211.2c7.1 0 12.8 5.8 12.8 12.8v91.2c0 7-5.8 12.8-12.9 12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1043.8 1326.6c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1041 1325c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM1059.6 1322.9c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1060.6 1319.8c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM1062 1334.9v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-1-1.4-2.1-1.4-3.4zM1053.8 1347.1c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.5 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(871.007 1285.1)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Envasadora 4"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Conteo de Flow Pack"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M1012.7 1348.9H867.3c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8h145.4c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(871.007 1334.895)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {envasadora4Conteo}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(949.341 1334.896)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"unid/min"}
                      </text>
                    </g>
                  </g>
                  <g>
                    <image
                      width={256}
                      height={144}
                      xlinkHref="data:image/png;base64,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"
                      transform="translate(787.16 1518.033)"
                      overflow="visible"
                      opacity={0.2}
                    />
                    <path
                      className="prefix__st3"
                      d="M1019.5 1642.9h-91.2c-2.7 0-5.2 1-7.2 2.8-7.6 7.7-7.6 7.7-14.1.3l-.7-.6c-1.9-1.6-4.4-2.5-6.9-2.5h-91c-7.1 0-12.8-5.8-12.8-12.8v-91.2c0-7.1 5.8-12.8 12.8-12.8h211.2c7.1 0 12.8 5.8 12.8 12.8v91.2c-.1 7-5.9 12.8-12.9 12.8z"
                    />
                    <path
                      className="prefix__st67"
                      d="M992.1 1601c-1 1.8-1.3 3.7-1 5.5 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.2-1.3 0-2.9.8-4.2.8-1.3 1.8-2.3 3.1-2.7.2-.2.3-.3.3-.5l-.3-1c0-.3-.3-.3-.6-.3-1.7.7-3.2 1.8-4.1 3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M989.3 1599.4c-1.5 2.4-1.8 5.2-1.3 7.8 0 .2.3.3.5.3l1-.2c.2 0 .3-.3.3-.5-.3-2.1 0-4.4 1.1-6.5 1.1-2.1 2.9-3.6 5-4.2.2-.2.3-.3.3-.5l-.3-1c0-.2-.3-.3-.5-.3-2.5.9-4.8 2.7-6.1 5.1zM1007.9 1597.3c-.2-.2-.5 0-.6.3l-.3 1c-.2.2 0 .5.3.5 1.3.5 2.4 1.5 3.1 2.7.8 1.3 1 2.7.8 4.2 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.3-1.8 0-3.7-1-5.5-1-1.7-2.5-2.8-4.1-3.6z"
                    />
                    <path
                      className="prefix__st67"
                      d="M1008.9 1594.2c-.2-.2-.5 0-.5.3l-.3 1c-.2.2 0 .5.3.5 2.1.8 3.9 2.3 5 4.2 1.1 2.1 1.5 4.4 1.1 6.5 0 .2.2.5.3.5l1 .2c.2 0 .5-.2.5-.3.5-2.6.2-5.3-1.3-7.8-1.6-2.3-3.7-4.1-6.1-5.1zM1010.3 1609.3v-2.4c0-4-2.6-7.1-6.3-7.9v-1c0-.8-.6-1.5-1.5-1.5h-.8c-.8 0-1.5.6-1.5 1.5v1c-3.9.8-6.3 3.9-6.3 7.9v2.4c0 1.3-.5 2.4-1.1 3.4-.3.5-.5.8-.5 1.5v.2c0 1.5 1.1 2.6 2.6 2.6h14.7c1.5 0 2.6-1.1 2.6-2.6v-.2c0-.5-.2-1-.5-1.5-.9-1-1.4-2.1-1.4-3.4zM1002.1 1621.5c1.5 0 2.7-1.3 2.7-2.7h-5.5c.2 1.4 1.3 2.7 2.8 2.7z"
                    />
                    <g>
                      <text transform="translate(819.316 1559.49)">
                        <tspan
                          x={0}
                          y={0}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Empaquetadora"}
                        </tspan>
                        <tspan
                          x={0}
                          y={17.6}
                          className="prefix__st146 prefix__st147 prefix__st148"
                        >
                          {"Conteo de Empaques"}
                        </tspan>
                      </text>
                    </g>
                    <path
                      className="prefix__st152"
                      d="M961 1623.3H815.6c-2.1 0-3.8-1.7-3.8-3.8v-28.3c0-2.1 1.7-3.8 3.8-3.8H961c2.1 0 3.8 1.7 3.8 3.8v28.3c0 2.1-1.7 3.8-3.8 3.8z"
                    />
                    <g>
                      <text
                        transform="translate(819.317 1609.286)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {empaquetadoraConteoEmpaques}
                      </text>
                    </g>
                    <g>
                      <text
                        transform="translate(898.65 1609.287)"
                        className="prefix__st146 prefix__st147 prefix__st148"
                      >
                        {"unid/min"}
                      </text>
                    </g>
                  </g>
                </svg>
              </Row>
            </Container>
          </Card>
        </Col>
      </ReactCSSTransitionGroup>


      <Col xs="12">
        <Card>

          <CardHeader className="card-header-tab">
            <Col>
              <div className="modal-title font-size-md header-card-padding text-uppercase font-weight-bold">
                Funcionamiento de la linea de producción
                 </div>
            </Col>
          </CardHeader>

          <CardBody className="card-body-tab">
            <TimeLine />
          </CardBody>

        </Card>
      </Col>





    </Fragment>



  );
}

export default Scada2
