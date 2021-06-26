const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const cors = require("cors");
const feedRouter = require("./routers/feed.route");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", feedRouter);

const port = config.has("port") ? config.get("port") : 5008;

app.listen(Number(port), () => {
  console.log(`Feed Server started on port ${port}`);
});
