import {
  Controller,
  Get,
  Post,
  Swaggerize,
  getBody,
  getParam,
  getQuery,
  Params,
  Queries,
  Body,
  swaggerResponseCodes,
  swaggerParamsIn,
  swaggerParamsType,
} from "../";
//////////////////////////////////////////
@Controller("/auth")
export class LoginController {
  @Get("/login/:accountId/:userId/salute/:soundId/awesome")
  @Swaggerize({
    tags: ["login"],
    summary: "Login Routes",
    description: "Just checking basic Routes Specs ok ",
    responses: {
      [swaggerResponseCodes.success]: {
        description: "What are we getting back in the response allright ?",
        content: "application/json",
        schema: {
          type: "object",
          properties: {
            Hello: {
              type: "string",
            },
          },
        },
      },
    },
    parameters: [
      {
        description: "hi",
        in: swaggerParamsIn.query,
        name: "allGood",
        type: swaggerParamsType.integer,
        required: true,
      },
      {
        name: "accountId",
        in: swaggerParamsIn.path,
        description: "This is used to fetch information about the account ",
        type: swaggerParamsType.string,
        required: true,
      },
      {
        name: "userId",
        in: swaggerParamsIn.path,
        description: "This is required to map records to current userId ok ??",
        type: swaggerParamsType.integer,
      },
      {
        name: "soundId",
        in: swaggerParamsIn.path,
        description: "This is required to map records to current userId ok ??",
        type: swaggerParamsType.integer,
      },
    ],
  })
  getLogin(
    @getParam("id") id: string,
    @getQuery("allGood")
    q: string,
    @Queries() query: any,
    @Params() param: any
  ) {
    console.log("process.cwd()", process.cwd());
    console.log("query", query);
    console.log("params", param);

    return { Hello: "world" };
  }

  @Get("/login")
  login(
    @getParam("id") id: string,
    @getQuery("allGood") q: string,
    @Queries() query: any
  ) {
    console.log("query", query);

    return { Hello: "Login" };
  }

  @Post("/login/:id/:userId")
  postLogin(
    @Params() params: any,
    @Queries() query: any,
    @Body() body: any,
    @getQuery("allGood") q: string,
    @getBody("body1") bod1: string
  ) {
    return { hello: "post" };
  }
}
