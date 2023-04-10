import { Elysia } from "elysia";
import { OpenAIApi, Configuration } from "openai";
import { cookie } from "@elysiajs/cookie";
import { AuthentiactionService } from "../services/AuthService";
import * as dotenv from "dotenv";
import { link } from "fs";

const configuration = new Configuration({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export const OpenAiRoute = (app: Elysia) =>
  app.group("/open", (app) =>
    app
      .use(cookie())
      .post("/call", async ({ cookie: { token }, setCookie, set, body }) => {
        if (
          !(await AuthentiactionService.getInstance().hanldeVerify(
            token,
            setCookie
          ))
        ) {
          set.status = 401;
          return;
        }

        let prevLinks = [""];

        let b = body as any;

        try {
          b = JSON.parse(body as string);
        } catch (e) {}

        prevLinks = b.links;
        // console.log("test1")

        const openaiAPIEndpoint = "https://api.openai.com/v1/chat/completions";

        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `{"prompt":"[${prevLinks}]\n\n###\n\n", "completion":" <chose one category which repeates the most and create engaging ad based on those links skip introduction print just ad use max 3 sentences> "}`,
              },
            ],
            temperature: 0.7,
          }),
        };

        const response: any = await (
          await fetch(openaiAPIEndpoint, request)
        ).json();

        const data = response.choices[0].message.content;

        return data;
      })
      .post("/links", async ({ cookie: { token }, setCookie, set, body }) => {
        if (
          !(await AuthentiactionService.getInstance().hanldeVerify(
            token,
            setCookie
          ))
        ) {
          set.status = 401;
          return;
        }

        let response = "";

        let b = body as any;

        try {
          b = JSON.parse(body as string);
        } catch (e) {}

        response = b.response;

        const links:any = await (
          await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
            },
            body: JSON.stringify({
              prompt: response,
              n: 3,
              size: "256x256",
            }),
          })
        ).json();
          
        // console.log(links)
        // const links = await openai.createImage({
        //   prompt: response,
        //   n: 3,
        //   size: "256x256",
        // });

        return links.data.map((el:any) => el.url);
      })
  );
