import { Button, Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter, Link, Route } from 'react-router-dom'

import { Form } from 'reactstrap';
import {
    setOpenAlert, setUserLogin,
    userLoginFetch
} from '../../../actions/dashboardActions';
import TransitionAlerts from './Alerta/view';
import './css/login.scss';
import img1 from "./img/foto-agrosuper-login2.png";
import vigalablogo from "./img/vigalablogo.png";
import agrologo from "./img/logo-header.png";

//const Dashboards = lazy(() => import('../../DemoPages/Dashboards'));

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const LoginBoxed = (props) => {
    const [login, setLogin] = useState({
        username: "",
        password: ""
    })
    const [dataUser, SetDataUser] = useState({})
    const [guest, setGuest] = useState(0)
    const [imgRandom, setImgRandom] = useState(img1)
    const [redirect, setRedirect] = useState(false);
    const [texto, setTexto] = useState("Monitoreo en tiempo real de líneas de producción   \njunto a Fábricas Inteligentes de Vigalab");
    const [vamos, setVamos] = useState("/")
    const [alerta, setAlerta] = useState(false)
    const random = () => {
        var x = Math.floor((Math.random() * 10) + 1);
        if (x >= 7 || 1 == 1) {
            setImgRandom(img1)
            setTexto("Monitoreo en tiempo real de líneas de producción   \njunto a Fábricas Inteligentes de Vigalab")
        } else if (x > 3 && x < 7) {
            setImgRandom(img1)
            setTexto(`Cuida a tus cercanos \ndetectando a tiempo el Covid`)
        } else {
            setImgRandom(img1)
            setTexto(`Cuida a tus cercanos \ndetectando a tiempo el Covid`)
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            random();
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });

    };
    useEffect(() => {

        checkUser()
    }, [login])

    useEffect(() => {
        // random()
        props.setUserLogin({ Token: "1" })
        checkUser()
    }, [])
    const logear = async () => {

        await props.userLoginFetch(login)
        await checkUser()
        if (autenticated.json) {
            props.setOpenAlert(false)
        } else {
            props.setOpenAlert(true)
        }

    }

    const classes = useStyles();

    const [autenticated, setAutenticated] = useState(0)
    var formdata = new FormData();
    const checkUser = () => {

        var myHeaders = new Headers();
        myHeaders.append("x-api-key", `${process.env.REACT_APP_DASHBOARD_API_KEY}`);
        myHeaders.append("Content-Type", "application/json");
        var raw = ""
        if (localStorage.getItem("perfil") == "1" || localStorage.getItem("perfil") == "2" || localStorage.getItem("perfil") == "3") {
            raw = JSON.stringify({
                "id": localStorage.getItem("id_user"),
                "token": localStorage.getItem("token")
            });
        }
        else {
            raw = JSON.stringify({
                "id": "GG",
                "token": "GG"
            });
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(global.api.auth.verification, requestOptions)
            .then((response) => response.json())
            .then((json) => {
                if (json[0].auth > 0)
                    setAutenticated(1)
                else
                    setAutenticated(0)

            })
            .catch(error => console.log('error', error))

    }

    if (autenticated === 1) {
        props.setOpenAlert(false)
        return <Redirect to='/dashboards/minimal-dashboard-1' />;
    } else {
        
    }


    return (
        <div className="fondo">
            <Fragment>

                <Grid container xs={12} className=" body_aux">
                    <TransitionAlerts open={props.openAlert} />
                    <Grid xs={12}>
                        <img src={agrologo} className="img_logo" />
                    </Grid>
                    <Grid xs={1}>

                    </Grid>
                    <Hidden smDown>
                        <Grid md="5" xs="12" >
                            <p className="parrafo">{texto}</p>
                            <img src={imgRandom} className="img_circulo" />
                        </Grid>
                    </Hidden>

                    <Grid md="5" xs="12" className=" ">


                        <div className="modal-dialog w-100 mx-auto">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="h5 modal-title text-center">
                                        <h4 className="mt-2">
                                            <div className="titulo">BIENVENIDO</div>
                                        </h4>
                                    </div>
                                    <Form>

                                        <Grid md={12}>

                                            <TextField
                                                fullWidth
                                                value={login.username}

                                                name="username"
                                                id="filled-start-adornment"
                                                onChange={handleChange}
                                                className="campos_login"
                                                //className={clsx(classes.margin, classes.textField)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start"><MailOutlineIcon className="iconos" /></InputAdornment>,
                                                }}
                                                placeholder={"Email"}
                                            />

                                        </Grid>
                                        <Grid md={12}>
                                            <TextField
                                                fullWidth
                                                value={login.password}
                                                type="password"
                                                name="password"
                                                id="filled-start-adornment"
                                                onChange={handleChange}
                                                className="campos_login"
                                                //className={clsx(classes.margin, classes.textField)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon className="iconos" /></InputAdornment>,
                                                }}
                                                placeholder={"Contraseña"}
                                            />

                                        </Grid>

                                        <Grid container xs={12} className="link">


                                            <FormControlLabel className="link"
                                                control={
                                                    <Checkbox
                                                        color="primary"

                                                        //checked={jason} 
                                                        //onChange={handleChange} 
                                                        name="recordarme" />}
                                                label="Recordarme"
                                            />

                                        </Grid>

                                    </Form>
                                </div>
                                <div className="modal-footer clearfix">
                                    <div className="float-left">
                                        <Typography className={classes.root}>
                                            <Link href="#" className="link">Olvidé mi contraseña</Link>
                                        </Typography>
                                    </div>
                                    <div className="float-right">


                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button className="boton" onClick={logear} variant="contained">
                                            INGRESAR
                                    </Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center text-white  mt-3 copyright" >
                            Copyright &copy; VigaLab 2020
                        </div>
                        


                    </Grid>
                    <div className="fondo"   >                           
                    <Hidden only={['md', 'lg', 'xl']}>
                        <img className="vigalablogo2" src={vigalablogo} />
                    </Hidden>
                    <Hidden only={['xs', 'sm']}>
                        <img className="vigalablogo" src={vigalablogo} />
                    </Hidden>
                    </div> 
                </Grid>


            </Fragment>
        </div>
    )
};
const mapStateToProps = state => ({
    userLogin: state.dashboardReducers.userLogin,
    openAlert: state.dashboardReducers.openAlert

});
const mapDispatchToProps = dispatch => ({

    setUserLogin: data => dispatch(setUserLogin(data)),
    userLoginFetch: data => dispatch(userLoginFetch(data)),
    setOpenAlert: enable => dispatch(setOpenAlert(enable)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginBoxed));


