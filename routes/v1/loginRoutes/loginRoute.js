const express = require('express');
const app = express();
const router = express.Router();


router.get("/",(req,res,next)=>{
    res.status(200).render("login",{layout:'login-layout'});
})


module.exports = router;