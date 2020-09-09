import {
    SET_OPEN_ALERT,
    SET_USER_LOGIN, 
    SET_SELECCIONADOS,
    SET_REMOVE_SELECCIONADOS,
    SET_ACTUALIZAR
    } from '../types/dashboardTypes'
import md5 from 'md5'

export  const setOpenAlert = openAlert => ({
    type: SET_OPEN_ALERT,
    openAlert
});
export  const setUserLogin = userLogin => ({
    type: SET_USER_LOGIN,
    userLogin
});
export  const setSeleccionados = seleccionados => ({
    type: SET_SELECCIONADOS,
    seleccionados
});
export  const setRemoveSeleccionados = seleccionados => ({
    type: SET_REMOVE_SELECCIONADOS,
    seleccionados
});

export const userLoginFetch = (user) =>{
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", `${process.env.REACT_APP_DASHBOARD_API_KEY}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "token":"bff21727-c0ab-4992-bce7-8a8053d2e3cd",
        "user":user.username,
        "pass":md5(user.password)});
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    return async dispatch =>{
    await fetch(global.api.auth.login2, requestOptions)
    .then(response => response.json())
    .then( result => {
        if(result.Token==1){
            localStorage.clear()
        }else{
            localStorage.setItem("token", result[0].Token)
            localStorage.setItem("id_user", result[0].Id_user)
            localStorage.setItem("division", result[0].Division)
            localStorage.setItem("empresa", result[0].Empresa)
            localStorage.setItem("perfil", result[0].Perfil )
            localStorage.setItem("img", result[0].img)
            dispatch(setUserLogin(result[0]))
        }
    })
    .catch(error => console.log('error', error))
    }
}

export  const setActualizar = actualizar => ({
    type: SET_ACTUALIZAR,
    actualizar
});

