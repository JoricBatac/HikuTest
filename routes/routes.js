const express = require('express');

const controller = require('../controllers/controller.js');

const registerController = require('../controllers/registerController.js');
const successController = require('../controllers/successController.js');

const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');

const homeController = require('../controllers/homeController.js');

const accountController = require('../controllers/accountController.js');

const exploreController = require('../controllers/exploreController.js');

const forumController = require('../controllers/forumController.js');

const forumpostController = require('../controllers/forumpostController.js');

const tradeController = require('../controllers/tradeController.js');

const validation = require('../helpers/validation.js');

const battleController = require('../controllers/battleController.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);

app.get('/register', registerController.getRegister);
app.post('/register', validation.registerValidation(), registerController.postRegister);
app.get('/getCheckUsername', registerController.getCheckUsername);

app.get('/success', successController.getSuccess);

app.get('/login', loginController.getLogIn);
app.post('/login', loginController.postLogIn);

app.get('/logout', logoutController.getLogOut);

app.get('/home/:username', homeController.getHome);

app.get('/account/:username', accountController.getAccount);

app.get('/explore/:username', exploreController.getExplore);

app.get('/trade/:username', tradeController.getTrade);
app.post('/postTrade', tradeController.postTrade);
app.get('/getCheckTrade', tradeController.getCheckTrade);
app.post('/acceptTrade', tradeController.acceptTrade);
app.post('/removeTrade', tradeController.removeTrade);

app.get('/forum/:username', forumController.getForum);
app.post('/forum/:username', forumController.postDiscussion);
app.post('/likePost', forumController.postLike);
app.post('/dislikePost', forumController.postDislike);
app.get('/updateForumRating', forumController.getRating);
app.post('/postChallenge', forumController.postChallenge);

app.get('/forum/post/:postID', forumpostController.getForumPost);
app.post('/forum/post/:postID', forumpostController.postComment);
//app.post('/likeComment', forumpostController.postCommentLike);
//app.post('/dislikeComment', forumpostController.postCommentDislike);
app.get('/updatePostRating', forumpostController.getRating);

app.post('/changeUsername', accountController.changeUsername);
app.post('/changePassword', accountController.changePassword);
app.post('/changeStatus', accountController.changeStatus);
app.post('/updateCurr', accountController.updateCurr)

app.get('/battle/:username', battleController.getBattle);

module.exports = app;
