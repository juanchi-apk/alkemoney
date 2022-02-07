const server = require('express').Router();
const uservalidator = require('../middleware/validators/authvalidators');
const userControllers = require('../controllers/auth');

server.post('/signup', uservalidator.signupUser , userControllers.signup )
server.post('/signin', uservalidator.signinUser , userControllers.signin )
server.post('/signwith', userControllers.signwith )

module.exports = server;