import "source-map-support/register";
// Imports
import config from "./config";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import cors from "cors";
import App from "./classes/App";
import helmet from "helmet";
import log from "./utils/logger";
import { logMethods } from "./types/enums";

// Express app

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type", "Accept"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const getFile = async (str: string) => {
  const file = await import(str);
  return file.default;
};
fs.readdirSync(path.join(__dirname, "apps")).forEach(async (dir) => {
  const application: App = await getFile(path.join(__dirname, "apps", dir));
  application.getRoutes(dir).forEach((item) => {
    log(
      `Loaded ${item.class.method}:/${
        application.route !== undefined ? application.route : dir
      }/${
        item.class.customRoute === undefined
          ? item.name
          : item.class.customRoute
      }`
    );
    app.use(
      "",
      item.class.getRouter(
        `/${application.route !== undefined ? application.route : dir}/${
          item.class.customRoute === undefined
            ? item.name
            : item.class.customRoute
        }`
      )
    );
  });
});

app.listen(config.port, () => {
  log(`Server is running at ${config.host}:${config.port}`, logMethods.READY);
});
