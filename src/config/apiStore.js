const awsApiUrl2 = "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/"
//Api dashboard
const dashboard = {
    create_user:                awsApiUrl2 + "create-user", 
    getenvasadora:              awsApiUrl2 + "getenvasadora",    
    deletesuborden:             awsApiUrl2 + "deletesuborden",
    getordenes:                 awsApiUrl2 + "getordenes",
    insertsuborder:             awsApiUrl2 + "insertsuborder",
    getproducto:                awsApiUrl2 + "getproducto",
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
