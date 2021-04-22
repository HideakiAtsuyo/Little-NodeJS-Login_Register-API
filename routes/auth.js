const express = require("express"),
	router = express.Router(),
	chalk = require("chalk"),
	conf = require("../config.json"),
	Logger = require("../utils/logger.js"),
	Database = require("../utils/db.js");

let username, email, password, rUsername, rPassword, newpassword;//Useless but still an open-source, don't need a clean code ;)

router.route('/register').get(function(req, res) {

if(conf.getAnswer_deadmode == false){
//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
} else {
	res.send("Hello World :')");
}

}).post(function(req, res) {

  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  if (username < 1 || email < 1 || password < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username(max length: 40), email(max length: 40), password(max length: 40)" });
  }
  if (password < 6) {
    return res.send({ error: true, response: "Verify your password please", need: "At least 6 characters" });
  }

  Database.GiveMeA().query(`SELECT username FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: error});
    }
    if(!results[0] > 0){
    	Database.GiveMeA().query(`INSERT INTO users VALUES ("${username}", "${email}", "${password}", 0);`, function (error, results, fields) {
    		if (error){
    			Logger.Error(`${error}`);
    			return res.send({error: true, response: error});
    		}
    		return res.send({error: false, response: `Successfully registered ${username} !`});
    	});
    } else {
    	return res.send({error: true, response: `Username: ${username} already taken !`});
    }
  });
});


router.route('/login').get(function(req, res) {

if(conf.getAnswer_deadmode == false){
//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
} else {
	res.send("Hello World :')");
}

}).post(function(req, res) {

  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  if (username < 1 || password < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username, password" });
  }

  Database.GiveMeA().query(`SELECT username, password, banned FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: `Failed to login ${username}, try to contact an administrator.`});
    }

    if(!results[0]){
    	return res.send({error: true, response: `${username} doesn't exist !`});
    } else if(results[0].username){
    	rUsername = results[0].username;
    	rPassword = results[0].password;
    	if(rUsername == username && rPassword == password){
        if(results[0].banned == 1){
          return res.send({error: true, response: `${username} is Banned !`});
        } else {
          return res.send({error: false, response: `Successfully logged in as ${username} !`});
        }
    	} else if(rPassword != password){
    		return res.send({error: true, response: `Bad password !`});
    	}
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

  username = req.body.username;
  password = req.body.password;
  newpassword = req.body.newpassword;

  if (username < 1 || password < 1 || newpassword < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username, apikey, newpassword" });
  }
  Database.GiveMeA().query(`SELECT username, password FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: error});
    }
    if(results[0]){
      if(results[0].password != password){
        return res.send({error: true, response: "The password is incorrect"});
      }
      Database.GiveMeA().query(`UPDATE users SET password="${newpassword}" WHERE username="${username}"`, function (error, results, fields) {
        if (error){
          Logger.Error(`${error}`);
          return res.send({error: true, response: error});
        }
        return res.send({error: false, response: `Successfully updated your password of the account (${username}) !`});
      });
    } else {
      return res.send({error: false, response: `Error, the account doesn't exist (${username})`});
    }
  });
});

router.route('/delete').get(function(req, res) {

//Imagine don't allow banned users to delete their accounts :(

if(conf.getAnswer_deadmode == false){
//Yeah no answer = no result for smart peoples(infinity charging then "RIP"..) :)
} else {
	res.send("Hello World :')");
}

}).post(function(req, res) {

  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  if (username < 1 || password < 1) {
    return res.send({ error: true, response: "Verify the body please", need: "username, password" });
  }

  Database.GiveMeA().query(`SELECT username, password FROM users WHERE username="${username}"`, function (error, results, fields) {
    if (error){
      Logger.Error(`${error}`);
      return res.send({error: true, response: `Failed to login ${username}, try to contact an administrator.`});
    }

    if(!results[0]){
    	return res.send({error: true, response: `${username} doesn't exist !`});
    } else if(results[0].username){
    	rUsername = results[0].username;
    	rPassword = results[0].password;
    	if(rUsername == username && rPassword == password){
    		Database.GiveMeA().query(`DELETE FROM users WHERE username="${username}"`, function (error, results, fields) {
    			if (error){
    				Logger.Error(`${error}`);
    				return res.send({error: true, response: `Failed to delete ${username}, try to contact an administrator.`});
    			}
    		})
    		return res.send({error: false, response: `Successfully deleted your account (${username}) !`});
    	} else if(rPassword != password){
    		return res.send({error: true, response: `Bad password !`});
    	}
    }
  });
});


module.exports = router;