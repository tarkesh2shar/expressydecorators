import { MetaDataKeys } from "../../enums/MetaDataKeys";
import { swaggerItem } from "../../interfaces/swagger";
export function Params() {
  return function (target: any, key: string, index: number) {
    Reflect.defineMetadata(MetaDataKeys.Params, index, target, key);
  };
}
export function Queries() {
  return function (target: any, key: string, index: number) {
    Reflect.defineMetadata(MetaDataKeys.Queries, index, target, key);
  };
}
export function Body() {
  return function (target: any, key: string, index: number) {
    Reflect.defineMetadata(MetaDataKeys.Body, index, target, key);
  };
}
export function getParam(name: string) {
  return function (target: any, key: string, index: number) {
    Reflect.defineMetadata(MetaDataKeys.SingleParam, index, target, key);
    Reflect.defineMetadata(MetaDataKeys.SingleSearchParam, name, target, key);
  };
}
export function getBody(name: string) {
  return function (target: any, key: string, index: number) {
    Reflect.defineMetadata(MetaDataKeys.SingleBody, index, target, key);
    Reflect.defineMetadata(MetaDataKeys.SingleSearchBody, name, target, key);
  };
}
export function getQuery(name: string, queryDesc?: swaggerItem) {
  return function (target: any, key: string, index: number) {
    Reflect.defineMetadata(MetaDataKeys.SingleQuery, index, target, key);
    Reflect.defineMetadata(MetaDataKeys.SingleSearchQuery, name, target, key);
    if (queryDesc) {
      Reflect.defineMetadata(
        MetaDataKeys.SwaggerQueryItem,
        queryDesc,
        target,
        key
      );
    }
  };
}
