const expressjwt = require("express-jwt");


const authCheck = () =>{
    const secret = process.env.SECRET;
    const api = process.env.API_URL;
    return expressjwt({
        secret,
        algorithms:["HS256"],
        isRevoked: isRevoked
    }).unless({
        path:[
            {url:/api\/products(.*)/,methods:["GET","OPTIONS"]},
            {url:/api\/catagories(.*)/,methods:["GET","OPTIONS"]},
            `${api}/users/login`,
            `${api}/users/signup`
        ]
    })
}

const isRevoked = async (req,payload,done) =>{
    if(!payload.isAdmin){
        done(null,true);
    }
    done();
}

module.exports = authCheck;