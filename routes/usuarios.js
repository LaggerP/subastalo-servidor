const usuariosRoutes = require('express').Router();
const personaController = require('../controllers/personasController');
const usuariosController = require('../controllers/usuariosController');

usuariosRoutes.post('/new-user', personaController.registerPersonaController);
usuariosRoutes.post('/update-data', personaController.updateUserData);
usuariosRoutes.post('/login', usuariosController.loginController);
usuariosRoutes.post('/change-password', usuariosController.changePasswordController);
usuariosRoutes.post('/verified-account', usuariosController.sendVerifiedAccountEmail);
usuariosRoutes.post('/forgot-password', usuariosController.sendChangePasswordEmail)
module.exports = usuariosRoutes;
