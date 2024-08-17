const express = require('express');
const borrow_route = express();


const borrow_controller = require('../controllers/borrow.controller');
const auth_middleware = require('../middlewares/auth.middleware');

borrow_route.post('/book/:id', auth_middleware.verifyJwt, borrow_controller.borrow_book);
borrow_route.post('/return/:id', auth_middleware.verifyJwt, borrow_controller.return_book);
borrow_route.get('/history', auth_middleware.verifyJwt, borrow_controller.borrow_history);


module.exports = borrow_route;