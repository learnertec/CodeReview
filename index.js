const express = require('express');

const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayouts);

// Extract css and javascript in layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/', require('./routes'));

// set up view engine and vie folder
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
        return;
    }
    console.log('Express is running on port:',port);
    return;
});