const usuariosRoutes = require('express').Router();
const personaController = require('../controllers/personasController');
const usuariosController = require('../controllers/usuariosController');

usuariosRoutes.post('/new-user', personaController.registerPersonaController);
usuariosRoutes.post('/login', usuariosController.loginController);
usuariosRoutes.post('/change-password', usuariosController.changePasswordController);
usuariosRoutes.post('/chkEmail', usuariosController.checkUserValidation);

module.exports = usuariosRoutes;
