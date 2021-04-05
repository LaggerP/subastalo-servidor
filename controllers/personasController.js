var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const personaService = require('../services/personasService')


exports.registerPersonaController = (req, res) => {
    personaService.registerPersonaService(req.body, (error, result) => {
        if (error) {
            console.log(error)
            return res.status(500).json('Error al registrar usuario');
        }
        else if (result.length > 0)
            return res.status(409).json({ msg: 'El usuario ya es parte del sistema', status: 409 });
        else {
            let token = jwt.sign({
                id: result.identificador
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

exports.loginPersonaController = (req, res) => {
    personaService.loginPersonaService(req.body, (error, result) => {
        if (error) return res.status(500).json('Error al hacer login');

        else if(result.length > 0 ){
            let token = jwt.sign({
                id: result.identificador
            }, process.env.SECRET_JWT, {
                expiresIn: 86400 // expires in 24 hours
            });

            let sendJson = {
                token: token,
                email: result[0].email,
                nombre: result[0].nombre,
                foto: result[0].foto,
                estado: result[0].estado,
                documento: result[0].documento,
                status: 200
            }

            return res.status(200).json(sendJson)
            
        }
            
        else {
            return res.status(409).json({ msg: 'El usuario ya es parte del sistema', status: 409 });
            
        }
    })
}