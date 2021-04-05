const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./config/database');
const session = require('express-session');

//  Load middleware functions
const middleware = require('./middleware/loggin_middleware'); // login middleware


// Load env vars
dotenv.config({path:'./config/config.env'});
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SESSION_SECRET;


const app = express();

app.use(bodyParser.urlencoded({extended:false})) // bodyParser

app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}



// Set the view engine to handlebars
app.engine('.hbs', exphbs({
    extname:'.hbs',
    partialDir:path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');


// Set api version
const api = process.env.ROUTES_API;

// Set Session
app.use(session({
    secret:SECRET,
    resave: true,
    saveUninitialized: true
}))


// Routes setup
const loginRoute = require(`./routes/${api}/loginRoutes/loginRoute`);
const registerRoute = require(`./routes/${api}/loginRoutes/registerRoute`);

app.use('/login',loginRoute);
app.use('/register',registerRoute);


app.get('/',middleware.requireLogin,(req,res,next)=>{

    // before execute req,res,next middleware.requirelogin is check userlogin session status.
    // Correct render -->

    let loadData = {
        pageTitle: "HomePage",
        userLoggedIn: req.session.user
    }

    console.log(loadData.userLoggedIn);
    res.render('home',{loadData,layout:'main'});
})