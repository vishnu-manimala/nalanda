const express = require('express');
const borrow_route = express();


const borrow_controller = require('../controllers/borrow.controller')

borrow_route.post('/borrow/:id',borrow_controller.borrow_book);
borrow_route.post('/return/:id',borrow_controller.return_book);
borrow_route.post('/history',borrow_controller.borrow_history);


module.exports = borrow_route;