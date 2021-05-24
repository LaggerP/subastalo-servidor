require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');

/**
 * @description se inicia la sesión del usuario, se pasa por parámetro el email correspondiente.
 * @param usuario - posee todos los datos necesarios del usuario para iniciar sesión.
 */
exports.loginUsuario = async (usuario) => {
  const _user = await this.getUserByEmail(usuario.email);
  if (_user) {
    let passwordIsValid = await bcrypt.compareSync(usuario.password, _user[0].password);
    if (passwordIsValid) {
      let userData = await this.getAllUserData(_user[0].identificador);
      userData = {...userData, ..._user[0]}
      delete userData.password
      return userData
    }
  }
}

/**
 * @description se genera un usuario asociado a una persona para la primera fase de registro.
 * @param persona - posee todos los datos necesarios de la persona para crear el usuario.
 */
exports.createUser = (persona) => {
  const {email, identificador} = persona;
  let _email = bcrypt.hashSync(email, parseInt(process.env.BCRYPT_ROUNDS, 10));
  const sql = `
    INSERT INTO usuarios (identificador, email, password, primerInicio)
    VALUES ('${identificador}', '${email}', '${_email}', 1)`;

  return dbConn.service(sql)
}


/**
 * @description se cambia la contraseña del usuario
 * @param persona - posee email y contraseña actual. La contraseña actual varia según fase de registro
 */
exports.changePassword = (persona) => {
  const {email, password} = persona;
  let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS, 10));
  const sql = `UPDATE usuarios SET password='${hashedPassword}' WHERE email='${email}'`;
  return dbConn.service(sql)
}


/**
 * @description permite cambiar el email del usuario
 * @param persona - posee email actual del usuario.
 */
exports.changeEmail = (persona) => {
  const sql = `UPDATE usuarios SET email='${persona.email}' WHERE email='${persona.email}'`;
  return dbConn.service(sql)
}

/**
 * @description permite obtener toda la información de un usuario en particular
 * @param id - id correspondiente al usuario.
 */
exports.getUserById = (id) => {
  const sql = `SELECT * FROM usuarios WHERE identificador='${id}'`;
  return dbConn.service(sql)
}

/**
 * @description se devuelve un usuario mediante su email.
 * @param email - email necesario para buscar al usuario.
 */
exports.getUserByEmail = (email) => {
  const sql = `SELECT u.identificador, u.email, u.password FROM usuarios u WHERE u.email = '${email}';`
  return dbConn.service(sql)
}

/**
 * @description se determina si el usuario existe dentro de la base de datos a partir de su email y documento.
 * @param usuario - email y documento necesario para buscar al usuario.
 */
exports.checkUsuarioExistente = (usuario) => {
  const {email, documento} = usuario;

  const sql = `
    SELECT u.email, p.documento from usuarios u JOIN personas p on p.identificador = u.identificador 
    WHERE u.email = '${email}' 
    OR p.documento = '${documento}';`
  return dbConn.service(sql)
}

/**
 * @description se devuelve la contraseña de un usuario correspondiente.
 * @param email - usuario con su email necesario para buscar al usuario.
 */
exports.validatePassword = (email) => {
  const sql = `SELECT u.password FROM usuarios u WHERE u.email = '${email}';`
  return dbConn.service(sql)
}

/**
 * @description se devuelve toda la información asociada a un usuario correspondiente.
 * @param identificador - identificador del usuario en la base de datos.
 */
exports.getAllUserData = (identificador) => {
  const sql = `
      SELECT pe.identificador idPersona,
             c.identificador  idCliente,
             pe.documento,
             pe.nombre        nombreCompleto,
             u.primerInicio,
             pe.direccion,
             pe.estado,
             pe.foto,
             c.admitido       clienteAdmitido,
             c.categoria,
             pa.nombre        nombrePais,
             pa.nacionalidad,
             pa.capital
          FROM personas pe
               JOIN clientes c on pe.identificador = c.identificador
               JOIN usuarios u on pe.identificador = u.identificador
               JOIN paises pa on pa.numero = c.numeroPais
          WHERE pe.identificador = '${identificador}'
          `;
  return dbConn.service(sql)
}


/**
 * @description actualizamos los valores que van a permitir que el usuario esté validado y aceptado dentro de la plataforma.
 * @param dataCliente - posee toda la data necesaria para crear el insert dentro de la base de datos.
 */
exports.updateVerifiedStatusUser = (dataCliente) => {
  const {identificador, numeroPais, admitido, categoria, verificador} = dataCliente
  const sql = `INSERT INTO clientes (identificador, numeroPais, admitido, categoria, verificador) VALUES
  ('${identificador}','${numeroPais}','${admitido}','${categoria}','${verificador}');`
  return dbConn.service(sql)
}