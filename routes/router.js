const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');
const authenticate = require('../middleware/authenticate');

// User endpoints
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/upload/clothes', authenticate, userController.uploadClothesImage);
router.get('/clothes', authenticate, userController.getUserClothes);
router.delete('/clothes/:id', authenticate, userController.deleteUserClothes);
router.post('/upload/person', authenticate, userController.uploadPersonImage);
router.get('/person', authenticate, userController.getUserPersonImages);
router.delete('/person/:id', authenticate, userController.deleteUserPersonImage);

// Admin endpoints
router.post('/admin/upload/clothes', authenticate, adminController.uploadClothesImage);
router.get('/admin/clothes', authenticate, adminController.getAdminClothes);
router.delete('/admin/clothes/:id', authenticate, adminController.deleteAdminClothes);
router.post('/admin/upload/person', authenticate, adminController.uploadPersonImage);
router.get('/admin/person', authenticate, adminController.getAdminPersonImages);
router.delete('/admin/person/:id', authenticate, adminController.deleteAdminPersonImage);

module.exports = router;
