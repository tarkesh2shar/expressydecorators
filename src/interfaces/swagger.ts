import { JSONSchema4 } from "json-schema";
import {
  swaggerParamsIn,
  swaggerParamsType,
  swaggerResponseCodes,
} from "../enums/swagger";

export interface swaggerPathDoc {
  tags: string[];
  summary: string;
  description?: string;
  parameters: swaggerItem[];
  responses: swaggerResponse;
}
export interface swaggerItem {
  name: string;
  in: swaggerParamsIn;
  description: string;
  required?: boolean;
  example?: string;
  default?: string | null;
  type: swaggerParamsType;
  maximum?: number;
  minimum?: number;
}
export type swaggerResponse = {
  [key in swaggerResponseCodes]?: {
    description: string;
    content: string;
    schema: JSONSchema4;
  };
};
