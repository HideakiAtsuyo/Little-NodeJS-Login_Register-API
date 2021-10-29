const mysql = require('mysql2'),
    Logger = require("./Logger.js");
    config = require("../Config.json");

const connection = mysql.createConnection({
  host: config.db.Host,
  user: config.db.User,
  database: config.db.Database,
  password: config.db.password
});

connection.connect(function (e) {
    if (e) {
      Logger.Error(`MySQL:\n${chalk.white(e)}`);
      process.exit(-1);
   } else {
    Logger.Info(`MySQL: ${chalk.green("SUCCESSFULLY CONNECTED")}`);
  }
});

module.exports =  {
  GiveMeA() { return connection; }
};