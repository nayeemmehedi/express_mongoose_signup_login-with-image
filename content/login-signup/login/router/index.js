const express = require('express');
const { loginRouterPost } = require('../controller');
const loginRoute = express.Router();

loginRoute.post('/',loginRouterPost)

module.exports =loginRoute;

