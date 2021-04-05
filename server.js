const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//  Load middleware functions
const middleware = require('./middleware/loggin_middleware'); // login middleware

// Load env vars
dotenv.config({path:'./config/config.env'});

// Server config
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({extended:false}))

// Set the view engine to handlebars
app.engine('.hbs', exphbs({
    extname:'.hbs',
    partialDir:path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');


// Set api version
const api = process.env.API;

// Routes setup
const loginRoute = require(`./routes/${api}/loginRoutes/loginRoute`);
const registerRoute = require(`./routes/${api}/loginRoutes/registerRoute`);

app.use('/login',loginRoute);
app.use('/register',registerRoute);


app.get('/',middleware.requireLogin,(req,res,next)=>{

    // before execute req,res,next middleware.requirelogin is check userlogin status.
    // Correct render -->
    res.render('home');
})