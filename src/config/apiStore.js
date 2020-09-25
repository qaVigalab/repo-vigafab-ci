const awsApiUrl2 = "https://fmm8re3i5f.execute-api.us-east-1.amazonaws.com/Agro/"
//Api dashboard
const dashboard = {
    create_user:                awsApiUrl2 + "create-user", 
    getenvasadora:              awsApiUrl2 + "getenvasadora",    

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
