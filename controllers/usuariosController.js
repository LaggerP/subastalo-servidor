const jwt = require('jsonwebtoken');
const usuariosService = require('../services/usuariosService');
const personaService = require('../services/personasService');
const mailService = require('../services/mailService');

/**
 * @description permite llamar al servicio correspondiente para iniciar sesión dentro de la plataforma. Solo
 * funciona con usuarios clientes. No funciona con usuarios empleados.
 * @param req - posee todos los datos necesarios de la persona para cambiar la contraseña.
 * @param res - es el error o resultado exitoso.
 */
exports.loginController = async (req, res) => {
  try {
    const _login = await usuariosService.loginUsuario(req.body);
    if (_login) {
      _login[0].token = jwt.sign({
        id: _login[0].identificador
      }, process.env.SECRET_JWT, {
        expiresIn: 86400 // expires in 24 hours
      });
      _login[0].clienteAdmitido = _login[0].clienteAdmitido === 'si';

      if (_login[0].clienteAdmitido) return res.status(200).json({status: 200, userData:_login[0]});

      return res.status(401).send("Usuario no se encuentra verificado");
    }
    return res.status(400).send("Credenciales incorrectas");
  } catch (e) {
    return res.status(500).json('Error al iniciar sesión');
  }
}

/**
 * @description se cambia la contraseña asociada a un usuario
 * @param req - posee todos los datos necesarios de la persona para cambiar la contraseña.
 * @param res - es el error o resultado exitoso.
 */
exports.changePasswordController = async (req, res) => {
  try {
    await usuariosService.changePassword(req.body);
    return res.status(201).json({status:201, msg: "Nueva contraseña generada/cambiada"});
  } catch (e) {
    return res.status(500).json('Error al cambiar la contraseña.');
  }
}

exports.sendChangePasswordEmail = async (req, res) => {
  try {
    const persona = await usuariosService.getUserByEmail(req.body);
    if (persona) {
      await mailService.sendChangeForgottenPassword(req.body);
      return res.status(200).send("Email mandado");
    } else {
      return res.status(404).send("Email incorrecto");
    }
  } catch (e) {
    return res.status(500).json("Error al mandar mail.");
  }
}

/**
 * @description nos permite verificar a un usuario a partir de su documento
 * @param req - posee todos los datos necesarios de la persona para cambiar el estado dentro de la base de datos.
 * @param res - es el error o resultado exitoso.
 */
exports.sendVerifiedAccountEmail = async (req, res) => {
  try {
    const persona = await personaService.getPersonaByDocumento(req.body.documento);
    const user = await usuariosService.validatePassword(persona[0].email);

  

    const emailData = {
      nombre: persona[0].nombre,
      email: persona[0].email,
      codigo: user[0].password
    }

    const _persona = {
      email: persona[0].email,
      password: user[0].password,
      verificationAction: true
    }

    console.log(_persona)
    console.log(emailData)

    let categoryArray = [
      'comun',
      'especial',
      'plata',
      'oro',
      'platino'
    ];
    let randomCategory = Math.floor(Math.random() * categoryArray.length);
    let randomPais = Math.floor(Math.random() * (5 - 1) + 1);

    let clientData = {
      identificador: persona[0].identificador,
      numeroPais: randomPais,
      admitido: 'si',
      categoria: categoryArray[randomCategory],
      verificador: 1
    }
    const _cliente = await usuariosService.updateVerifiedStatusUser(clientData);
    if (_cliente) {
      await mailService.sendSuccessfulVerificationEmail(emailData);
      await usuariosService.changePassword(_persona)
      return res.status(201).send("Verificación automática realizada con éxito");
    } return res.status(500).json('Error al verificar cliente');
  } catch (e) {
    return res.status(500).json('Error en el servidor.');
  }
}
