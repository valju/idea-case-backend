import "@babel/polyfill";
import express from "express";
import cors from "cors";
import routes from "./routes/api/index";
import bodyParser from "body-parser";

import { SERVER_SETTINGS } from "./CONSTANTS";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const init = async () => {
  await app.use(SERVER_SETTINGS.api_url_prefix, routes);

  await app.get("/", function(req, res) {
    res.send("Hello from the Node&Express Backend!").end();
  });

  await app.listen(SERVER_SETTINGS.port);

  console.log(`Node server started and listens to \
              port ${SERVER_SETTINGS.port}.`);
};

init();
