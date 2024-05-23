const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const port = process.env.port || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body



app.get('/', function (req, res) {
  res.send('Welcome to our Hotel')
})




// import the router file

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// use the router 

app.use('/person', personRoutes);
app.use('/menuItem' , menuItemRoutes);



app.listen(port, () => {
  console.log('listening on port 3000');
})

