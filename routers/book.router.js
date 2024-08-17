const express = require('express');
const book_route = express();


const book_controller = require('../controllers/books.controller');
const auth_middleware = require('../middlewares/auth.middleware');
const role_middleware = require('../middlewares/role.middleware');

book_route.post('/add', auth_middleware.verifyJwt, role_middleware.isAdmin, book_controller.add_book);
book_route.patch('/edit/:id', auth_middleware.verifyJwt, role_middleware.isAdmin, book_controller.edit_book);
book_route.delete('/delete/:id', auth_middleware.verifyJwt, role_middleware.isAdmin, book_controller.delete_book);
book_route.get('/list', auth_middleware.verifyJwt, book_controller.list_books);

module.exports = book_route;