const express = require("express"),
	app = express(),
	conf = require("./config.json"),
	bodyParser = require("body-parser"),
	Logger = require("./utils/logger.js"),
	chalk = require("chalk");


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

const PORT = conf.Port || 3001;

app.listen(PORT, Logger.Info(`Successfully started on port: ${chalk.green(PORT)}`));