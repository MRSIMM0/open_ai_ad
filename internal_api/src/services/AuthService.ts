import { LoginRequest } from "../requests/LoginRequest";

import * as jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

import { User } from "../entities/User";

import { randomBytes, scryptSync } from "crypto";
import { IUserService, UserService } from "./UserService";

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString("hex");
};

export interface IAuthentiactionService {
  encrypt: (plain: string) => string;

  descrypt: (plain: string, encoded: string) => boolean;
  // register: (registerRequest: void) => void;
  handleAuth: (login: LoginRequest) => Promise<String>;
}

export class AuthentiactionService implements IAuthentiactionService {
  //  private datasource: IDatasource = Datasource.getInstance();

  private static service: AuthentiactionService | null = null;

  static getInstance(): AuthentiactionService {
    if (this.service == null) {
      this.service = new AuthentiactionService();
    }
    return this.service;
  }

  encrypt(password: string): string {
    // Any random string here (ideally should be at least 16 bytes)
    const salt = randomBytes(16).toString("hex");
    return encryptPassword(password, salt) + salt;
  }

  descrypt(password: string, hash: string): boolean {
    const salt = hash.slice(64);
    const originalPassHash = hash.slice(0, 64);
    const currentPassHash = encryptPassword(password, salt);
    return originalPassHash === currentPassHash;
  }

  private validate(token: string): boolean | string {
    try {
      return (jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload)
        .data;
    } catch (err) {
      return false;
    }
  }

  private generateToken(data: any, expirtaion: string): String {
    return jwt.sign({ data: data.username }, process.env.TOKEN_SECRET!, {
      expiresIn: expirtaion,
    });
  }

  async handleRefreshToken(refreshToken: String): Promise<String> {
    const data = this.validate(refreshToken as string);

    if (!data) {
      return "";
    }

    return this.generateToken({ username: data }, "2h");
  }

  async handleAuth(login: LoginRequest): Promise<String> {
    let data: User = await UserService.getInstance().getUserByUsername("root");

    if (!this.descrypt(login.password as string, data.password as string)) {
      return "";
    }

    const data2: User = {
      ...(data as any)[0],
      refresh_token: this.generateToken({ username: data.username }, "2000h"),
    };

    UserService.getInstance().updateUser(data2);

    return this.generateToken({ username: "root" }, "2h");
  }

  async hanldeVerify(token: string, setCookie: Function) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET!);
      return true;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        const data = (
          jwt.verify(token, process.env.TOKEN_SECRET!, {
            ignoreExpiration: true,
          }) as jwt.JwtPayload
        ).data;

        setCookie(
          "token",
          this.handleRefreshToken(
            (await UserService.getInstance().getUserByUsername(data))
              .refresh_token as string
          )
        );

        return true;
      }
      return false;
    }
  }
}
