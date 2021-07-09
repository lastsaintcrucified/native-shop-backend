require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const api = process.env.API_URL;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


const productRoutes = require("./routes/products");
const catagoryRoutes = require("./routes/catagories");
const userRoutes = require("./routes/users");
//middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});
app.use(`${api}/products`,productRoutes);
app.use(`${api}/catagories`,catagoryRoutes);
app.use(`${api}/users`,userRoutes);
mongoose.connect(
  `mongodb+srv://towhid313:${password}@cluster0.sspie.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     useFindAndModify: false 
  }
);
app.listen(3000, () => {
  console.log("Server running on 3000");
});
