const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');
const authenticate = require('../middleware/authenticate');

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

// Admin endpoints
router.post('/admin/upload/clothes', authenticate, adminController.uploadDefaultClothesImage);
router.get('/admin/clothes', authenticate, adminController.getDefaultClothesImages);
router.delete('/admin/clothes/:id', authenticate, adminController.deleteDefaultClothesImageById);
router.post('/admin/upload/person', authenticate, adminController.uploadDefaultPersonImage);
router.get('/admin/person', authenticate, adminController.getDefaultPersonImages);
router.delete('/admin/person/:id', authenticate, adminController.deleteDefaultPersonImageById);

module.exports = router;
