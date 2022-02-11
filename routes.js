const express = require('express');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middleware');

const route = express.Router();

route.get('/', homeController.index);

route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

route.get('/contatos', loginRequired, contatoController.index)
route.get('/contatos/:id', loginRequired, contatoController.edit)
route.post('/contatos/register', loginRequired, contatoController.register)

module.exports = route;
