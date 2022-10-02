## Idea Case "model project" for backend (exam etc.) learning, Express Version
This version uses Express. Now ready for studying!

### Files to look at 
from the model project idea-case-backend (most of the other files are either extra, obsolete or written some other way, do NOT look at them.)

- README.md      (this file)
- package.json
- src/.env
- .gitignore
- src/index.js
- src/routes/api/index.js
- src/routes/api/category.js
  - get one by id : returns the object as JSON
  - get all : returns the result set, that is an array of categories as JSON
  - delete one by id : returns how many rows were affected = deleted
  - update one by the updated object including the id   (PUT) : returns number of rows affected = updated
  - post : returns the id:s of the created objects in an array, like [101,102] 
- src/db/index.js
- src/responseHandlers/index.js
- utils/logger
- logs/winstonBackendLog.log

### Plus the Database design and creation, and Postman tests

There are of course then still some more files, like Database design and creation (SQL) docs in Database folder, and Postman test examples in the Postman folder.
Look at them when you get to that level.

## Table of Contents

- [BACKEND TOOL SET](#backend-tool-set)
- [Set up Database](#set-up-database)
- [Set up ssh tunnel](#set-up-ssh-tunnel)
- [Quick overview](#quick-overview)
- [Usefull links](#usefull-links)

# BACKEND TOOL SET
 - Git for Windows, including the Git Bash
 - VS Code
 - Node (including commands node, npm, npx, nodemon)  
 - (many node packages installed based on package.json, *look at it* and *See below for npm install*)
 - Postman or VS Code Rest Client
 - MariaDB 
 - MySQL Workbench community edition or HeidiSQL or DBeaver or ...  (Not 100% necessary, only if want GUI SQL editor)
 - ssh, for creating the SSH tunnel if needed. GitBash seemed to bring me ssh CLI command, maybe depends on install options

# BACKEND INSTALLATION GUIDE

(((0.  Have the [SSH Tunnel](#SSH-Tunneling-to-mariadb.haaga-helia.fi) to Maridb database defined so that finally it shows:  **L3307 localhost:3306**     
(That is the correct way! localhost:3306 here means how it's called inside Mariadb, our destination is the 'localhost' = Mariadb.))))
  1. Have a possible common root folder (root root folder) called "Case20XX" for both Frontend and Backend repos. Then you can open both projects to editor with one "Open folder" command 
  1. clone Backend repo from GitHub while in that common root folder
  **> git clone repo_link_from_git_hub_com**
  1. **> pwd** to make sure where you are!  Then **cd repo_folder_here**
  1. **> pwd** again for folder awareness! 
  1. run **> npm install** if in the repo root folder, to automatically install the dependencies from the package.json. (Somebody else has already run the npm init & needed npm install this-and-that-library commands earlier, you just **git clone** and **nmp install**)
  1. Create .env file to the root folder. Example contents below
    DB_DATABASE is actually your schema name on the database server. If you use your own installation of mariadb, it could be e.g. "test" or "casedb" Double check that the host and port are **'localhost'** and **'3307'**. (If you use the SSH tunnel).
    Well, just be aware of all the settings and what are correct in YOUR case.
  1. ((( **>npm run db:init** to run the db creation/reset script and get the shared test data (We should soon remove/consolidate/merge the scripts from the Database folder, as we should only have one set of drop, create and insert statements in our project) )))
  1. **>npm start**
  1. test e.g. http://localhost:8777/api/category/ and **http://localhost:8777/api/category/** 
     or even the POST services if using PostMan
  1. ((now ready to setup and run Frontend project))

  (You can of course also first run without env variables, use hard-coded values,
  though do not then accidentally enter the values in git.

  And also with local MariaDB installation, localhost, port 3306, without
  the SSH tunnel
  
  And then, when all tests ok with basic version, start to add compicating things)

****** Sample .env file (dotenv library will use it) *****
```
BE_API_URL_PREFIX=/api
BE_SERVER_PORT=8777
DB_DRIVER_MODULE=mysql
DB_HOST=localhost
DB_PORT=3307
DB_USER=XXXXXXXXXXXXXXXXXXXXX
DB_PASSWORD=XXXXXXXXXXXXXXXXXXXXXXXX
DB_DATABASE=casedb
DB_DEBUG=true
DB_MULTIPLE_STATEMENTS=true
DB_CONNECTION_POOL_MIN=1
DB_CONNECTION_POOL_MAX=7
```

*****  END of .env file   *****

### PostMan link for the common PostMan tests:  (Not yet created, but just example how could share them as links!)

https://www.getpostman.com/collections/not_yet_there

### SSH Tunneling to mariadb at remote server
	
#### Windows system: <br>
 ##### Option 1 Tunnel with Putty: <br>
 - Host Name: <IP address here>		
 - Saved Sessions: MariaDB server SSH Tunnel <br>
 - Do no change the other defaults (Protocol: SSH, Port: 22) <br>
 - After saving, go to Connection / SSH / Tunnels <br>
 - Write to Source Port: 3307          This is our own computer port (marked often with big L) !!! <br>         
 - Write to Destination: localhost:3306 (This means where to go in remote computer) <br> 
 - Click on “add”, select the session “MariaDB server SSH Tunnel” you just create and save it again. <br>
 - Now you can click open on the session “MariaDB server SSH Tunnel” to use it <br>
    
#### Option 2 Unix system command line: (Or e.g. in the Git Bash console on Windows, though might need to omit -f in Windows or Mac sometimes?)<br>
  > ssh -f linux_user_here@ip_address_of_remote_comp_here -L 3307:localhost:3306 -N

  // Here the first 3307 means local pc, second 3306 means remote computer

The executed ssh command sets up an ssh tunnel through the cli. After execution allow the fingerprint exchange with "yes" and type in your student accounts password.<br>
NOTE: DO NOT CLOSE THE TERMINAL. Closing the terminal will close the tunnel.
NOTE 2: If you are use an older version than windows 10 please use putty or another ssh client to create the same tunnel.

### Command-line commands available
* > npm run-script db:init - will populate your database with some tables and values
* > npm start - will start the server (point your browser to http://localhost:8777 to see a welcome message from the backend or to http://localhost:8777/api/category/ to see a list of entries from Category table)

## Usefull links

* Express.js docs in case its needed [express.js](https://expressjs.com/)
* All knex.js commands [knex.js](https://knexjs.org/) NOTE: ctrl+f is your friend
* All ES6 features can be found on this cheatsheet [ES6](https://gist.github.com/vasco3/22b09ef0ca5e0f8c5996)
* Git cheatsheet [git](https://www.git-tower.com/blog/git-cheat-sheet)
