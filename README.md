2019-04-22 Temporary notes:
- remove the DATABASE_SETTINGS or so file
- add the /src/CONSTANTS.js file and CHANGE YOUR DB password there
- run> npm install   (to get cors module installed)
- setup the SSH tunnel
- run> npm start              it now seems to create the database too.
- works? If not try deleting the dist folder and run> npm run build
- then run> npm start             again

## Idea Case 2019K Backend, Express Version
This version uses Express (instead of Hapi). Now ready for studying!

## Table of Contents

- [BACKEND TOOL SET](#backend-tool-set)
- [Set up Database](#set-up-database)
- [Set up ssh tunnel](#set-up-ssh-tunnel)
- [Quick overview](#quick-overview)
- [Usefull links](#usefull-links)

# BACKEND TOOL SET
 - Git for Windows (2.20.1.windows.1), including the Git Bash
 - VS Code 1.29.1
 - Node v8.11.4
 - npm 5.6.0  
 - (many node packages installed based on package.json, See below)
 - Postman v6.7.1
 - MariaDB 5.5.46 (But newer versions should work fine too)
 - MySQL Workbench 8.0.12 CE = Community edition   (Not 100% necessary, only if want GUI SQL editor)

# BACKEND INSTALLATION GUIDE

  0.  Have the [SSH Tunnel](#SSH-Tunneling-to-mariadb.haaga-helia.fi) to Maridb database defined so that finally it shows:  **L3308 localhost:3306**     
(That is the correct way! localhost:3306 here means how it's called inside Mariadb, our destination is the 'localhost' = Mariadb.)
  1. Have a possible common root folder (root root folder) called "Case2019K" for both Frontend and Backend repos. Then you can open both projects to editor with one "Open folder" command 
  2. clone Backend repo from GitHub while in that common root folder
  **> git clone repolinkfromgithubcom**
  3. **> pwd** to make sure where you are!  Then **cd to repo**
  4. **> pwd** again for folder awareness! 
  5. run **> npm install** if in the repo root folder, to automatically install the dependencies from the package.json. (Somebody else has already run the npm init & needed npm install thisandthat commands earlier)
  6. Open the editor and edit and check DB_SETTINGS.js in src/db folder. (Later all the settings will be moved just into one file in each project.) Change your:
    **db-username**, **db-password**, and the **"database"** which actually is your schema name on the database server. Double check that the host and port are **'localhost'** and **'3308'**. (That is our end of the tunnel).
  7. **>npm run db:init** to run the db creation/reset script and get the shared test data (We should soon remove/consolidate/merge the scripts from the Database folder, as we should only have one set of drop, create and insert statements in our project)
  8. **>npm start**
  9. test e.g. http://localhost:8787/api/category/all and **http://localhost:8787/api/category/all** 
     or even the POST services if using PostMan
  10. now ready to setup and run Frontend project

// ------ Sample /src/CONSTANTS.js file -------
// /src/CONSTANTS.js

// The only place for back-end server and database settings 

// SERVER_SETTINGS

// The only place for common server settings, including for CORS later

const SERVER_SETTINGS = {

    port: 8787,

    api_url_prefix: "/api",

};

// DB_SETTINGS

// The only place for common database settings

const DB_SETTINGS = {

    driverModule: "mysql",

    host: "localhost",

    port: "3308",

    user: "valju",

    password: "YOUR_DB_PASSWD_HERE",  

    database: "valju",

    multipleStatements: true,

    debug: true,

    connPoolMin: 0,

    connPoolMax: 7,

};

export {SERVER_SETTINGS, DB_SETTINGS};
// ------------------------------------------

### PostMan link for the common PostMan tests:  (Not yet created)

https://www.getpostman.com/collections/not_yet_there

### SSH Tunneling to mariadb.haaga-helia.fi
	
#### Windows system: <br>
 ##### On Putty: <br>
 - Host Name: mariadb.haaga-helia.fi <br>		
 - Saved Sessions: MariaDB server SSH Tunnel <br>
 - Do no change the other defaults (Protocol: SSH, Port: 22) <br>
 - After saving, go to Connection / SSH / Tunnels <br>
 - Write to Source Port: 3308          This is our own computer port (marked often with big L) !!! <br>         
 - Write to Destination: localhost:3306 (This means where to go in mariadb.haaga-helia.fi, there localhost = md.h-h.fi!!!) <br> 
 - Click on “add”, select the session “MariaDB server SSH Tunnel” you just create and save it again. <br>
 - Now you can click open on the session “MariaDB server SSH Tunnel” to use it <br>
    
#### Unix system: (Or e.g. in the Git Bash console on Windows, though might need to omit -f in Windows sometimes?)<br>
	> ssh -f valju@mariadb.haaga-helia.fi -L 3308:localhost:3306 -N

The executed ssh command sets up an ssh tunnel through the cli. After execution allow the fingerprint exchange with "yes" and type in your student accounts password.<br>
NOTE: DO NOT CLOSE THE TERMINAL. Closing the terminal will close the tunnel.
NOTE 2: If you are use an older version than windows 10 please use putty or another ssh client to create the same tunnel.

### Command-line commands available
* > npm run-script db:init - will populate your database with some tables and values
* > npm start - will start the server (point your browser to http://localhost:8787 to see a welcome message from the backend or to http://localhost:8787/api/category/all to see a list of entries from Category table)

## Usefull links

* Express.js docs in case its needed [express.js](https://expressjs.com/)
* All knex.js commands [knex.js](https://knexjs.org/) NOTE: ctrl+f is your friend
* All ES6 features can be found on this cheatsheet [ES6](https://gist.github.com/vasco3/22b09ef0ca5e0f8c5996)
* Git cheatsheet [git](https://www.git-tower.com/blog/git-cheat-sheet)