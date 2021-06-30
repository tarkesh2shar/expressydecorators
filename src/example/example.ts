import express, { Request, Response } from "express";
import { Router } from "express";
import { InitializeDecorators, InitializeSwagger } from "../";

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const app = express();
const router = Router();
app.get("/", (req: Request, res: Response) => {
  res.send({ hello: "world" });
});
InitializeDecorators(router);
InitializeSwagger({
  swagger: "2.0",
  basePath: "/",
  definitions: {},
  host: "localhost:8080",
  info: {
    version: "1.0.0",
    title: "Basic swagger implementation",
    description: "A sample API here",
  },
  paths: {},
  schemes: ["http", "https"],
});
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.listen("8080", () => {
  console.log("listening to port 8008 !");
});
import "./SampleController";
