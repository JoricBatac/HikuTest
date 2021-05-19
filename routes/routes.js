const express = require('express');

const controller = require('../controllers/controller.js');

const registerController = require('../controllers/registerController.js');
const successController = require('../controllers/successController.js');

const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');

const homeController = require('../controllers/homeController.js');

const accountController = require('../controllers/accountController.js');

const forumController = require('../controllers/forumController.js');

const validation = require('../helpers/validation.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);

app.get('/register', registerController.getRegister);
app.get('/getRegisterAcc', validation.registerValidation(), registerController.getRegisterAcc);
app.get('/getCheckUsername', registerController.getCheckUsername);

app.get('/success', successController.getSuccess);

app.get('/login', loginController.getLogIn);
app.post('/login', loginController.postLogIn);

app.get('/logout', logoutController.getLogOut);

app.get('/home/:username', homeController.getHome);

app.get('/account/:username', accountController.getAccount);

app.get('/forum/:username', forumController.getForum);
app.get('/postDiscussion', forumController.getAddDiscussion);

module.exports = app;
