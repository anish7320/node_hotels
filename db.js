const mongoose = require('mongoose');
require('dotenv').config();
// define the mongodb connection url

// const mongoURL =  'mongodb://localhost:27017/hotels' // replce my database with your database name
// const mongoURL =  'mongodb+srv://anishani:qwerty12345@cluster0.hgumrqa.mongodb.net/' 
// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;
// set mongodb connection 
mongoose.connect(mongoURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// mongoose maintains a default connection object representing the mongoDB connection.
const db = mongoose.connection;

// define event listener for database connection

db.on('connected',()=> {
    console.log('connected to mongoDB sever');
})
db.on('error',(err)=> {
    console.log('mongoDB connectio error');
})
db.on('disconnected',()=> {
    console.log('mongoDB disconnected');
})

// Export the database connection 
module.exports  = db ;