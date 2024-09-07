const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middleware/authenticate');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/upload/clothes', authenticate, userController.uploadClothesImage);

router.post('/upload/person', authenticate, userController.uploadPersonImage);

router.get('/images/recent', authenticate, userController.getRecentImages);

module.exports = router;

