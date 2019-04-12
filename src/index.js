import "@babel/polyfill";
import express from 'express';
import routes from './routes/api/index';

const port = 8787;
const app = express();

// i don't know what this is, maybe we use it later
/*
const cors = require('cors');
app.use(cors());
*/

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const init = async () => {

  await app.use('/api', routes);
  
  await app.get('/', function (req, res) {
    res.send('Hello from the Backend');
  });

  await app.listen(port);
  console.log(`Node server started and listens to port ${port}`); 

}

init();
