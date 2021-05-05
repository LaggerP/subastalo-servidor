require('dotenv').config()
const dbConn = require('../database')
const bcrypt = require('bcrypt');


/**
* @description se registra al usuario (primer fase). Esto genera un usuario nuevo en donde la contraseña es el email de la persona. Dicha contraseña debe ser cambiada al ser verificado el usuario de forma OBLIGATORIA.
* @param persona - posee todos los datos necesarios de la persona para la primer fase del registro. 
* @param callback - es el error o resultado exitoso.
*/
exports.registerPersona = (persona, callback) => {
    const { documento, nombre, direccion } = persona;
    const sql = `INSERT INTO personas (documento, nombre, direccion, estado, foto)
    VALUES ('${documento}', '${nombre}', '${direccion}', 'inactivo', convert(varbinary, '${1010101}'))
    SELECT SCOPE_IDENTITY() AS identificador`

    dbConn.service(sql, callback)
}

/**
* @description se cambia la contraseña del usuario
* @param persona - posee email y contraseña actual. La contraseña actual varia según fase de registro
* @param callback - es el error o resultado exitoso.
*/
exports.changePassword = (persona, callback) => {
    const { email, password } = persona;
    let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.BCRYPT_ROUNDS, 10));
    // error happens
    if (!hashedPassword) callback(error);
    else {
        const sql = `UPDATE personas SET password='${hashedPassword}' WHERE email='${email}'`;
        dbConn.service(sql, callback)
    }
}


/**
* @description se cambia el email del usuario
* @param persona - posee email actual del usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.changeEmail = (persona, callback) => {
    const sql = `UPDATE personas SET email='${persona.email}' WHERE email='${persona.email}'`;
    dbConn.service(sql, callback)
}

/**
* @description se cambia el email del usuario
* @param persona - posee email actual del usuario.
* @param callback - es el error o resultado exitoso.
*/
exports.changeEmail = (persona, callback) => {
    const sql = `UPDATE personas SET email='${persona.email}' WHERE email='${persona.email}'`;
    dbConn.service(sql, callback)
}

