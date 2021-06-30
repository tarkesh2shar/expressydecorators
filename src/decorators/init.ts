import { Router } from "express";
export let router: Router;
export function InitializeDecorators(ro: Router) {
  router = ro;
}
interface swaggerBase {
  swagger: string;
  info: {
    version: string;
    title: string;
    description: string;
    license?: {
      name: string;
      url: string;
    };
  };
  host: string;
  basePath: string;
  paths: {};
  schemes: string[];
  definitions: {};
}
export let swaggerbase: swaggerBase;
export function InitializeSwagger(swaggerBase: swaggerBase) {
  swaggerbase = swaggerBase;
}
