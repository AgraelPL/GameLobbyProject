// Declare middleware function.

exports.requireLogin = (req,res,next) =>{    
    // If you are loggin you are going to next routes
    if(req.session && req.session.user){
        return next();        
    }
    else{
        // If not you are going to login page again
        return res.redirect('/login');
    }
}