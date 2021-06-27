const express = require("express");
const config = require("config");

const routes = require("./router");
const controller = require("./controller");

const app = express();

app.use(express.json());

controller.connect();

app.use("/", routes);

const port = config.has("port") ? config.get("port") : 5000;

const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
