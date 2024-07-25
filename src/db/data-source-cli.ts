import "dotenv/config"
import { DataSource, DataSourceOptions } from "typeorm"

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../db/migrations/*{.ts,.js}"],
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
