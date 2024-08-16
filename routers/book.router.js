const express = require('express');
const book_route = express();


const book_controller = require('../controllers/books.controller')

book_route.post('/add',book_controller.add_book);
book_route.patch('/edit/:id', book_controller.edit_book);
book_route.delete('/delete/:id', book_controller.delete_book);
book_route.delete('/list', book_controller.list_books);

module.exports = book_route;