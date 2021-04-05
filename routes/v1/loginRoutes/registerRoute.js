const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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
            res.status(401).render('register',{layout:'login-layout'})
        })

        if(user == null){

            // Bcrypt hash password setup
            let password = await bcrypt.hash(registerBody.password,10);

            // No user found 
            // You can create a new User and redirect to homePage
            User.create({...registerBody,password:password})
            .then(user=>{

                // Store user data to session
                // Its required to redirect to home page               
                // look middleware/middleware
                
                req.session.user = user;
                return res.redirect('/');
            })

        }
        else{

            // Send message to register page
            // If username => username is used
            // Else emai => email is used          

            console.log('Data is already used');
            res.status(401).render('register',{layout:'login-layout'});
        }       
    }

    
})


module.exports = router;