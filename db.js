const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDb',{useNewUrlParser: true},(err)=>{
    if(!err){
        console.log('mongodb connection successsfull')
    }
    else{
        console.log('Mongodb connection error', +err)
    }

});

require('./employee.models');