var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    SIO = require('socket.io')(server),
    chalk = require("chalk"),
    Logger = require("./Utils/Logger.js"),
    config = require("./Config.json");

app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));



const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

app.use(function(req, res, next) {
    const start = process.hrtime();
    let durationInMilliseconds = 0;
    res.status(404).render('error', { status: 404, error: "NOT FOUND", elapsedTime: getDurationInMilliseconds(start).toFixed(3) });
    next();

});

SIO.on("connection", function(socket) {

});

    
server.listen(config.port, async () => {
    console.clear();
    console.log(chalk.blue(`
        ╔═════════════════════════════════════════════╗
        ║       web-chat By Hideaki | Port: ${chalk.green(config.port)}      ║
        ╚═════════════════════════════════════════════╝
    `));
    /* DB Verification */

    /* Others */
    
});