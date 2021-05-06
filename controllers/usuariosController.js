var jwt = require('jsonwebtoken');
const usuariosService = require('../services/usuariosService');

exports.loginController = (req, res) => {
  usuariosService.loginUsuario(req.body, (error, result) => {
    if (result) {
      let token = jwt.sign({
        id: result.identificador
      }, process.env.SECRET_JWT, {
        expiresIn: 86400 // expires in 24 hours
      });
      result.token = token
      return res.status(200).json(result)

    } else res.status(500).json('Error al iniciar sesión');
  })
}

/**
 * @description se cambia la contraseña asociada a un usuario
 * @param persona - posee todos los datos necesarios de la persona para cambiar la contraseña.
 * @param callback - es el error o resultado exitoso.
 */
exports.changePasswordController = (req, res) => {
  usuariosService.changePassword(req.body, (error, result) => {
    if (error) return res.status(500).json('Error al cambiar la contraseña.');
    return res.status(201).json({msg: "Nueva contraseña generada/cambiada"})
  })
}