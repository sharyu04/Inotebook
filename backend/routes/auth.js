const express = require('express');
const User  = require('../models/User');
const router = express.Router();


//Create a user using: POST: "/api/auth/"
router.post('/',(req,res)=>{
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.json("Successful");
})

module.exports = router