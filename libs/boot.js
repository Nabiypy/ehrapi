import https from "https";
import fs from "fs";

module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    const credentials = {
      key: fs.readFileSync("ehr.key", "utf8"),
      cert: fs.readFileSync("ehr.cert", "utf8")
    }
    app.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => {
          console.log(`Electronic Health Record API - Port ${app.get("port")}`);
        });
    });
  }
};
