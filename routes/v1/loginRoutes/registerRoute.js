const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}))


router.get("/",(req,res,next)=>{
    res.status(200).render("register",{layout:'login-layout'});
})

router.post("/",(req,res,next)=>{
    
    let registerBody ={
        username:req.body.userName.trim(),
        email:req.body.email.trim(),
        password:req.body.password.trim()
    }



    console.log(registerBody);
    res.status(200).render("login",{layout:'login-layout'});
})


module.exports = router;