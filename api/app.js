const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
  console.log("API is running");
});
