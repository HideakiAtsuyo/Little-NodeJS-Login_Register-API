const chalk = require("chalk");
const mysql = require("mysql");
const Logger = require("./logger.js");
const conf = require("../config.json");

var connection = mysql.createConnection({
  host: conf.database.host,
  user: conf.database.username,
  password: conf.database.password,
  database: conf.database.name
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