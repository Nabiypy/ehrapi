import logger from "./logger.js";

module.exports = {
  url: "postgres://icanjzsx:rB15OQYJ60Xj6rMtzhIf0ibB65vGbJOz@packy.db.elephantsql.com:5432/icanjzsx",
  params: {
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: { underscored: true }
  },
  jwtSecret: "EHR@-AP1",
  jwtSession: { session: false }
};
