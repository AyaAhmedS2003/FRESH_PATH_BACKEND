const express = require("express");
const router = express.Router();
 const usersControllers=require('../controllers/users.controller')

//get all users
router.route('/')
            .get(usersControllers.getAllUsers)

// register
router.route('/register')
.post(usersControllers.register)  


// login             
router.route('/login')
            .post(usersControllers.login)      
                  
            
 module.exports= router;

    