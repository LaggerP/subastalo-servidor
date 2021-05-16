const jwt = require('jsonwebtoken');
const usuariosService = require('../services/usuariosService');
const personaService = require('../services/personasService');
const mailService = require('../services/mailService')

exports.loginController = (req, res) => {
  usuariosService.loginUsuario(req.body, (error, result) => {
    if (result) {
      result.token = jwt.sign({
        id: result.identificador
      }, process.env.SECRET_JWT, {
        expiresIn: 86400 // expires in 24 hours
      });
      result.clienteAdmitido = result.clienteAdmitido === 'si';
      return res.status(200).json(result)

    } else return res.status(500).json('Error al iniciar sesión');
  })
}

/**
 * @description se cambia la contraseña asociada a un usuario
 * @param req - posee todos los datos necesarios de la persona para cambiar la contraseña.
 * @param res - es el error o resultado exitoso.
 */
exports.changePasswordController = (req, res) => {
  usuariosService.changePassword(req.body, (error, result) => {
    if (error) return res.status(500).json('Error al cambiar la contraseña.');
    return res.status(201).json({msg: "Nueva contraseña generada/cambiada"})
  })
}

/**
 * @description nos permite verificar a un usuario a partir de su documento
 */
exports.sendVerifiedAccountEmail = (req, res) => {
  personaService.getPersonaIdentificador(req.body.documento, (error, result) => {

    let categoryArray = [
      'comun',
      'especial',
      'plata',
      'oro',
      'platino'
    ];
    let randomCategory = Math.floor(Math.random() * categoryArray.length);
    let randomPais = Math.floor(Math.random() * (5 - 1) + 1);

    const clientData = {
      identificador: result.recordset[0].identificador,
      numeroPais: randomPais,
      admitido: 'si',
      categoria: categoryArray[randomCategory],
      verificador: 1
    }

    usuariosService.updateVerifiedStatusUser(clientData, (error, result) => {
      if (error) return res.status(500);
      else {
        //send email para ingresar la contraseña
        return res.status(201).send("Verificación automática realizada con éxito")
      }
    })
  })
}
