import { Sequelize } from "sequelize-typescript";

export class Database {
  sequelize!: Sequelize;

  async start() {
    this.sequelize = new Sequelize({
      models: [__dirname + "/../models"],
      dialect: "sqlite",
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      pool: {
        max: 5,
        min: 1,
        acquire: 60000,
        idle: 120000,
      },
      logging: false,
      define: {
        timestamps: true,
        underscored: false,
      },
      sync: {
        force: false,
        alter: true,
      },
    });

    await this.sequelize.sync();
  }

  async stop() {
    await this.sequelize.close();
  }
}
