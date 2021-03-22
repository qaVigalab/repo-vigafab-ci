const awsApiUrl2 = "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/"
//Api dashboard
const dashboard = {
    actualizarHorarios:         awsApiUrl2 + "actualizarhorarios",
    Agrosuper_excel_ordenes:    awsApiUrl2 + "Agrosuper_excel_ordenes",
    agrosuper_excel_paros:      awsApiUrl2 + "agrosuper_excel_paros",
    create_user:                awsApiUrl2 + "create-user", 
    deletesuborden:             awsApiUrl2 + "deletesuborden",
    editOrden:                  awsApiUrl2 + "editorden",
    getEficienciaPorMinuto:     awsApiUrl2 + "geteficienciaporminuto",
    getenvasadora:              awsApiUrl2 + "getenvasadora",    
    getdetalleparo:             awsApiUrl2 + "getdetalleparo",
    getfullscreen:              awsApiUrl2 + "getfullscreen",
    getfullscreenoperativa:     awsApiUrl2 + "getfullscreenoperativa",
    getmaquinas:                awsApiUrl2 + "getmaquinas",
    getordenes:                 awsApiUrl2 + "getordenes",
    getOrdenesResumen:          awsApiUrl2 + "getordenesresumen",
    getparosgeneral:            awsApiUrl2 + "getparosgeneral",
    getparosmaquina:            awsApiUrl2 + "getparosmaquina",
    getproducto:                awsApiUrl2 + "getproducto",
    getresumenhistoricoEnv:     awsApiUrl2 + "getresumenhistoricoEnv",
    getreportehistoricolinea:   awsApiUrl2 + "getreportehistoricolinea",
    getReportesByOrden:         awsApiUrl2 + "getreportesbyorden",
    getresumenenvasadoras:      awsApiUrl2 + "getresumenenvasadoras",
    getresumenhistorico:        awsApiUrl2 + "getresumenhistorico",
    getresumenlinea:            awsApiUrl2 + "getresumenlinea",
    getresumenmaquina:          awsApiUrl2 + "getresumenmaquina",
    getscada:                   awsApiUrl2 + "getscada",
    gettempformadora:           awsApiUrl2 + "gettempformadora",
    gettempiqf:                 awsApiUrl2 + "gettempiqf",
    gettimelinemaquina:         awsApiUrl2 + "gettimelinemaquina",
    gettimelineoperativo:       awsApiUrl2 + "gettimelineoperativo",
    insertordenfromexcel:       awsApiUrl2 + "insertordenfromexcel",
    insertsuborder:             awsApiUrl2 + "insertsuborder",
    nextorden:                  awsApiUrl2 + "nextorden",
    siguienteordenempaque:      awsApiUrl2 + "siguienteordenempaque",
    siguienteordenenvasadoras:  awsApiUrl2 + "siguienteordenenvasadoras",
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
