const chalk = require("chalk");

class Logger {
    static Info(message) {
        console.log(`${chalk.yellow("[")}${chalk.blue("INFO")}${chalk.yellow("]")} => ${chalk.blue(message)}`);
    }

    static Error(error) {
        console.log(`${chalk.yellow("[")}${chalk.blue("ERROR")}${chalk.yellow("]")} => ${chalk.red(error)}`);
    }
}

module.exports = Logger;