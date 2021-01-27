const awsApiUrl2 = "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/"
//Api dashboard
const dashboard = {
    create_user:                awsApiUrl2 + "create-user", 
    getenvasadora:              awsApiUrl2 + "getenvasadora",    
    deletesuborden:             awsApiUrl2 + "deletesuborden",
    getordenes:                 awsApiUrl2 + "getordenes",
    insertsuborder:             awsApiUrl2 + "insertsuborder",
    getproducto:                awsApiUrl2 + "getproducto",
    gettimelinemaquina:         awsApiUrl2 + "gettimelinemaquina",
    getresumenmaquina:          awsApiUrl2 + "getresumenmaquina",
    getresumenhistorico:        awsApiUrl2 + "getresumenhistorico",
    gettempformadora:           awsApiUrl2 + "gettempformadora",
    getfullscreen:              awsApiUrl2 + "getfullscreen",
    getfullscreenoperativa:     awsApiUrl2 + "getfullscreenoperativa",
    nextorden:                  awsApiUrl2 + "nextorden",
    siguienteordenenvasadoras:  awsApiUrl2 + "siguienteordenenvasadoras",
    siguienteordenempaque:      awsApiUrl2 + "siguienteordenempaque",
    getresumenlinea:            awsApiUrl2 + "getresumenlinea",
    getreportehistoricolinea:   awsApiUrl2 + "getreportehistoricolinea",
    getparosgeneral:            awsApiUrl2 + "getparosgeneral",
    getscada:                   awsApiUrl2 + "getscada",
    getdetalleparo:             awsApiUrl2 + "getdetalleparo",
    getmaquinas:                awsApiUrl2 + "getmaquinas",
    gettempiqf:                 awsApiUrl2 + "gettempiqf",
    getparosmaquina:            awsApiUrl2 + "getparosmaquina",
    insertordenfromexcel:       awsApiUrl2 + "insertordenfromexcel",
    Agrosuper_excel_ordenes:    awsApiUrl2 + "Agrosuper_excel_ordenes",
    agrosuper_excel_paros:      awsApiUrl2 + "agrosuper_excel_paros",
    getresumenenvasadoras:      awsApiUrl2 + "getresumenenvasadoras",
    getresumenhistoricoEnv:     awsApiUrl2 + "getresumenhistoricoEnv",
    editOrden:                  awsApiUrl2 + "editorden"
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
