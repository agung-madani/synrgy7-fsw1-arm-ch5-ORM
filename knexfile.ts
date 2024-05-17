import type { Knex } from "knex";
const path = require("path");

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "armada009",
      port: 5432,
      host: "localhost",
      database: "ORM_CH5",
    },
  },
};

module.exports = config;
