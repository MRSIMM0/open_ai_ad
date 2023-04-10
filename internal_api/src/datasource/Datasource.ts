import { Pool, Client } from "pg";

import * as dotenv from "dotenv";

export interface IDatasource {
  init: () => void;
  createQuerry: (value: any | undefined) => any;
}

export class Datasource implements IDatasource {
  private static datasource: Datasource | null = null;

  static getInstance(): Datasource {
    if (!this.datasource) {
      this.datasource = new Datasource();
    }
    return this.datasource;
  }

  private constructor() {}

  private credentials = {
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT! as unknown as number,
  };

  async init() {
    const pool = new Pool(this.credentials);
    await pool.query(`
    CREATE TABLE myuser (
      id int  NOT NULL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      REFRESH_TOKEN VARCHAR(255) NOT NULL
     )
    `);

    await pool.end();
  }

  async createQuerry(querry: string): Promise<any> {
    const pool = new Pool(this.credentials);
    const res = await pool.query(querry);
    await pool.end();
    return res.rows;
  }

  async dropDatabase() {
    const pool = new Pool(this.credentials);

    pool.query(`
      DROP TABLE myuser
      `);

    await pool.end();
    console.log("Table droped");
  }
}
