const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');


// Add reference to User mongoose schema
const User = require('../../../schemas/User');

app.use(bodyParser.urlencoded({extended:false}))


router.get("/",(req,res,next)=>{
    res.status(200).render("register",{layout:'login-layout'});
})

router.post("/",async (req,res,next)=>{
    
    // Get request from register form
    let registerBody ={
        username:req.body.userName.trim(),
        email:req.body.email.trim(),
        password:req.body.password.trim()
    }

    // Check if not empty or undefined
    if(registerBody.username && registerBody.email &&registerBody.password){
        let user = await User.findOne({
            
            $or:[
                {username:registerBody.username},
                {email:registerBody.email}
            ]        
            
        })
        .catch((err)=>{
            console.log(err);
            res.status(400).json({message:'error'});
        })

        if(user == null){
            // No user found 
            // You can redirect to homepage
            User.create(registerBody)
            .then(user=>{
                console.log(user);
            })
            res.status(200).render("login",{layout:'login-layout'});
        }
        else{
            // Send message to register page
            // If username => username is used
            // Else emai => email is used            

            console.log('Data is already used');
            res.status(200).render('register',{layout:'login-layout'});
        }       
    }

    
})


module.exports = router;