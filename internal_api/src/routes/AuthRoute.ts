import Elysia from "elysia";

import { AuthentiactionService } from "../services/AuthService";
import { cookie } from "@elysiajs/cookie";
import { LoginRequest } from "../requests/LoginRequest";

const auth = AuthentiactionService.getInstance();
export const AuthRoute = (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .use(cookie())
      .post(
        "/authorize",
        async ({ cookie: { token }, setCookie, body, set }) => {
          let b = body as LoginRequest;

          try {
           b =  JSON.parse(body as string) 
          } catch (e) {}

          const password = (b  as LoginRequest).password;

          const jwt = (await auth.handleAuth({ password: password })) as string;

          setCookie("token", jwt);

          jwt === "" ? (set.status = 401) : "";

          return "Done";
        }
      )
      .post("/verify", async ({ cookie: { token }, setCookie }) => {
        console.log(
          await AuthentiactionService.getInstance().hanldeVerify(
            token,
            setCookie
          )
        );
      })
  );
