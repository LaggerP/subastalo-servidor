const router = require('express').Router();
const personaController = require('../controllers/personasController');
const usuariosController = require('../controllers/usuariosController')

router.get('/api', function (req, res) {
    res.json({ msg: "funcionando" })
})

router.post('/api/new-user', personaController.registerPersonaController);
router.post('/api/user/login', usuariosController.loginController);
router.post('/api/user/change-password', usuariosController.changePasswordController);
router.post('/api/chkEmail', usuariosController.checkUserValidation);

module.exports = router;