require('./Models/db');

const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');

const employeeController=require('./controller/employeeController');

var app=express();

app.use(bodyparser.urlencoded({
    extended:true
}));

app.use(bodyparser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname +'/views/layouts/'}));
app.set('view engine','hbs');
app.listen(3000,()=>{

console.log('express server is started');

});

app.use('/employee',employeeController);