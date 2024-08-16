const express = require('express');
const auth_route = express();


const auth_controller = require('../controllers/auth.controller')

auth_route.post('/register',auth_controller.register);
auth_route.post('/login',auth_controller.login);
auth_route.post('/refreshtoken',auth_controller.refreshtoken);


module.exports = auth_route;