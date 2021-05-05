const router = require('express').Router();
const usuariosRoutes = require('./usuarios');
const subastasRoutes = require('./subastas');

router.get('/api', function (req, res) {
    res.json({ msg: "funcionando" })
})

// Todos los endpoints asociados a usuarios.
router.use('/api/user/', usuariosRoutes)

// Todos los endpoints asociados a las subastas
router.use('/api/subastas/', subastasRoutes)

module.exports = router;