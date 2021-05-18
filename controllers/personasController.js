const personasService = require('../services/personasService');
const usuariosService = require('../services/usuariosService');
const mailService = require('../services/mailService')

exports.registerPersonaController = (req, res) => {
  usuariosService.checkUsuarioExistente(req.body, (error, result) => {
    if (error) return res.status(500).json('Error al registrar usuario');
    
    if (result.recordset.length > 0) return res.status(409).json({
      msg: 'Error al registrar usuario, el mismo ya existe dentro de la plataforma',
      data: result.recordset[0]
    });

    else {
      personasService.registerPersona(req.body, (error, result) => {
        if (error) return res.status(500).json('Error al registrar usuario');

        //Se logró la primera fase del registro.
        if (result.rowsAffected[0] !== 0) {
          const userData = {
            email: req.body.email,
            identificador: result.recordset[0].identificador
          }

          usuariosService.createUser(userData, async (error, result) => {
            if (error) return res.status(500).json('Error al registrar usuario');
            else if (result) {
              await mailService.sendSuccessRegister(userData.email);
              return res.status(201).json("Fase uno del registro realizada con éxito");
            }
          })
        }
      })
    }
  })
}