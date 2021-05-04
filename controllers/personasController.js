const personasService = require('../services/personasService')
const usuariosService = require('../services/usuariosService')

exports.registerPersonaController = (req, res) => {

    usuariosService.checkUsuarioExistente(req.body,(error, result) => {
        if (error) return res.status(500).json('Error al registrar usuario');
        
        
        if (result.recordset.length > 0) res.status(409).json({msg: 'Error al registrar usuario, el mismo ya existe dentro de la plataforma', data: result.recordset[0]}); 
        else {

            personasService.registerPersona(req.body, (error, result) => {
                if (error) return res.status(500).json('Error al registrar usuario');
                if (result.rowsAffected[0] !== 0) {
                    const userData = {
                        email: req.body.email,
                        identificador: result.recordset[0].identificador
                    }
                    usuariosService.createUser(userData, (error, result) => {
                        if (error) res.status(500).json('Error al registrar usuario');
                        return res.status(201).json("Fase uno del registro realizada con éxito")

                    })
                }
            })
        } 
    })
}