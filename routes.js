const express = require('express');

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middleware');

const route = express.Router();

route.get('/', homeController.index);

route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

route.get('/contacts', loginRequired, contactController.index);
route.get('/contacts/:id', loginRequired, contactController.show);
route.post('/contacts/edit/:id', loginRequired, contactController.edit);
route.get('/contacts/delete/:id', loginRequired, contactController.delete);
route.post('/contacts/register', loginRequired, contactController.register);

module.exports = route;
