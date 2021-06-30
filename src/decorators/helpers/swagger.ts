import { swaggerPathDoc } from "../../interfaces/swagger";
import { MetaDataKeys } from "../../enums/MetaDataKeys";
export function pathKeySwaggerizer(path: string) {
  let swaggerizePathKey: string = path;
  //get every thing after : until hit "/"
  let colonPositionAt = [];
  for (let i = 0; i < path.length; i++) {
    let currentElement = path[i];
    if (currentElement === ":") {
      colonPositionAt.push(i + 1);
    }
  }
  for (let i = 0; i < colonPositionAt.length; i++) {
    let nthElement = colonPositionAt[i];
    let nextElement = colonPositionAt[i + 1];
    let splittedPath = path.slice(nthElement, nextElement).replace("/:", "");
    if (splittedPath.includes("/")) {
      splittedPath = splittedPath.split("/")[0];
    }
    swaggerizePathKey = swaggerizePathKey.replace(
      `:${splittedPath}`,
      `${"{" + splittedPath + "}"}`
    );
  }
  return swaggerizePathKey;
}
export function Swaggerize(config: swaggerPathDoc) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetaDataKeys.SwaggerPathDoc, config, target, key);
  };
}
