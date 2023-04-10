import { Elysia } from "elysia";
import { AuthRoute } from "./routes/AuthRoute";
import { cors } from "@elysiajs/cors";

import { Datasource } from "./datasource/Datasource";

import { UserService } from "./services/UserService";
import { OpenAiRoute } from "./routes/OpenAiRoute";

//  Datasource.getInstance().dropDatabase()

//  Datasource.getInstance().init()

// await Datasource.getInstance().createTestUser()

// UserService.getInstance().createRoot();
// UserService.getInstance().getRowCount().then((el)=>console.log(el))

const app = new Elysia()
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .group("/v1/api", (app) => app
  .use(AuthRoute)
  .use(OpenAiRoute))
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
