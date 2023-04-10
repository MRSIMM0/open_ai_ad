import { Datasource, IDatasource } from "../datasource/Datasource";
import { User } from "../entities/User";
import { AuthentiactionService, IAuthentiactionService } from "./AuthService";

export interface IUserService {
  getUserById: (id: Number) => Promise<User>;

  getUserByUsername: (username: String) => Promise<User>;

  createUser: (user: User) => Promise<User>;
}

export class UserService implements IUserService {
  static service: UserService | null = null;

  datasource: IDatasource = Datasource.getInstance();

  authService: IAuthentiactionService = AuthentiactionService.getInstance();

  static getInstance() {
    if (!this.service) {
      this.service = new UserService();
    }
    return this.service;
  }

  private constructor() {}

  async getRowCount() {
    const querry = `
        SELECT COUNT(*) FROM MYUSER
        `;

    const res = await this.datasource.createQuerry(querry);
    return (await res[0]["count"]) as Number;
  }

  async getUserById(id: Number) {
    const querry = `
        SELECT *
        FROM MYUSER
        WHERE ID = ${id}
        
        `;

    return (await this.datasource.createQuerry(querry)) as User;
  }

  async getUserByUsername(username: String) {
    const querry = `
        SELECT *
        FROM myuser
        WHERE username = '${username}'
        `;

    return (await this.datasource.createQuerry(querry))[0] as User;
  }

  async createRoot() {
    const querry = `
        INSERT 
        INTO myuser 
        ( id,username,password,REFRESH_TOKEN)
        VALUES
        (${((await this.getRowCount()) as unknown as number) + 1}, 
        'root',
        '${this.authService.encrypt(process.env.ROOT_PASS!)}',
        ''
        )
        `;

    return (await this.datasource.createQuerry(querry)) as unknown as User;
  }

  async createUser(user: User) {
    const querry = `
        INSERT 
        INTO myuser 
        ( id,username,password,REFRESH_TOKEN)
        VALUES
        (${((await this.getRowCount()) as unknown as number) + 1}, 
        '${this.authService.encrypt(user.password as string)}',
         '')
        `;
    return (await this.datasource.createQuerry(querry)) as unknown as User;
  }
  async updateUser(user: User) {

 
    const querry = `
    UPDATE myuser
    SET REFRESH_TOKEN = '${user.refresh_token}'
    WHERE username='root'; 
    `;

    await this.datasource.createQuerry(querry);
  }

  async getAll() {
    const querry = `
    SELECT *
    FROM myuser

    `;

    return (await this.datasource.createQuerry(querry)) as User;
  }
}
