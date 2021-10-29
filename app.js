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

app.get('*', (req, res) => {
  if(conf.getAnswer_deadmode == false){
  	//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
  } else {
  	res.send("Hello World :')");
  }
});

const PORT = conf.Port || 3001;

app.listen(PORT, Logger.Info(`Successfully started on port: ${chalk.green(PORT)}`)); 
