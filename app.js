const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mainRoutes = require("./server/routers/main");
// const fs = require("fs");
// const https = require("https");
var cors = require("cors");

dotenv.config();

const app = express();

// const port = 5000;

// const abountRoutes = require

app.use(cors()); // enable cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// DB connect
// console.log(`string conect ${process.env.ATLAS_URI}`)

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is conect"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connect error : ${err}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project with Nodejs Express and MongoDB",
  });
});

app.use("/api/", mainRoutes);

// const keysDir = "keys/";
// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

// https.createServer(options, app).listen(port);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
