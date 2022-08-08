const express = require('express');
const User  = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_Secret = 'heyThere';


//Create a user using: POST: "/api/auth/"
router.post('/createUser',[
    body('name').isLength({ min: 1 }),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        
        //Check whether the email user already exists
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({error : "User with this email already exists"})
        }
        
        //Create user
        const salt = await bcrypt.genSalt();
        const secPass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
          });
        
          const data = {
            user: {
                id: user.id
            }
          }
          const authtoken = jwt.sign(data, JWT_Secret);

        res.json({authtoken})  
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }

      
    //   .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    //   res.json({error: 'Please enter a unique email', message: err.message})}
    //   )
})

module.exports = router