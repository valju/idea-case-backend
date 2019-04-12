# Accept the invitation, but don't look yet, DO NOT CLONE YET! Thank you!

## Idea Case 2019K Backend, Express Version

### Katja, Khem, Tudor

This version uses Express instead of Hapi.

Setup:
1. clone locally
2. type /npm install in powershell
3. make sure you add your own db_settings.js file in src/db directory

MariaDB Tunnel:
* If you are using Kari's instructions to create the tunnel (via Putty), set the port with value 3306 in db_settings.js.
* If you are using Juhani's instructions to create the tunnel (via command prompt), set the port with value 3308 in db_settings.js.

Commands available in powershell:
* /npm run-script db:init - will populate your database with some tables and values
* /npm start - will start the server (point your browser to http://localhost:8787 to see a welcome message from the backend or to http://localhost:8787/api/category to see a list of entries from Category table)
