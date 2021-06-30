import "reflect-metadata";
import { Methods } from "../../enums/Methods";
import { MetaDataKeys } from "../../enums/MetaDataKeys";
import { router, swaggerbase } from "../init";
import { pathKeySwaggerizer } from "../helpers";
import fs from "fs";
import { Request, Response } from "express";

export function Controller(prefix: string) {
  if (router) {
    return function (target: Function) {
      for (const key in target.prototype) {
        try {
          const targetFn = target.prototype[key]; //original function
          const path = Reflect.getMetadata(
            MetaDataKeys.path,
            target.prototype,
            key
          );
          const method: Methods = Reflect.getMetadata(
            MetaDataKeys.Method,
            target.prototype,
            key
          );

          // all
          const parametersIndex = Reflect.getMetadata(
            MetaDataKeys.Params,
            target.prototype,
            key
          );
          const queryIndex = Reflect.getMetadata(
            MetaDataKeys.Queries,
            target.prototype,
            key
          );
          const bodyIndex = Reflect.getMetadata(
            MetaDataKeys.Body,
            target.prototype,
            key
          );
          //specific item
          const singleQueryIndex = Reflect.getMetadata(
            MetaDataKeys.SingleQuery,
            target.prototype,
            key
          );
          const singleQuerySearchTerm = Reflect.getMetadata(
            MetaDataKeys.SingleSearchQuery,
            target.prototype,
            key
          );
          const singleBodyIndex = Reflect.getMetadata(
            MetaDataKeys.SingleBody,
            target.prototype,
            key
          );
          const singleBodySearchTerm = Reflect.getMetadata(
            MetaDataKeys.SingleSearchBody,
            target.prototype,
            key
          );
          const singleParamIndex = Reflect.getMetadata(
            MetaDataKeys.SingleParam,
            target.prototype,
            key
          );
          const singleParamSearchTerm = Reflect.getMetadata(
            MetaDataKeys.SingleSearchParam,
            target.prototype,
            key
          );
          //swagger stuff //
          if (!swaggerbase)
            throw new Error(
              "Initial data for swagger is not Provided, Please initialize it .."
            );
          let swaggerJsonPath = `${process.cwd()}/swagger.json`;
          if (fs.existsSync(swaggerJsonPath)) {
            fs.readFile(swaggerJsonPath, "utf8", (err, data) => {
              if (err)
                throw new Error(" Error in reading the  Json  provided !");
              let swaggerData = JSON.parse(data);

              for (const key in swaggerbase) {
                if (swaggerData[key] == undefined) {
                  swaggerData[key] = (swaggerbase as any)[key];
                }
              }

              let swaggerPath = swaggerData.paths;
              let pathKey = `${prefix}${path}`;
              let swaggerizePathKey = pathKeySwaggerizer(pathKey);
              let swaggerPathDoc = Reflect.getMetadata(
                MetaDataKeys.SwaggerPathDoc,
                target.prototype,
                key
              );
              let pathValue: any = {};
              pathValue[method] = {
                ...swaggerPathDoc,
              };
              swaggerPath[swaggerizePathKey] = pathValue;
              swaggerData["paths"] = swaggerPath;

              if (swaggerPathDoc) {
                fs.writeFile(
                  swaggerJsonPath,
                  JSON.stringify(swaggerData),
                  (err) => {
                    if (err)
                      throw new Error("Error while writing into JSON path");
                  }
                );
              }
            });
          } else {
            throw new Error(" Swagger Json file not Found at path provided !");
          }

          let arrArgs: any = [];
          const routeHandler = (req: Request, res: Response) => {
            let params = req.params;
            let query = req.query;
            let body = req.body;
            let searchQuery = req.query[singleQuerySearchTerm];
            let searchBody = req.body[singleBodySearchTerm];
            let searchParam = req.params[singleParamSearchTerm];

            if (parametersIndex) arrArgs[parametersIndex] = params;
            if (queryIndex) arrArgs[queryIndex] = query;
            if (bodyIndex) arrArgs[bodyIndex] = body;
            if (singleQueryIndex) arrArgs[singleQueryIndex] = searchQuery;
            if (singleParamIndex) arrArgs[singleParamIndex] = searchParam;
            if (singleBodyIndex) arrArgs[singleBodyIndex] = searchBody;

            res.send(targetFn(...arrArgs));
          };
          if (path) {
            let modifiedPath = `${prefix}${path}`;
            router[method](`${modifiedPath}`, routeHandler);
          }
        } catch (e) {
          throw e;
        }
      }
    };
  } else {
    throw new Error("An instance of Express Router is required");
  }
}
