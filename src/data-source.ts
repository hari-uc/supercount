import "reflect-metadata";
import { DataSource } from "typeorm";
import { Countdown } from "./entity/Countdown";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Countdown],
  migrations: [],
  subscribers: []
});
