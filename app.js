const express = require("express");
const bodyParser = require("body-parser");

const app = express();
require("dotenv/config");
const api = process.env.API_URL;
const port = process.env.PORT;
//middleware
app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(api)
    console.log("Server running on 3000");

})