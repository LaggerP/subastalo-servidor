const personasService = require('../services/personasService');
const usuariosService = require('../services/usuariosService');
const mailService = require('../services/mailService')


/**
 * @description permite registrar un nuevo usuario.
 * @param req - posee toda la información necesaria para realizar el registro.
 * @param res - retorna mensaje de fase uno del registro realizada con existo.
 */
exports.registerPersonaController = async (req, res) => {
  try {
    const usuario = await usuariosService.checkUsuarioExistente(req.body);
    // Usuario existente
    if (usuario.length > 0) return res.status(409).send('Información existente');

    // Usuario inexistente
    const _registro = await personasService.registerPersona(req.body);

    const userData = {
      email: req.body.email,
      identificador: _registro[0].identificador
    }

    await usuariosService.createUser(userData);
    await mailService.sendSuccessRegister(userData.email);
    return res.status(201).json("Fase uno del registro realizada con éxito");
  } catch (e) {
    return res.status(500).json('Error al registrar usuario');
  }
}