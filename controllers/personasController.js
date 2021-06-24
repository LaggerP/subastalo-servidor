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


/**
 * @description permite registrar un nuevo usuario.
 * @param req - posee toda la información necesaria para realizar el registro.
 * @param res - retorna mensaje de fase uno del registro realizada con existo.
 */
exports.changeUserImage = async (req, res) => {
  try {
    const newImage = await personasService.changeProfileImage(req.body.imageUrl, req.body.idCliente);
    return res.status(201).json("cambio de imagen realizado con éxito");
  } catch (e) {
    return res.status(500).json('Error al registrar usuario');
  }
}

/**
 * @description permite actualizar los datos de un usuario.
 * @param req - datos a actualizar.
 * @param res - retorna mensaje de éxito y fracaso.
 */
 exports.updateUserData = async (req, res) => {
  try {
    await personasService.updatePersonData(req.body);
    return res.status(201).json("Datos actualizados correctamente");
  } catch (e) {
    return res.status(500).json('Error al actualizar los datos del usuario');
  }
}