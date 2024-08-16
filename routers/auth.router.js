const express = require('express');
const auth_route = express();

const auth_controller = require('../controllers/auth.controller')


module.exports = auth_route;