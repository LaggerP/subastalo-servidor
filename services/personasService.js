require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');


/**
 * @description se registra al usuario (primer fase). Esto genera un usuario nuevo en donde la contraseña es el email de la persona. Dicha contraseña debe ser cambiada al ser verificado el usuario de forma OBLIGATORIA.
 * @param persona - posee todos los datos necesarios de la persona para la primer fase del registro.
 * @param callback - es el error o resultado exitoso.
 */
exports.registerPersona = (persona, callback) => {
  const {documento, nombre, direccion} = persona;
  const sql = `INSERT INTO personas (documento, nombre, direccion, estado, foto)
    VALUES ('${documento}', '${nombre}', '${direccion}', 'activo', convert(varbinary, '${1010101}'))
    SELECT SCOPE_IDENTITY() AS identificador`

  dbConn.service(sql, callback)
}

exports.getPersonaIdentificador = (documento, callback) => {
  const sql = `SELECT identificador FROM personas WHERE documento='${documento}';`
  dbConn.service(sql, callback)
}
