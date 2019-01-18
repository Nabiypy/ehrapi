import logger from "./logger.js";

module.exports = {
  database: "ehr",
  username: "root",
  password: "digimas14",
  params: {
    host:"localhost",
    dialect: "mysql",
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: { underscored: true }
  },
  jwtSecret: "EHR@-AP1",
  jwtSession: { session: false }
};
