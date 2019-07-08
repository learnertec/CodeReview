// require llibrary
const mongoose = require('mongoose');
// connect to the dataase
mongoose.connect('mongodb://localhost/codial_db');
//acquire the connection ( to check it is sucessfull)
const db = mongoose.connection;
// errror
db.on('error',console.error.bind(console, 'error connecting to db'));

// up and running then print message
db.once('open',function(){
    console.log('Sucessflly connected to the database');
});


module.exports = db;