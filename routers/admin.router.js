const express = require('express');
const admin_route = express();


const admin_controller = require('../controllers/admin.controller')

const auth_middleware = require('../middlewares/auth.middleware');
const role_middleware = require('../middlewares/role.middleware');

admin_route.post('/most_borrowed_book', auth_middleware.verifyJwt, role_middleware.isAdmin, admin_controller.most_borrowed_book);
admin_route.post('/active_members', auth_middleware.verifyJwt, role_middleware.isAdmin, admin_controller.active_members);
admin_route.post('/book_availability', auth_middleware.verifyJwt, role_middleware.isAdmin, admin_controller.book_availability);


module.exports = admin_route;