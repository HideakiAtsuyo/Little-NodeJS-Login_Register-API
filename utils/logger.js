const chalk = require("chalk");

class Logger {
    static Info(message) {
        console.log(`${chalk.red("[")}${chalk.blue("INFO")}${chalk.red("]")} => ${chalk.blue(message)}`)
    }

    static Error(error) {
        console.log(`${chalk.red("[")}${chalk.blue("ERROR")}${chalk.red("]")} => ${chalk.red(error)}`)
    }
}

module.exports = Logger;