const express = require('express');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

const route = express.Router();

// Rotas da home
route.get('/', homeController.index);

// Login routes
route.get('/login/index', loginController.index)

module.exports = route;
