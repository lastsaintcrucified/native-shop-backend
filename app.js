require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const productRoutes = require("./routes/products");
const api = process.env.API_URL;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

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
mongoose.connect(
  `mongodb+srv://towhid313:${password}@cluster0.sspie.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.listen(3000, () => {
  console.log("Server running on 3000");
});
