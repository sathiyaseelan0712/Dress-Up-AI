const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');
const authenticate = require('../middleware/authenticate');

//Default endpoints
router.get('/default/clothes', adminController.getDefaultClothesImages);
router.get('/default/person', adminController.getDefaultPersonImages);

// User endpoints
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getname', authenticate, userController.getname);
router.post('/upload/clothes', authenticate, userController.uploadClothesImage);
router.get('/clothes', authenticate, userController.getUserClothes);
router.delete('/clothes/:id', authenticate, userController.deleteClothesImageById);
router.post('/upload/person', authenticate, userController.uploadPersonImage);
router.get('/person', authenticate, userController.getPersonImages);
router.delete('/person/:id', authenticate, userController.deletePersonImageById);
router.post('/predict',userController.getPredictionFromModel)

// Admin endpoints
router.post('/admin/upload/clothes', adminController.uploadDefaultClothesImage);
router.delete('/admin/clothes/:id', adminController.deleteDefaultClothesImageById);
router.post('/admin/upload/person', adminController.uploadDefaultPersonImage);
router.delete('/admin/person/:id', adminController.deleteDefaultPersonImageById);

module.exports = router;
