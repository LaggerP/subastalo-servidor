require('dotenv').config()
const dbConn = require('../database')

/**
 * @description se registra al usuario (primer fase). Esto genera un usuario nuevo en donde la contraseña es el email de la persona. Dicha contraseña debe ser cambiada al ser verificado el usuario de forma OBLIGATORIA.
 * @param persona - posee todos los datos necesarios de la persona para la primer fase del registro.
 */
exports.registerPersona = (persona) => {
  const {documento, nombre, direccion} = persona;
  const sql = `INSERT INTO personas (documento, nombre, direccion, estado, foto)
    VALUES ('${documento}', '${nombre}', '${direccion}', 'activo', convert(varbinary, '${1010101}'))
    SELECT SCOPE_IDENTITY() AS identificador`
  return dbConn.service(sql)
}

/**
 * @description obtenemos a una persona por su documento.
 * @param documento - documento de la persona.
 */
exports.getPersonaByDocumento = (documento) => {
  const sql = `SELECT p.identificador, p.nombre, u.email from personas p JOIN usuarios u on p.identificador = u.identificador WHERE documento='${documento}';`
  return dbConn.service(sql)
}
