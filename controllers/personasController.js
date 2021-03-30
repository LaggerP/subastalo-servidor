var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const personaService = require('../services/personasService')


exports.createPersonaController = (req, res) => {
    personaService.createPersonService(req.body, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(500).json('Error al registrar usuario');
        }
        else if (result.length > 0)
            return res.status(409).json({ msg: 'El email ya se encuentra en uso', status: 409 });
        else {
            let token = jwt.sign({
                id: result.insertId
            }, process.env.SECRET_JWT, {
                expiresIn: 86400 // expires in 24 hours
            });
            let sendJson = {
                token: token,
                email: req.body.email,
                nombre: req.body.nombre,
                status: 200
            }
            return res.status(200).json(sendJson)
        }
    })
}