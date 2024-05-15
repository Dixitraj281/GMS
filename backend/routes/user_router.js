const express = require('express');
const  { loginControllers, registerControllers,getUserCount} = require('../controller/Usercontroller.js');

const router = express.Router();

// performing the register routing 
router.route("/register").post(registerControllers);

// performing the login routing
router.route("/login").post(loginControllers);
router.get('/user-count', getUserCount);

module.exports = router;