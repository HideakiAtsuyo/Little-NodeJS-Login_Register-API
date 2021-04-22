# Little-NodeJS-Login_Register-API


Open an [Issue](https://github.com/HideakiAtsuyo/Little-NodeJS-Login_Register-API/issues) if you:
- Have a problem
- Have some suggestions
- Have some IDEAS
- Anything other who care lol


## Configuration

1) Setup the database

Create a database with then name in the [config.json](https://github.com/HideakiAtsuyo/Little-NodeJS-Login_Register-API/blob/main/config.json) file.

Then:<br>1.1) https://i.imgur.com/i35JiyN.png<br>1.2) https://i.imgur.com/zfLFGR9.png

2) Edit the [config.json](https://github.com/HideakiAtsuyo/Little-NodeJS-Login_Register-API/blob/main/config.json)

```json
{
	"Port": 3000,
	"getAnswer_deadmode": true,
	"apikeys": ["adminlmao", "omgananotherkey"],
	"database":{
		"host": "x.x.x.x or localhost",
		"username": "username",
		"password": "password",
		"name": "loginregisterapi"
	}
}
```

Content-Type: application/json :)

Endpoints list | METHOD | example body(x = no body):

```
/auth/login | POST | {"username": "theUsername", "password": "thePassword"}
/auth/register | POST | {"username": "theUsername", "email": "theEmail", "password": "thePassword"}
/auth/updatepassword | POST | {"username": "theUsername", "password": "thePassword", "newpassword": "theNewPassword"}
/auth/delete | POST | {"username": "theUsername", "password": "thePassword"}
====================
/admin/keys | GET | x
/admin/delete | POST | {"username": "theUsername", "key": "theKey"}
/admin/updateban | POST | {"username": "theUsername", "key": "theKey", "banned": "0/1"}
/admin/updatepassword | POST | {"username": "theUsername", "key": "theKey", "newpassword": "theNewPassword"}
```

I think i will update it because i need to make a better code :(




<!-- But it's still an open-source so i don't care about the code but shhhht it's a secret! :) -->
