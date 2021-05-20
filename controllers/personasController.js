const personasService = require('../services/personasService');
const usuariosService = require('../services/usuariosService');
const mailService = require('../services/mailService')

exports.registerPersonaController = async (req, res) => {
  try {
    const usuario = await usuariosService.checkUsuarioExistente(req.body);
    if (usuario.length > 0) return res.status(409).send('Información existente');
    else {
      const _registro = await personasService.registerPersona(req.body);

      const userData = {
        email: req.body.email,
        identificador: _registro[0].identificador
      }

      await usuariosService.createUser(userData);
      await mailService.sendSuccessRegister(userData.email);
      return res.status(201).json("Fase uno del registro realizada con éxito");
    }
  } catch (e) {
    return res.status(500).json('Error al registrar usuario');
  }
}