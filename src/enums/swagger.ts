export enum swaggerParamsIn {
  query = "query",
  body = "body",
  path = "path",
  header = "header",
}

export enum swaggerParamsType {
  integer = "integer",
  string = "string",
  array = "array",
}

export enum swaggerResponseCodes {
  success = "200",
  badRequest = "400",
  redirect = "300",
  serverError = "500",
  info = "100",
}
