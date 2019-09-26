const express = require("express");
const path = require("path");
const apiRouter = require("./routes");
const app = express();
// const cors = require('cors')

// let p = path.join(__dirname,'index.html')
// console.log(p);

// app.use(express.static(p))
app.use(express.json());
app.use(apiRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
