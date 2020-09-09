const awsApiUrl2 = "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/"
//Api dashboard
const dashboard = {
    create_user:                awsApiUrl2 + "create-user", 
    update_user:                awsApiUrl2 + "update-user", 
    reset_password:             awsApiUrl2 + "reset-password",
    delete_user:                awsApiUrl2 + "delete-user",
    list_user:                  awsApiUrl2 + "list-user",
    getUsuariosConCuarentena:   awsApiUrl2 + "getusuariosconcuarentena",
    getUsuariosSinCuarentena:   awsApiUrl2 + "getusuariossincuarentena",
    putEstadoUsuarios:          awsApiUrl2 + "putestadousuarios", 
    getTcorporal:               awsApiUrl2 + "gettcorporal",
    getcontactosestrechos:      awsApiUrl2 + "getcontactosestrechos",
    getAllAlert:                awsApiUrl2 + "getallalert",
    getUltimasDiezAlertas:      awsApiUrl2 + "getultimasdiezalertas",
    getAlertUser:               awsApiUrl2 + "getalertuser",
    getEncargado:               awsApiUrl2 + "getencargado",
    getGerencia:                awsApiUrl2 + "getgerencia",
    getSuperintendencia:        awsApiUrl2 + "getsuperintendencia",
    createSuperintendencia:     awsApiUrl2 + "createsuperintendencia",
    createGerencia:             awsApiUrl2 + "creategerencia",
    updateSuperintendencia:     awsApiUrl2 + "updatesuperintendencia",
    updateGerencia:             awsApiUrl2 + "updategerencia",
    deleteSuperintendencia:     awsApiUrl2 + "deletesuperintendencia",
    deleteGerencia:             awsApiUrl2 + "deletegerencia"      

}

//Api auth
const auth = {
    login2:         awsApiUrl2 + "login",
    verification:   awsApiUrl2 + "verification",
}

module.exports = global.api ={
    dashboard,
    auth
};
