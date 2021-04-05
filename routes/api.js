const router = require('express').Router();
const personaController = require('../controllers/personasController');

router.get('/api', function (req, res) {
    res.json({ msg: "funcionando" })
})

router.post('/api/register', personaController.registerPersonaController);
router.post('/api/login', personaController.loginPersonaController);

module.exports = router;