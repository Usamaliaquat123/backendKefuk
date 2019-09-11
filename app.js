const express = require("express");
const path = require("path");
const apiRouter = require("./routes");
const app = express();

// let p = path.join(__dirname,'index.html')
// console.log(p);

// app.use(express.static(p))
app.use(express.json());
app.use(apiRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
