import { DataSource } from "typeorm";
import { Favorite } from "./src/entity/Favorite";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false,
  entities: [Favorite],
});

export async function initDataSource() {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (error) {
      console.error("Error initializing data source:", error);
      throw error;
    }
  }
  return AppDataSource;
}
