const express=require('express');

var router=express.Router();
const mongoose=require('mongoose');
const Employee=mongoose.model('Employee');


router.get('/',(req,res)=>
{
    res.render("employee/addOredit",
    {
        viewTitle:"insert an employee Data"
    });
});

router.post('/',(req, res)=>
{
    insertRecord(req,res);
});

function insertRecord(req,res){
var employee=new Employee();
employee.fullname=req.body.fullname;
employee.email=req.body.email;
employee.mobile=req.body.mobile;
employee.city=req.body.city;

employee.save((err, doc)=>
{
    if(!err)
    {
        res.redirect('employee/list')
    }
    if(err.name=='ValidationError'){
    handleValidationError(err,req.body);
    res.render("employee/addOredit",
    {
        viewTitle:"insert an employee Data",employee:req.body
    });
}
    else
    {
        console.log("error has occured"+ err);
    }
});
}
router.get('/list',(req,res)=>
{
    Employee.find((err,docs)=>
    {
        if(!err)
        {
            res.render('employee/list',{
                list:docs
            });
        }
        else{
            console.log("Error in retrieving employee list:" + err);
        }
    })
});

function handleValidationError(err,body)
{
    for(field in err.errors)
    {
        switch(err.errors[field].path)
        {
            case 'fullname':
                body['fullNameError']=err.errors[field].message;
                break;
                case 'email':
                    body['emailError']=err.errors[field].message;
                    break;
                    default: 
                    break;
        }
}
}


module.exports=router;