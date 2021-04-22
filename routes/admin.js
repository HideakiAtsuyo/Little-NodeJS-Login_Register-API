const express = require("express"),
  router = express.Router(),
  chalk = require("chalk"),
  conf = require("../config.json"),
  Logger = require("../utils/logger.js"),
  Database = require("../utils/db.js");


let apikey, username, banstatus, newpassword;

router.route('/keys').get(function(req, res) {
  let a = "Keys: \n";
  conf.apikeys.forEach(x => {
    a += `<br>${x}`;
  });
  res.send(a);
});

router.route('/delete').get(function(req, res) {

if(conf.getAnswer_deadmode == false){
//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
} else {
  res.send("Hello World :')");
}

}).post(function(req, res) {

  apikey = req.body.key;
  username = req.body.username;

  if (username < 1 || apikey < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username(max length: 40), email(max length: 40), password(max length: 40)" });
  }
  if (!conf.apikeys.includes(apikey)) {
    return res.send({ error: true, response: "Invalid Key" });
  }

  Database.GiveMeA().query(`SELECT username FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: error});
    }
    console.log(results[0]);

    if(results[0]){
      Database.GiveMeA().query(`DELETE FROM users WHERE username="${username}"`, function (error, results, fields) {
        if (error){
          Logger.Error(`${error}`);
          return res.send({error: true, response: error});
        }
        return res.send({error: false, response: `Successfully deleted the account (${username}) !`});
      });
    } else {
      return res.send({error: true, response: `Error, the account doesn't exist (${username})`});
    }
  });
});

router.route('/updateban').get(function(req, res) {

if(conf.getAnswer_deadmode == false){
//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
} else {
  res.send("Hello World :')");
}

}).post(function(req, res) {

  apikey = req.body.key;
  username = req.body.username;
  banstatus = req.body.banned;

  if (username < 1 || apikey < 1 || banstatus < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username, apikey, banstatus(0/1)" });
  }
  if (!conf.apikeys.includes(apikey)) {
    return res.send({ error: true, response: "Invalid Key" });
  }
  Database.GiveMeA().query(`SELECT username FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: error});
    }
    if(results[0]){
      Database.GiveMeA().query(`UPDATE users SET banned="${banstatus}" WHERE username="${username}"`, function (error, results, fields) {
        if (error){
          Logger.Error(`${error}`);
          return res.send({error: true, response: error});
        }
        if(banstatus == 0){
          return res.send({error: false, response: `Successfully unbanned the account (${username}) !`});
        } else if(banstatus == 1){
          return res.send({error: false, response: `Successfully banned the account (${username}) !`});
        } else {
          return res.send({error: true, response: `0/1`});
        }
      });
    } else {
      return res.send({error: false, response: `Error, the account doesn't exist (${username})`});
    }
  });
});

router.route('/updatepassword').get(function(req, res) {

if(conf.getAnswer_deadmode == false){
//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
} else {
  res.send("Hello World :')");
}

}).post(function(req, res) {

  apikey = req.body.key;
  username = req.body.username;
  newpassword = req.body.newpassword;

  if (username < 1 || apikey < 1 || newpassword < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username, apikey, newpassword" });
  }
  if (!conf.apikeys.includes(apikey)) {
    return res.send({ error: true, response: "Invalid Key" });
  }
  Database.GiveMeA().query(`SELECT username FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: error});
    }
    if(results[0]){
      Database.GiveMeA().query(`UPDATE users SET password="${newpassword}" WHERE username="${username}"`, function (error, results, fields) {
        if (error){
          Logger.Error(`${error}`);
          return res.send({error: true, response: error});
        }
        return res.send({error: false, response: `Successfully updated the password of the account (${username}) !`});
      });
    } else {
      return res.send({error: false, response: `Error, the account doesn't exist (${username})`});
    }
  });
});

module.exports = router;