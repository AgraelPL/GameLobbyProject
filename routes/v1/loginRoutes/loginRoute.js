const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }))

// Add reference to User mongoose schema
const User = require('../../../schemas/User');

router.get("/", (req, res, next) => {


    res.status(200).render("login", { layout: 'login-layout' });
})

router.post('/', async (req, res, next) => {


    if (req.body.logUsername && req.body.logPassword) {
        let user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
            .then(async user => {
                
                let result = await bcrypt.compare(req.body.logPassword, user.password);
                if (result == true) {
                    req.session.user = user;
                    return res.redirect('/');
                }
                else {
                    //  redirect to login page 
                    //  res message bad login credencials - password 
                    console.log('Bad passord')                   
                    return res.status(200).render('login', { layout: 'login-layout' })
                }
            })
            .catch((err) => {
                // redirect to login page
                // If user not exist we catch error and render login page again
                console.log('Bad username')
                return res.status(200).render('login', { layout: 'login-layout' })
            })


    }

})

// I have to work on it. Need to send errors messages to login website;

module.exports = router;